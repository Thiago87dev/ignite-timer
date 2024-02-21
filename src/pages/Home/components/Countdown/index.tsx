import { useContext, useEffect, useState } from 'react'
import { CountDownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CycleContext } from '../..'

const Countdown = () => {
  const { activeCycle, activeCycleId, markCurrentCycleAsFineshed } =
    useContext(CycleContext)
  const [amoutSecondsPassed, setAmoutSecondsPassed] = useState(0)

  const totalSeconds = activeCycle ? activeCycle.minutesAmout * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFineshed()
          setAmoutSecondsPassed(totalSeconds)

          clearInterval(interval)
        } else {
          setAmoutSecondsPassed(secondsDifference)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFineshed])

  const currentSeconds = activeCycle ? totalSeconds - amoutSecondsPassed : 0

  const minutesAmoutTime = Math.floor(currentSeconds / 60)
  const secondsAmoutTime = currentSeconds % 60

  const minutes = String(minutesAmoutTime).padStart(2, '0')
  const seconds = String(secondsAmoutTime).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}

export default Countdown
