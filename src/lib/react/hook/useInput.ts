import type { Dispatch, RefObject, SetStateAction } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { TextInput } from 'react-native'

interface InputStates {
  name: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  validity: boolean
  ref: RefObject<TextInput>
  isFocused: boolean
  setIsFocused: Dispatch<SetStateAction<boolean>>
  isMasked: boolean
  setIsMasked: Dispatch<SetStateAction<boolean>>
  options?: InputOptions
}

interface InputOptions {
  isNumber?: boolean
  canEmpty?: boolean
  minLength?: number
  maxLength?: number
  length?: number
  trim?: boolean
  isMasked?: boolean
  initialValue?: string
  validate?: (value: string) => boolean
}

const useInput = (name: string, options?: InputOptions): InputStates => {
  const [value, setValue] = useState(options?.initialValue ?? '')
  const [isFocused, setIsFocused] = useState(false)
  const [isMasked, setIsMasked] = useState(options?.isMasked ?? false)
  const { validate, isNumber = false, canEmpty = false, minLength, maxLength, length, trim } = { ...options }
  const validity = useMemo(() => {
    if (isNumber && isNaN(Number(value))) return false
    if (!canEmpty && value.trim().length === 0) return false
    if (length && value.length !== length) return false
    if (minLength && value.length < minLength) return false
    if (maxLength && value.length > maxLength) return false
    if (validate) return validate(value)

    return true
  }, [value])
  const ref = useRef<TextInput>(null)

  useEffect(() => {
    trim && setValue(value.trim())
  }, [value])

  return {
    name,
    value,
    setValue,
    validity,
    ref,
    isFocused,
    setIsFocused,
    isMasked,
    setIsMasked,
    options: {
      ...options,
      ...(length && {
        maxLength: length,
        minLength: length
      })
    }
  }
}

export type { InputStates }
export default useInput
