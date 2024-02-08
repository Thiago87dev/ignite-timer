import { Play } from 'phosphor-react'
import React from 'react'
import {
  CountDownContainer,
  FormContainer,
  HomeContainter,
  Separator,
} from './styles'

const Home = () => {
  return (
    <HomeContainter>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <input type="text" id="task" />

          <label htmlFor="minutesAmout">Durante</label>
          <input type="number" id="minutesAmout" />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <button type="submit">
          <Play size={24} />
          Começar
        </button>
      </form>
    </HomeContainter>
  )
}

export default Home
