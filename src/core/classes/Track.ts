import { DrumKit, Note, Octave, Velocity } from '../util/message'
import { Adapter } from './Adapter'
import { Controller } from './Controller'

export interface TrackOptions {
  channel: number,
  adapter: string,
  verbose: boolean
}

const DEFAULTS: TrackOptions = {
  channel: 1,
  adapter: 'default',
  verbose: true
}

export type TrackTickFn = (track: Track, tick: number) => void

export class Track {
  private options: TrackOptions

  constructor(private controller: Controller, options?: Partial<TrackOptions>) {
    this.options = { ...DEFAULTS, ...options }
  }

  every(quantize: number, fn: TrackTickFn) {
    return this.controller.every(quantize, (tick) => {
      fn(this, tick)
    })
  }

  playNote(note: Note = Note.C, octave: Octave = Octave.FOUR, velocity: Velocity = Velocity.MF, duration = 500) {
    this.adapter.playNote(this.options.channel, note, octave, velocity)
    if (duration !== 0) { setTimeout(() => { this.stopNote(this.options.channel, note, octave) }, duration) }
    // if (this.options.verbose) { this.controller.logNote(this.options.adapter, octave, note, velocity) }
  }

  playDrumKit(key: DrumKit = DrumKit.KICK, velocity: Velocity = Velocity.MF, duration = 500) {
    this.adapter.playDrumKit(this.options.channel, key, velocity)
    if (duration !== 0) { setTimeout(() => { this.stopDrumKit(this.options.channel, key) }, duration) }
    // if (this.options.verbose) { this.controller.logDrumKit(this.options.adapter, key, velocity) }
  }

  stopNote(channel: number, note: Note, octave: Octave) {
    this.adapter.stopNote(channel, note, octave)
  }

  stopDrumKit(channel: number, key: DrumKit) {
    this.adapter.stopDrumKit(channel, key)
  }

  get adapter(): Adapter {
    return this.controller.getAdapter(this.options.adapter)!
  }

  destroy() { }
}
