import { useEffect } from 'react'
import { getRandomPairOfColors } from '@lib/colors'

import { useAppDispatch, useAppSelector } from '@lib/store'
import { selectState, uiSlice } from '@components/base/uiSlice'

export const useUserAvatar = (name = 'userAvatar') => {
  const dispatch = useAppDispatch()
  const { userAvatar } = useAppSelector(selectState)

  const setUserAvatar = (value: string) => {
    dispatch(uiSlice.actions.setUserAvatar({ value }))
  }

  useEffect(() => {
    const nameStored = localStorage.getItem(name)
    if (!userAvatar && nameStored) {
      // Get bg from localStorage and push it to the context.
      setUserAvatar(nameStored)
    }
    if (!localStorage.getItem(name)) {
      // bg not set locally, generating one, setting localStorage and context to persist.
      const bg = getRandomPairOfColors()
      const value = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`
      localStorage.setItem(name, value)
      setUserAvatar(value)
    }
  }, [userAvatar, setUserAvatar])

  return {
    userAvatar,
    setUserAvatar,
  }
}
