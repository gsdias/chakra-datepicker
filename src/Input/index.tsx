import React, { forwardRef } from 'react'
import { InputProps } from '../index.d'
import { Input } from './style'

export default forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      value,
      onChange,
      ns,
      readonly,
      onClick,
      onFocus,
    }: InputProps,
    ref,
  ) => (
    <Input
      ref={ref}
      value={value}
      onChange={onChange}
      className={`${ns}__input`}
      readOnly={readonly}
      placeholder={placeholder || 'Date'}
      onClick={onClick}
      onFocus={onFocus}
    />
  ),
)
