import * as SoundFont from 'soundfont-player'
import { Adapter } from '../core/classes/Adapter'
import { DrumKit, Note, Octave, Velocity } from '../core/util/message'

export interface SoundFontAdapterOptions { }

const DEFAULTS: SoundFontAdapterOptions = {}

export class SoundFontAdapter extends Adapter {
  private options: SoundFontAdapterOptions
  private context: AudioContext = new AudioContext()
  private channels: Map<number, SoundFont.Player> = new Map()

  constructor(options?: Partial<SoundFontAdapterOptions>) {
    super()
    this.options = { ...DEFAULTS, ...options }
  }

  async loadChannel(channel: number, url: string) {
    const player = await SoundFont.instrument(this.context, url as SoundFont.InstrumentName)
    this.channels.set(channel, player)
  }

  playNote(channel: number, note: Note, octave: Octave, velocity: Velocity) {
    const player = this.channels.get(channel)!
    const key: string = note + octave as unknown as string
    player.play(key, undefined, { gain: velocity / 127 })
  }

  playDrumKit(channel: number, key: DrumKit, velocity: Velocity) {
    // this.sendMessage(Status.NoteOn + channel - 1, key, velocity)
  }

  stopNote(channel: number, note: Note, octave: Octave) {
    // this.sendMessage(Status.NoteOff + channel - 1, note + octave, 0)
  }

  stopDrumKit(channel: number, key: DrumKit) {
    // this.sendMessage(Status.NoteOff + channel - 1, key, 0)
  }

  destroy() { }
}
