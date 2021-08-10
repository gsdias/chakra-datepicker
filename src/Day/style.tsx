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
  }) => {
    let targetColor = backgroundColor === 'blue' ? '#17659C' : ''
    if (backgroundColor === 'cyan') {
      targetColor = '#8DDFFE'
    }
    return css`
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
  background: ${variant === 'solid' && targetColor};
  transition: none;
  border: ${variant === 'outline' ? `solid 1px ${targetColor}` : 0};

  &.datePicker__day {
    &--today:not(&--selected) {
      border: solid 1px #17659C;
    }

    &--in-range {
      color: #fff;
    }
  }

  &:focus,&:active {
    box-shadow: 0 0 4px -1px #000;
    z-index: 1 ;
  }
}
  `
  },
)

export default {
  Button,
}
