// This hook returns current user status
import { useState, useEffect } from 'react'
import api from './api'

export const useFetchAuth = () => {
  const [ user, setUser ] = useState({})
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.getLoginObserver((user) => {
        setUser({
            name: user.email || 'Guest',
            logged_in: user.email ? true : false
        })
        setLoading(false)
    })

  }, [])

  return [ loading, user ]
}
