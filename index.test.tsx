import React from 'react'
import renderer from 'react-test-renderer'
import ThemeProvider from '../../providers/ThemeProvider'
import Calendario from '.'

describe('Calendario', () => {
  it('Should render correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <Calendario />
        </ThemeProvider>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
