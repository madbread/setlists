// This hook handles input changes on a form
//   and returns them as an inputs object
import {useState} from 'react'
const noop = () => {}

export const useFormData = (onSubmit = noop, init = {}) => {
  const [formData, setFormData] = useState(init)

  const handleReset = e => {
    if (e?.preventDefault) e?.preventDefault()
    setFormData(init)
  }

  const handleSetFormData = data => setFormData(data)

  const handleSubmit = e => {
    if (e?.preventDefault) e?.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = e => {
    if (e?.persist) e.persist()
    setFormData(formData => ({
      ...formData,
      [e.target.name]:e.target.value
    }))
  }

  return {
    formData,
    handleSubmit,
    handleInputChange,
    handleReset,
    handleSetFormData    
  }
}
