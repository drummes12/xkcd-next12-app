import { useState } from 'react'

export function useStateComponent() {
  const [stateComponent, setStateComponent] = useState({ loading: false, error: null })

  const updateStateComponent = (key, value) => {
    setStateComponent((prev) => {
      const newState = { ...prev }
      newState[key] = value
      return newState
    })
  }

  return { stateComponent, updateStateComponent }
}
