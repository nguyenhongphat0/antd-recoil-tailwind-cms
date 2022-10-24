import { useRef, useState, useEffect, MutableRefObject } from 'react'

const useOnScreen: () => [MutableRefObject<HTMLDivElement | null>, boolean] = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  )

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current)
    }
    // Remove the observer as soon as the component is unmounted
    return () => { observer.disconnect() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, isIntersecting]
}

export default useOnScreen