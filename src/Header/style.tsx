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
  `,
)
