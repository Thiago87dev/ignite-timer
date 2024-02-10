import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import {
  CountDownContainer,
  FormContainer,
  HomeContainter,
  MinutesAmoutInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

interface NewCicleFormData {
  task: string
  minutesAmout: number
}

const Home = () => {
  const { register, handleSubmit, watch, reset } = useForm<NewCicleFormData>({
    defaultValues: {
      task: '',
      minutesAmout: 0,
    },
  })

  function handlecreateNewCicle(data: NewCicleFormData): void {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const minutesAmout = watch('minutesAmout')
  const isSubmitDisabled = !task || !minutesAmout

  return (
    <HomeContainter>
      <form onSubmit={handleSubmit(handlecreateNewCicle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Estudar" />
            <option value="Exercitar-se" />
          </datalist>

          <label htmlFor="minutesAmout">Durante</label>
          <MinutesAmoutInput
            type="number"
            id="minutesAmout"
            placeholder="00"
            step={5}
            min={0}
            max={60}
            {...register('minutesAmout', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainter>
  )
}

export default Home
