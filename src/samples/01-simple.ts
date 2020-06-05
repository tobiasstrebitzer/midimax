import { MidiAdapter } from '../adapters/MidiAdapter'
import { Controller, Note } from '../core'

// Create adapter
const adapter = new MidiAdapter({ name: 'midimax' })
// const adapter = new SoundbankAdapter()

// Create controller
const controller = Controller.managed({ beatsPerMinute: 120 })
controller.setAdapter('default', adapter)
controller.createTrack('piano', { adapter: 'default', channel: 2 })

// Create track sequence
controller.getTrack('piano').every(1 / 8, (track) => {
  track.playNote(Note.C)
})
