import React from 'react'
import { useInput } from '../../store'
import { TwixValueInput } from './TwixInputValue'
import { log, TwixErrors } from '../../utils/log'
import { SpecialInputTypes } from '../../types'
import { Plugins } from '../../register'
import { Button } from '../Button'
import { Monitor } from '../Monitor'

type TwixWrapperProps = { valueKey: string; path: string }

const specialComponents = {
  [SpecialInputTypes.BUTTON]: Button,
  [SpecialInputTypes.MONITOR]: Monitor,
}

// TODO we can probably do better than this
export function TwixWrapper({ valueKey, path }: TwixWrapperProps) {
  const { type, ...props } = useInput(path)

  if (type in SpecialInputTypes) {
    // @ts-expect-error
    const SpecialInputForType = specialComponents[type]
    return <SpecialInputForType valueKey={valueKey} path={path} {...props} />
  }

  if (!(type in Plugins)) {
    log(TwixErrors.UNSUPPORTED_INPUT, type, path)
    return null
  }

  const Input = Plugins[type].component

  // @ts-expect-error
  return <TwixValueInput as={Input} type={type} valueKey={valueKey} path={path} {...props} />
}
