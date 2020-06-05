export enum Status {
  NoteOn = 0b10010000,
  NoteOff = 0b10000000,
  PolyphonicKeyPressure = 0b10100000,
  ControlChange = 0b10110000,
  ProgramChange = 0b11000000,
  ChannelPressure = 0b11010000,
  PitchWheelChange = 0b11100000,
  ChannelModeMessages = 0b10110000,
  SystemExclusive = 0b11110000
}

export enum Octave {
  MINUS_ONE = 1 * 12,
  ZERO = 2 * 12,
  ONE = 3 * 12,
  TWO = 4 * 12,
  THREE = 5 * 12,
  FOUR = 6 * 12,
  FIVE = 7 * 12,
  SIX = 8 * 12,
  SEVEN = 9 * 12,
  EIGHT = 10 * 12,
  NINE = 11 * 12,
}

export enum Note {
  C = 0,
  CS = 1,
  DF = 1,
  D = 2,
  DS = 3,
  EF = 3,
  E = 4,
  F = 5,
  FS = 6,
  GF = 6,
  G = 7,
  GS = 8,
  AF = 8,
  A = 9,
  AS = 10,
  BF = 10,
  B = 11
}

export enum Velocity {
  ZERO = 0,
  PPPP = 8,
  PPP = 20,
  PP = 31,
  P = 42,
  MP = 53,
  MF = 64,
  F = 80,
  FF = 96,
  FFF = 112,
  FFFF = 127
}

export enum DrumKit {
  CLAVE = Octave.FOUR + Note.DS,
  SHAKER = Octave.THREE + Note.AS,
  RIDE_IN = Octave.TWO + Note.B,
  CRASH_RIGHT = Octave.TWO + Note.A,
  COWBELL = Octave.TWO + Note.GS,
  TAMBOURINE = Octave.TWO + Note.FS,
  RIDE_BELL = Octave.TWO + Note.F,
  RIDE_EDGE = Octave.TWO + Note.E,
  RIDE_OUT = Octave.TWO + Note.DS,
  HI_TOM_ALT = Octave.TWO + Note.D,
  CRASH_LEFT = Octave.TWO + Note.CS,
  HI_TOM = Octave.TWO + Note.C,
  MID_TOM_ALT = Octave.ONE + Note.B,
  HIHAT_OPEN = Octave.ONE + Note.AS,
  MID_TOM = Octave.ONE + Note.A,
  HIHAT_FOOT_CLOSE_ALT = Octave.ONE + Note.GS,
  LOW_TOM_ALT = Octave.ONE + Note.G,
  HIHAT_CLOSED = Octave.ONE + Note.FS,
  LOW_TOM = Octave.ONE + Note.F,
  SNARE_RIMSHOT = Octave.ONE + Note.E,
  HAND_CLAP = Octave.ONE + Note.DS,
  SNARE_CENTER = Octave.ONE + Note.D,
  SNARE_SIDESTICK = Octave.ONE + Note.CS,
  KICK_ALT = Octave.ONE + Note.C,
  KICK = Octave.ZERO + Note.B,
  SNARE_EDGE = Octave.ZERO + Note.AS,
  HIHAT_FOOT_CLOSE = Octave.ZERO + Note.A,
  SNARE_RIMSHOT_EDGE = Octave.ZERO + Note.GS,
  HIHAT_FOOT_SPLASH = Octave.ZERO + Note.G,
  CRASH_RIGHT_STOP = Octave.ZERO + Note.F,
  CRASH_LEFT_STOP = Octave.ZERO + Note.E
}
