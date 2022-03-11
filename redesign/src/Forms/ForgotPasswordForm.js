import React, {useState} from 'react';
import api from '../api';
import {useFormData} from './useFormData';
import './forms.css';

const handleLogin = data => api.updatePassword(data.email);

const ForgotPasswordForm = () => {
  const [showForm, setShowForm] = useState(false);
  const {formData, handleSubmit, handleInputChange} = useFormData(handleLogin);

  return (
    <div className="form-page-container">
      <button onClick={() => setShowForm(t => !t)} type="button">Forgot Passowrd</button>
      <form className={showForm ? 'basic-form' : 'hidden basic-form'} onSubmit={handleSubmit}>
        <h3>Request New Password</h3>
        <div className="field-pair">
          <label htmlFor="forgot_email">Email </label>
          <input
            type="email"
            name="email"
            id="forgot_email"
            value={formData.email || ''}
            onChange={handleInputChange}
          />
        </div>
        <button disabled={!formData.email} type="submit">submit</button>
      </form>
    </div>
  )
}

export default ForgotPasswordForm;
