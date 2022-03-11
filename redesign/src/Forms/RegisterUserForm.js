import React, {useState} from 'react';
import api from '../api';
import {useFormData} from './useFormData';
import './forms.css';

const handleLogin = data => api.registerUser(data.email, data.pass);

const RegisterUserForm = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const {formData, handleSubmit, handleInputChange} = useFormData(handleLogin);

  return (
    <div className="form-page-container">
      <button onClick={() => setShowRegisterForm(t => !t)} type="button">Register New Account</button>
      <form className={showRegisterForm ? 'basic-form' : 'hidden basic-form'} onSubmit={handleSubmit}>
        <h3>Madbread Setlist App Register User</h3>
        <div className="field-pair">
          <label htmlFor="register_email">Email </label>
          <input
            type="email"
            name="email"
            id="register_email"
            value={formData.email || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="field-pair">
          <label htmlFor="pass">Password </label>
          <input
            id="pass"
            type="text"
            name="pass"
            value={formData.pass || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="field-pair">
          <label htmlFor="confirm">Confirm New Password</label>
          <input
            type="text"
            name="confirm"
            id="confirm"
            value={formData.confirm || ''}
            onChange={handleInputChange}
          />
        </div>

        <button disabled={!formData.email || !formData.pass || (formData.pass !== formData.confirm)} type="submit">submit</button>
      </form>
    </div>
  )
}

export default RegisterUserForm;
