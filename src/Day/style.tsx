import styled, { css } from 'styled-components'

export const Button = styled.button(
  ({
    borderRadius,
    backgroundColor,
    variant,
  }: {
    borderRadius: string | number
    backgroundColor: string
    variant: string
  }) => css`
  display: inline-flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  outline: 2px solid transparent;
  outline-offset: 2px;
  width: auto;
  line-height: 1.2;
  border-radius: ${borderRadius};
  font-weight: 300;
  height: 2rem;
  font-size: 12px;
  color: #000;
  background: ${variant === 'solid' && backgroundColor};
  transition: none;
  border: ${variant === 'outline' ? `solid 1px ${backgroundColor}` : 0};

  &:focus {
    box-shadow: 0 0 5px #000;
  }
}
  `,
)
