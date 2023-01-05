import React, { useState } from 'react'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import FormCard from '../components/forms/FormCard'

const Login = () => {

  const [user, setUser] = useState({
    email: "", password: ""
  })

  const submit = (e) => {
    e.preventDefault()
    console.log(user)
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