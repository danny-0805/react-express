import React, {useState} from 'react'

import './style.css'

const MemberAdd = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const handleSubmit = () => {
    const payload = {
      name,
      email,
    }
    
    props.handleAdd(payload)
  }

  return (
    <div className="member-add-container">

    <label>Name: </label>
    <input type="text" name="name" required value={name} onChange={e => setName(e.target.value)} />
    <br/>

    <label>Email: </label>
    <input type="email" name="email" required value={email} onChange={e => setEmail(e.target.value)} />
    <br/>

    <button type="submit" onClick={handleSubmit}>Add</button></div>
  )
}

export default MemberAdd