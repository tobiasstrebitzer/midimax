import { DrumKit, Note, Octave, Velocity } from '../util/message'

export abstract class Adapter {
  abstract playNote(channel: number, note: Note, octave: Octave, velocity: Velocity): void
  abstract playDrumKit(channel: number, key: DrumKit, velocity: Velocity): void
  abstract stopNote(channel: number, note: Note, octave: Octave): void
  abstract stopDrumKit(channel: number, key: DrumKit): void
  abstract destroy(): void
}
