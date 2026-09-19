import { useEffect, useRef, useState } from 'react'
import { Icon } from '../common/Icon'

export function IdentityImageUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!file) { setPreview(''); return }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  function selectFile(next?: File) {
    if (!next) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(next.type)) {
      setError('Choose a JPG, PNG, or WebP image.'); return
    }
    if (next.size > 5 * 1024 * 1024) {
      setError('Choose an image smaller than 5 MB.'); return
    }
    setError('')
    setFile(next)
  }

  return <section className="identity-upload" aria-labelledby="identity-upload-title">
    <div><h2 id="identity-upload-title">Upload your identification image</h2><p>Add a clear image of the front of your ID. Optional for this walkthrough.</p></div>
    <div className="identity-dropzone" onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); selectFile(event.dataTransfer.files[0]) }}>
      {preview ? <img className="identity-preview" src={preview} alt="Selected identification preview" onError={() => { setFile(null); setError('This image could not be opened. Choose another image.') }} /> : <span className="auth-icon"><Icon name="card" size={28} /></span>}
      <label htmlFor="identity-image"><strong>{file ? 'Replace image' : 'Choose an image or drag it here'}</strong></label>
      <input ref={input} id="identity-image" type="file" accept="image/jpeg,image/png,image/webp" aria-describedby="identity-image-hint" onChange={event => { selectFile(event.target.files?.[0]); event.target.value = '' }} />
      <small id="identity-image-hint">JPG, PNG, or WebP · Up to 5 MB</small>
      {file && <div className="identity-file" role="status"><span>{file.name}</span><button type="button" className="member-text-button" onClick={() => { setFile(null); setError(''); if (input.current) input.current.value = '' }}>Remove image</button></div>}
    </div>
    {error && <p className="member-form-error" role="alert">{error}</p>}
    <p className="identity-local-note"><Icon name="lock" size={14} /> Preview only. Your image stays in this browser and is cleared when you leave this page.</p>
  </section>
}
