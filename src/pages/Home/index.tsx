import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { createContext, useContext, useEffect, useState } from 'react'
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

interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFineshed: () => void
}

export const CycleContext = createContext({} as CycleContextType)

const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFineshed() {
    setCycles((prevState) =>
      prevState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

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

  const task = watch('task')
  const minutesAmout = watch('minutesAmout')
  const isSubmitDisabled = !task || !minutesAmout

  return (
    <HomeContainter>
      <form onSubmit={handleSubmit(handlecreateNewCicle)}>
        <CycleContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFineshed }}
        >
          <NewCycleForm />
          <Countdown />
        </CycleContext.Provider>

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
