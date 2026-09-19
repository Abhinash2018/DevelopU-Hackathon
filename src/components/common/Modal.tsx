import { useEffect, useId, useRef, type ReactNode } from 'react'
import { Button } from './Button'
import { Icon } from './Icon'

export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  useEffect(() => {
    const dialog = ref.current!
    const previousFocus = document.activeElement as HTMLElement | null
    dialog.showModal()
    return () => { dialog.close(); previousFocus?.focus() }
  }, [])

  return <dialog ref={ref} className="modal" aria-labelledby={titleId} onCancel={event => { event.preventDefault(); onClose() }}>
    <div className="flex items-start justify-between gap-4">
      <span className="eyebrow">A LOOK AHEAD</span>
      <button className="icon-button" onClick={onClose} aria-label="Close dialog"><Icon name="close" /></button>
    </div>
    <h2 id={titleId}>{title}</h2>
    <div className="modal-content">{children}</div>
    <Button onClick={onClose}>Back to accounts <Icon name="back" /></Button>
  </dialog>
}
