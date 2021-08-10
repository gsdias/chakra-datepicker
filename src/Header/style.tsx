import styled, { css } from 'styled-components'

export const Header = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
)
export const Button = styled.button(
  () => css`
    border: solid 1px #ccc;
    border-radius: 4px;
    width: 30px;
    height: 30px;
    padding-bottom: 4px;
  `,
)
export const Select = styled.select(
  () => css`
    border: solid 1px #ccc;
    border-radius: 4px;
    height: 30px;
    padding: 0 5px;
  `,
)
