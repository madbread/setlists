import React from 'react'
import api from '../api/'
import {useFormData} from './useFormData'
import './forms.css'

const handleLogin = data => api.login(data.login_email, data.login_pass)

const LoginForm = () => {
  const {formData, handleSubmit, handleInputChange} = useFormData(handleLogin)

  return (
    <form className="basic-form" onSubmit={handleSubmit}>
      <h3>Madbread Setlist App Login</h3>
      <div className="field-pair">
        <label htmlFor="login_email">Email </label>
        <input
          type="email"
          name="login_email"
          id="login_email"
          value={formData.login_email || ''}
          onChange={handleInputChange}
        />
      </div>
      <div className="field-pair">
        <label htmlFor="login_pass">Password </label>
        <input
          id="login_pass"
          type="password"
          name="login_pass"
          value={formData.login_pass || ''}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
