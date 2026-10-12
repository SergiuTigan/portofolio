// Ten-line history router. Routes: "/" and "/work/:id". Legacy "#/case/:id"
// hashes are promoted to real paths so old links keep working.
import { useCallback, useEffect, useState } from 'react'

export function parsePath(pathname = window.location.pathname, hash = window.location.hash) {
  const h = hash.match(/^#\/case\/([\w-]+)/)
  if (h) return { view: 'case', id: h[1] }
  const m = pathname.match(/^\/work\/([\w-]+)\/?$/)
  if (m) return { view: 'case', id: m[1] }
  return { view: 'home', id: null }
}

export function useRoute() {
  const [route, setRoute] = useState(() => parsePath())

  useEffect(() => {
    // promote legacy hash links to a clean path — on load and whenever the hash changes
    const promote = () => {
      const h = window.location.hash.match(/^#\/case\/([\w-]+)/)
      if (h) history.replaceState(null, '', '/work/' + h[1])
      setRoute(parsePath())
    }
    promote()
    window.addEventListener('popstate', promote)
    window.addEventListener('hashchange', promote)
    return () => { window.removeEventListener('popstate', promote); window.removeEventListener('hashchange', promote) }
  }, [])

  const navigate = useCallback((path, { replace = false } = {}) => {
    if (path === window.location.pathname + window.location.hash) return
    history[replace ? 'replaceState' : 'pushState'](null, '', path)
    setRoute(parsePath(path, ''))
  }, [])

  return [route, navigate]
}
