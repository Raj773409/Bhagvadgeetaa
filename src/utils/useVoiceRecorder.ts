import { useEffect, useRef, useState } from 'react'

type RecorderState = 'idle' | 'requesting' | 'recording' | 'recorded' | 'denied' | 'unsupported'

/** A real, client-only microphone recorder using the browser's native MediaRecorder API.
 * Nothing is uploaded anywhere — the Blob exists only in this tab's memory until the page
 * is left or the recording is explicitly deleted. Permission is requested only on start(). */
export function useVoiceRecorder() {
  const [state, setState] = useState<RecorderState>(() => (typeof MediaRecorder === 'undefined' ? 'unsupported' : 'idle'))
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    streamRef.current?.getTracks().forEach(track => track.stop())
  }, [audioUrl])

  async function start() {
    if (state === 'unsupported') return
    setState('requesting')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []
      recorder.ondataavailable = event => { if (event.data.size > 0) chunksRef.current.push(event.data) }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        setAudioUrl(url => { if (url) URL.revokeObjectURL(url); return URL.createObjectURL(blob) })
        setState('recorded')
        stream.getTracks().forEach(track => track.stop())
      }
      recorderRef.current = recorder
      recorder.start()
      setState('recording')
    } catch {
      setState('denied')
    }
  }
  function stop() { recorderRef.current?.state === 'recording' && recorderRef.current.stop() }
  function reset() {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioUrl(null)
    setState(state === 'unsupported' ? 'unsupported' : 'idle')
  }
  return { state, audioUrl, start, stop, reset }
}
