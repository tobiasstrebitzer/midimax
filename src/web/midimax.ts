import { SoundFontAdapter } from '../adapters/SoundFontAdapter'
import { Controller, Note, Octave, one, Scale, Velocity } from '../core'

async function main() {
  // Create soundfont adapter
  const sfAdapter = new SoundFontAdapter()
  await sfAdapter.loadChannel(1, '/soundfonts/marimba.js')
  await sfAdapter.loadChannel(2, '/soundfonts/piano.js')
  await sfAdapter.loadChannel(3, '/soundfonts/drums.js')

  // Create controller
  const controller = Controller.managed({ beatsPerMinute: 120 })
  controller.setAdapter('sf', sfAdapter)
  controller.createTrack('marimba', { adapter: 'sf', channel: 1 })
  controller.createTrack('piano', { adapter: 'sf', channel: 2 })
  controller.createTrack('drums', { adapter: 'sf', channel: 3 })

  // Create marimba sequence
  controller.getTrack('marimba').every(1 / 16, (track, tick) => {
    const scale = Math.floor(tick / 64) % 2 === 0 ? Scale.PENTATONIC : Scale.BLUES
    const note = one(...scale) + Math.floor(tick / 32) * 4
    track.playNote(note, Octave.THREE, one(Velocity.PPP, Velocity.MP, Velocity.MF))
  })

  // Create piano sequence
  controller.getTrack('piano').every(1 / 2, (track, tick) => {
    const scale = Math.floor(tick / 64) % 2 === 0 ? Scale.PENTATONIC : Scale.BLUES
    const note = one(...scale) + Math.floor(tick / 32) * 4
    track.playNote(note, Octave.TWO, one(Velocity.PPP, Velocity.MP, Velocity.MF))
  })

  // Create drums sequence
  controller.getTrack('drums').every(1 / 8, (track, tick) => {
    if (tick % 4 === 2) { track.playNote(Note.B, Octave.TWO, one(Velocity.MP, Velocity.MF)) }
    if (tick % 4 === 0) { track.playNote(Note.AS, Octave.MINUS_ONE, one(Velocity.MF)) }
    track.playNote(Note.E, Octave.TWO, one(Velocity.PPP, Velocity.MP, Velocity.MF))
  })

  controller.reset()
}

main()
