import React, { useReducer, useContext, useEffect } from 'react'

export const AuthStateContext = React.createContext({})

const initialState = { name: '', username: '', email: '' }

const reducer = (state, action) => {
  switch (action.type) {
    case 'setAuthDetails':
      return {
        name: action.payload.name,
        username: action.payload.username,
        email: action.payload.email
      }
    case 'removeAuthDetails':
      return {
        name: initialState.name,
        username: initialState.username,
        email: initialState.email
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const AuthProvider = ({ children }) => {
  let localState = null
  if (typeof localStorage !== 'undefined' && localStorage.getItem('userInfo')) {
    localState = JSON.parse(localStorage.getItem('userInfo') || '')
  }

  const [state, dispatch] = useReducer(reducer, localState || initialState)

  // if (typeof localStorage !== 'undefined') {
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('userInfo', JSON.stringify(state))
    }
  }, [state])
  // }

  return (
    <AuthStateContext.Provider value={[state, dispatch]}>
      {children}
    </AuthStateContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthStateContext)
