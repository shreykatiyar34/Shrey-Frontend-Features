import type { ClipboardEvent, KeyboardEvent } from 'react'
import { useEffect, useRef } from 'react'

type OtpInputProps = {
  length: number
  value: string[]
  onChange: (value: string[]) => void
}

export function OtpInput({ length, value, onChange }: OtpInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const updateValue = (index: number, nextChar: string) => {
    const normalized = nextChar.replace(/[^0-9]/g, '').slice(-1)
    const next = [...value]
    next[index] = normalized
    onChange(next)
    if (normalized && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      if (value[index]) {
        updateValue(index, '')
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus()
      }
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
    if (event.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, length)
    if (!pasted) return
    const next = [...value]
    for (let i = index; i < length; i++) {
      const char = pasted[i - index]
      if (char === undefined) break
      next[i] = char
    }
    onChange(next)
    const nextFocusIndex = Math.min(index + pasted.length, length - 1)
    inputsRef.current[nextFocusIndex]?.focus()
  }

  return (
    <div className="otp-input" role="group" aria-label="One-time password">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(element) => {
            inputsRef.current[index] = element
          }}
          className="otp-input__box"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] ?? ''}
          onChange={(event) => updateValue(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  )
}

