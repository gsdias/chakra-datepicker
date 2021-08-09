import React, { forwardRef } from 'react'
import { InputProps } from '../index.d'
import { Input } from './style'

export default forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, ns, readonly, onClick, onFocus }: InputProps, ref) => (
    <Input
      ref={ref}
      value={value}
      onChange={onChange}
      className={`${ns}__input`}
      readOnly={readonly}
      placeholder="Date"
      onClick={onClick}
      onFocus={onFocus}
    />
  ),
)
