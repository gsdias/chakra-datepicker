import React from 'react'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'
import { Simulate } from 'react-dom/test-utils'
import { ChakraProvider } from '@chakra-ui/react'
import Calendario from '.'

let container: any

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
})

describe('Calendario', () => {
  it('Should render correctly', () => {
    const tree = renderer
      .create(
        <ChakraProvider>
          <Calendario />
        </ChakraProvider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Calls onclick action', () => {
    // const onClick = jest.fn()
    ReactDOM.render(
      <ChakraProvider>
        <Calendario />
      </ChakraProvider>,
      container,
    )
    const input = container.querySelector('input')
    Simulate.focus(input)
    const datePicker = container.querySelector('.datePicker')
    expect(datePicker).not.toBeNull()
    // expect(onClick).toHaveBeenCalledTimes(1)
  })
})
