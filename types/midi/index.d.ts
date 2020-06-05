declare module 'midi' {
  export type Message = number[]

  export class Output {
    openVirtualPort(name: string): void
    openPort(index: number): void
    closePort(): void
    sendMessage(message: Message): void
    getPortCount(): number
    getPortName(index: number): string
  }

  export class Input {
    openVirtualPort(name: string): void
    closePort(): void
    sendMessage(message: Message): void
    getPortCount(): number
    getPortName(index: number): string
    openPort(index: number): void
  }
}
