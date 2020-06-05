import { Controller, DrumKit, Note, Octave, one, Velocity } from '../core'

// Create controller
const controller = Controller.managed({ beatsPerMinute: 120 })
controller.createTrack('gamelan', { channel: 1 })
controller.createTrack('piano', { channel: 2 })
controller.createTrack('guitar', { channel: 3 })
controller.createTrack('drums', { channel: 4 })

// Create Gamelan track
controller.getTrack('gamelan').every(1 / 8, (track) => {
  const velocity = one(Velocity.P, Velocity.MP, Velocity.MF)
  const note = one(Note.C, Note.E, Note.F, Note.G, Note.B)
  const octave = one(Octave.TWO, Octave.THREE)
  track.playNote(note, octave, velocity)
})

// Create Electric Piano track
controller.getTrack('piano').every(1 / 2, (track) => {
  const velocity = one(Velocity.MF, Velocity.F, Velocity.FF)
  const note = one(Note.C, Note.E, Note.G)
  const octave = one(Octave.ONE, Octave.TWO)
  track.playNote(note, octave, velocity)
})

// Create Guitar track
controller.getTrack('guitar').every(1 / 16, (track, tick) => {
  if (tick % 4 === 0 || tick % 4 === 1) { return }
  track.playNote(one(Note.E, Note.G), Octave.TWO, one(Velocity.MP, Velocity.MF, Velocity.F))
})

// Create Drums track
controller.getTrack('droms').every(1 / 16, (track, tick) => {
  if (tick % 8 === 0 || tick % 16 === 15) { track.playDrumKit(DrumKit.KICK) }
  if (tick % 4 === 1 || tick % 4 === 3) { track.playDrumKit(DrumKit.SNARE_CENTER, one(Velocity.PPP, Velocity.PPPP)) }
  if (tick % 8 === 4) { track.playDrumKit(DrumKit.SNARE_RIMSHOT, Velocity.MF) }
  if (tick % 8 === 2) { track.playDrumKit(DrumKit.HIHAT_CLOSED, Velocity.MF) }
  if (tick % 8 === 0) { track.playDrumKit(DrumKit.HIHAT_FOOT_SPLASH, Velocity.MF) }
  if (tick % 16 === 14 || tick % 16 === 15) { track.playDrumKit(DrumKit.SNARE_CENTER, Velocity.MF) }
})
