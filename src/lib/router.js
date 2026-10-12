// Ten-line history router. Routes: "/" and "/work/:id". Legacy "#/case/:id"
// hashes are promoted to real paths so old links keep working.
import { useEffect, useState } from 'react'

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
    // promote legacy hash links to a clean path
    const h = window.location.hash.match(/^#\/case\/([\w-]+)/)
    if (h) history.replaceState(null, '', '/work/' + h[1])
    const onPop = () => setRoute(parsePath())
    window.addEventListener('popstate', onPop)
    window.addEventListener('hashchange', onPop)
    return () => { window.removeEventListener('popstate', onPop); window.removeEventListener('hashchange', onPop) }
  }, [])

  const navigate = (path, { replace = false } = {}) => {
    if (path === window.location.pathname) return
    history[replace ? 'replaceState' : 'pushState'](null, '', path)
    setRoute(parsePath(path, ''))
  }

  return [route, navigate]
}
