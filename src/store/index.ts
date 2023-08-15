import { atom } from "recoil"

export type NumberSet<N extends number> = N extends 1
  ? [number]
  : N extends 2
  ? [number, number]
  : N extends 3
  ? [number, number, number]
  : N extends 4
  ? [number, number, number, number]
  : N extends 5
  ? [number, number, number, number, number]
  : never

type Phase = "Waiting" | "PrePlaying" | "Playing" | "Finishhed"

export const nAtom = atom<1 | 2 | 3 | 4 | 5>({
  key: "n",
  default: 1,
})

export const numberSetAtom = atom<NumberSet<1 | 2 | 3 | 4 | 5>>({
  key: "numberSet",
  default: [0],
})

export const phaseAtom = atom<Phase>({
  key: "phase",
  default: "Waiting",
})

export const currentNumberAtom = atom<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>({
  key: "currentNumber",
  default: 1,
})

export const correctCountAtom = atom<number>({
  key: "correctCount",
  default: 0,
})
