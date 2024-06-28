import { useInputContext } from '../context'
import { FullGestureState, useDrag, UserDragConfig } from '@use-gesture/react'

export function useDragGesture(handler: (state: FullGestureState<'drag'>) => any, config?: UserDragConfig) {
  const { emitOnEditStart, emitOnEditEnd } = useInputContext()
  return useDrag((state) => {
    if (state.first) {
      document.body.classList.add('leva__panel__dragged')
      emitOnEditStart?.()
    }
    const result = handler(state)
    if (state.last) {
      document.body.classList.remove('leva__panel__dragged')
      emitOnEditEnd?.()
    }
    return result
  }, config)
}
