import { useRecoilState } from "recoil"
import {
  NumberSet,
  correctCountAtom,
  currentNumberAtom,
  nAtom,
  numberSetAtom,
  phaseAtom,
} from "../store"
import { useEffect, useMemo, useState } from "react"

export const useNBack = () => {
  const [n, setN] = useRecoilState(nAtom)
  const [numberSet, setNumberSet] = useRecoilState(numberSetAtom)
  const [phase, setPhase] = useRecoilState(phaseAtom)
  const [currentNumber, setCurrentNumber] = useRecoilState(currentNumberAtom)
  const [correctCount, setCorrectCount] = useRecoilState(correctCountAtom)

  // local state
  const [nIndex, setNIndex] = useState(0)

  const start = () => {
    if (phase !== "Waiting") {
      return
    }

    setNIndex(0)

    // generates random numbers for _n times to create tupple
    // and set it to setNumberSet
    const _numberSet = Array.from({ length: n }, () =>
      Math.floor(Math.random() * 9 + 1)
    ) as NumberSet<typeof n>
    setNumberSet(_numberSet)

    setPhase("PrePlaying")
  }

  const reset = () => {
    setCorrectCount(0)
    setPhase("Waiting")
  }

  useEffect(() => {
    if (phase !== "PrePlaying") {
      return
    }

    // per 1 seconds, increment nIndex
    // and if nIndex is greater than n, set phase to Playing
    const interval = setInterval(() => {
      if (nIndex >= n - 1) {
        // generate first random number, the number is 1 to 9
        // and set it to use setCurrentNumber
        const _currentNumber = (Math.floor(Math.random() * 9) + 1) as
          | 1
          | 2
          | 3
          | 4
          | 5
          | 6
          | 7
          | 8
          | 9
        setCurrentNumber(_currentNumber)
        setPhase("Playing")
      } else {
        setNIndex((prev) => prev + 1)
      }
    }, 1_000)

    return () => clearInterval(interval)
  }, [phase, nIndex])

  const displayNumber = useMemo(() => {
    if (phase === "PrePlaying") {
      return numberSet[nIndex]
    }

    if (phase === "Playing") {
      return currentNumber
    }

    return 0
  }, [phase, numberSet, nIndex, currentNumber])

  const selectNumber = (_n: number) => {
    if (phase !== "Playing") {
      return
    }

    if (numberSet[0] === _n) {
      setCorrectCount((prev) => prev + 1)
    }

    const [_, ...rest] = numberSet
    // generate new random number 1 to 9
    // and create new tupple to set numberSet
    const _numberSet = [...rest, currentNumber] as NumberSet<typeof n>
    setNumberSet(_numberSet)

    // genereate new currentNumber
    setCurrentNumber(
      (Math.floor(Math.random() * 9) + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    )
  }

  const isPlaying = useMemo(() => {
    return phase === "Playing"
  }, [phase])

  const isPrePlaying = useMemo(() => {
    return phase === "PrePlaying"
  }, [phase])

  return {
    n,
    setN,
    start,
    reset,
    isPlaying,
    isPrePlaying,
    displayNumber,
    selectNumber,
    correctCount,
  }
}
