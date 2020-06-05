import { DrumKit, Note, Octave, Velocity } from '../util/message'
import { Adapter } from './Adapter'
import { Track, TrackOptions } from './Track'

export interface ControllerOptions {
  beatsPerMinute: number
  beatsPerBar: number
  minQuantization: number
  autoplay: boolean
}

const DEFAULTS: ControllerOptions = {
  beatsPerMinute: 120,
  beatsPerBar: 4,
  minQuantization: 1 / 16,
  autoplay: true
}

export type TickFn = (tick: number) => void

export interface ScheduleEntry {
  quantize: number
  fn: TickFn
}

export class Controller {
  private options: ControllerOptions
  private intervals: NodeJS.Timeout[] = []
  private ticks = 0
  private tickTimeout?: NodeJS.Timeout
  private schedule: ScheduleEntry[] = []
  private adapters: Map<string, Adapter> = new Map()
  private tracks: Map<string, Track> = new Map()

  static managed(options?: Partial<ControllerOptions>) {
    const controller = new Controller(options)
    controller.manageProcess(process)
    return controller
  }

  constructor(options?: Partial<ControllerOptions>) {
    this.options = { ...DEFAULTS, ...options }
    if (this.options.autoplay) { this.play() }
  }

  setAdapter(id: string, adapter: Adapter) {
    this.adapters.set(id, adapter)
  }

  getAdapter(id: string) {
    return this.adapters.get(id)
  }

  createTrack(id: string, options?: Partial<TrackOptions>) {
    const track = new Track(this, options)
    this.tracks.set(id, track)
    return track
  }

  setTrack(id: string, track: Track) {
    this.tracks.set(id, track)
  }

  getTrack(id: string): Track {
    return this.tracks.get(id)!
  }

  play() {
    if (this.tickTimeout) { throw new Error('Controller already playing') }
    this.tickTimeout = setInterval(this.tick.bind(this), this.tickDuration)
    this.tick()
  }

  pause() {
    if (!this.tickTimeout) { throw new Error('Controller not playing') }
    clearInterval(this.tickDuration)
    this.tickTimeout = undefined
  }

  stop() {
    this.pause()
    this.reset()
  }

  reset() {
    this.ticks = 0
  }

  manageProcess(process: NodeJS.Process) {
    process.on('SIGINT', () => {
      console.log('shutdown controller')
      this.destroy()
      process.exit()
    })
  }

  every(quantize: number, fn: TickFn) {
    const entry: ScheduleEntry = { quantize, fn }
    this.schedule.push(entry)
    return entry
  }

  logNote(label: string, octave: Octave, note: Note, velocity: Velocity) {
    console.info(`[${label}] note=${Note[note]} velocity=${Velocity[velocity]} octave=${Octave[octave]}`)
  }

  logDrumKit(label: string, key: DrumKit, velocity: Velocity) {
    console.info(`[${label}] key=${DrumKit[key]} velocity=${Velocity[velocity]}`)
  }

  destroy() {
    this.intervals.forEach(clearInterval)
    this.adapters.forEach((adapter) => { adapter.destroy() })
    this.adapters.clear()
    this.tracks.forEach((track) => { track.destroy() })
    this.tracks.clear()
  }

  get beatDuration() {
    return 60000 / this.options.beatsPerMinute
  }

  get barDuration() {
    return this.beatDuration * this.options.beatsPerBar
  }

  get tickDuration() {
    return this.barDuration * this.options.minQuantization
  }

  private tick() {
    this.ticks += 1
    const { barDuration, tickDuration } = this
    const time = this.ticks * tickDuration
    this.schedule.filter(({ quantize }) => time % (quantize * barDuration) === 0).forEach(({ fn }) => {
      fn(this.ticks)
    })
  }
}
