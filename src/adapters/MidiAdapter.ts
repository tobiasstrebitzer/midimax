import { Output } from 'midi'
import { Adapter } from '../core/classes/Adapter'
import { DrumKit, Note, Octave, Status, Velocity } from '../core/util/message'

export interface MidiAdapterOptions {
  name: string
  port?: number
}

const DEFAULTS: MidiAdapterOptions = {
  name: 'midimax'
}

export class MidiAdapter extends Adapter {
  private options: MidiAdapterOptions
  private output: Output

  constructor(options?: Partial<MidiAdapterOptions>) {
    super()
    this.options = { ...DEFAULTS, ...options }
    this.output = new Output()
    if (this.options.port) {
      this.output.openPort(this.options.port)
    } else {
      this.output.openVirtualPort(this.options.name)
    }
  }

  playNote(channel: number, note: Note, octave: Octave, velocity: Velocity) {
    this.sendMessage(Status.NoteOn + channel - 1, octave + note, velocity)
  }

  playDrumKit(channel: number, key: DrumKit, velocity: Velocity) {
    this.sendMessage(Status.NoteOn + channel - 1, key, velocity)
  }

  stopNote(channel: number, note: Note, octave: Octave) {
    this.sendMessage(Status.NoteOff + channel - 1, note + octave, 0)
  }

  stopDrumKit(channel: number, key: DrumKit) {
    this.sendMessage(Status.NoteOff + channel - 1, key, 0)
  }

  sendMessage(...args: number[]) {
    this.output.sendMessage(args)
  }

  destroy() {
    this.output.closePort()
  }
}
