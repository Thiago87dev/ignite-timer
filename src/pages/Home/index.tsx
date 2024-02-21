import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import {
  HomeContainter,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import NewCycleForm from './components/NewCycloForm'
import Countdown from './components/Countdown'

interface NewCicleFormData {
  task: string
  minutesAmout: number
}

interface Cycle {
  id: string
  task: string
  minutesAmout: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function handlecreateNewCicle(data: NewCicleFormData): void {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmout: data.minutesAmout,
      startDate: new Date(),
    }
    setCycles((prevState) => [...prevState, newCycle])
    setActiveCycleId(id)
    setAmoutSecondsPassed(0)
    reset()
  }

  function handleInterruptCycle() {
    setCycles((prevState) =>
      prevState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

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

  const task = watch('task')
  const minutesAmout = watch('minutesAmout')
  const isSubmitDisabled = !task || !minutesAmout

  return (
    <HomeContainter>
      <form onSubmit={handleSubmit(handlecreateNewCicle)}>
        <NewCycleForm />
        <Countdown
          activeCycleId={activeCycleId}
          setCycles={setCycles}
          activeCycle={activeCycle}
        />

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainter>
  )
}

export default Home
