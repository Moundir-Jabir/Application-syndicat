import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormCard from '../components/forms/FormCard'
import { login } from '../redux/feature/auth/authSlice'

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: "", password: ""
  })

  const submit = (e) => {
    e.preventDefault()
    dispatch(login(user))
    navigate('/dashboard')
  }
  const { email, password } = user
  let inputs = [
    { name: "email", value: email, type: "email", icon: "mail_outline", label: "Email", error: "" },
    { name: "password", value: password, type: "password", icon: "lock_outline", label: "Password", error: "" }
  ]
  return (
    <FormCard submit={submit} title="Login" button="Login" inputs={inputs} setState={setUser} state={user} />
  )
}

export default Login