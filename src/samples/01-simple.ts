import { MidiAdapter } from '../adapters/MidiAdapter'
import { Controller, Note, Octave, one, Velocity } from '../core'

// Create adapter
const adapter = new MidiAdapter({ name: 'midimax', port: 1 })
// const adapter = new SoundbankAdapter()

// Create controller
const controller = Controller.managed({ beatsPerMinute: 120 })
controller.setAdapter('default', adapter)
controller.createTrack('piano', { adapter: 'default', channel: 2 })

// Create track sequence
controller.getTrack('piano').every(1 / 8, (track) => {
  const velocity = one(Velocity.P, Velocity.MP, Velocity.MF)
  const note = one(Note.C, Note.E, Note.F, Note.G, Note.B)
  const octave = one(Octave.TWO, Octave.THREE)
  track.playNote(note, octave, velocity)
})
