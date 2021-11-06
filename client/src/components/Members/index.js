import React, {useState, useEffect} from 'react'
import axios from 'axios'

import MemberAdd from '../MemberAdd'
import './style.css';

function Members() {
  const [members, setMembers] = useState([])
  useEffect(() => {
    axios.get('/api/members').then(res =>setMembers(res.data))
  }, [])

  const handleAdd = (payload) => {
    axios.post('/api/member', payload)
      .then(res => setMembers(res.data))
      .catch(err => console.log(err))
  }

  const handleRemove = id => {    
    axios.delete(`/api/member/${id}`)
      .then(res => setMembers(res.data))
      .catch(err => console.log(err))
  }
  
  return (
    <div className="Member">
      <h1>Members</h1>
      <MemberAdd handleAdd={handleAdd} />
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.name}
            <span onClick={() => handleRemove(member.id)}>X</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Members;
