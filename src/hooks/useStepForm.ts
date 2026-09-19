import { useState, type FormEvent } from 'react'
import { useOnboarding } from '../context/OnboardingContext'
import { validateStep } from '../lib/validation'

export function useStepForm(step: number, onValid: () => void) {
  const { data } = useOnboarding()
  const [attempted, setAttempted] = useState(false)
  const errors = attempted ? validateStep(step, data) : {}

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
    if (Object.keys(validateStep(step, data)).length) {
      const form = event.currentTarget
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }
    onValid()
  }

  return { errors, onSubmit }
}
