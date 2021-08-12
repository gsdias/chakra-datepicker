import styled, { css } from 'styled-components'

type ButtonProps = {
  borderRadius?: string | number
  backgroundColor?: string
  variant?: string
}

export const Button = styled.button(
  ({
    borderRadius = '0.375rem',
    backgroundColor = '#fff',
    variant = 'solid',
  }: ButtonProps) => {
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
  font-weight: 400;
  height: 38px;
  font-size: 14px;
  color: #000;
  background: ${variant === 'solid' && targetColor};
  transition: none;
  border: ${variant === 'outline' ? `solid 1px ${targetColor}` : 0};

  &.datePicker__day {
    &--today {
      position: relative;
      &:after {
        content: '';
        width: 15px;
        height: 2px;
        background-color: #ccc;
        left: 50%;
        transform: translatex(-50%);
        position: absolute;
        bottom: 3px;
        border-radius: 5px;
      }
      &.datePicker__day--selected {
        &:after {
          background-color: #000;
        }
      }
    }

    &--in-range {
      color: ${variant === 'outline' ? '#000' : '#fff'};
    }

    &--disabled {
      color: #ccc;
    }
  }

  &:focus,&:active {
    box-shadow: 0 0 4px -1px #000;
    z-index: 1;
  }
}
  `
  },
)

export default {
  Button,
}
