import { useForm } from 'react-hook-form'
import { FormContainer, MinutesAmoutInput, TaskInput } from './styles'

const NewCycleForm = () => {
  const { register, handleSubmit, watch, reset } = useForm<NewCicleFormData>({
    defaultValues: {
      task: '',
      minutesAmout: 0,
    },
  })
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
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
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmout', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}

export default NewCycleForm
