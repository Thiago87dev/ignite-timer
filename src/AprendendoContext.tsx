import { createContext, useContext, useState } from 'react'

const CycleContext = createContext({} as any)

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CycleContext)

  return (
    <div>
      <h1>NewCycloForm: {activeCycle}</h1>
      <button
        onClick={() => {
          setActiveCycle(2)
        }}
      >
        Alterar ciclo ativo
      </button>
    </div>
  )
}

function Countdown() {
  const { activeCycle } = useContext(CycleContext)

  return <h1>Countdown: {activeCycle}</h1>
}

const Home = () => {
  const [activeCycle, setActiveCycle] = useState(0)
  return (
    <CycleContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <NewCycleForm />
        <Countdown />
      </div>
    </CycleContext.Provider>
  )
}

export default Home
