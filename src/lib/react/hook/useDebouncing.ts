import type { DependencyList, EffectCallback } from 'react'
import { useEffect } from 'react'

const useDebouncing = (effect: EffectCallback, delay: number, deps: DependencyList) => {
  useEffect(() => {
    const timer = setTimeout(effect, delay)

    return () => clearTimeout(timer)
  }, deps)
}

export default useDebouncing
