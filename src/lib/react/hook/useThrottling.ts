import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useState } from 'react'

const useThrottling = (effect: EffectCallback, delay: number, deps: DependencyList) => {
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    if (!isWaiting) {
      setIsWaiting(true)
      effect()

      setTimeout(() => {
        setIsWaiting(false)
      }, delay)
    }
  }, deps)
}

export default useThrottling
