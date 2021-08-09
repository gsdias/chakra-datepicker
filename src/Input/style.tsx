import styled, { css } from 'styled-components'

export const Input = styled.input(
  () => css`
    width: 100%;
    outline: 2px solid transparent;
    outline-offset: 2px;
    position: relative;
    appearance: none;
    font-size: 12px;
    padding-inline-start: 10px;
    padding-inline-end: 10px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid;
    border-color: inherit;
    background: inherit;
  `,
)

export default { Input }
