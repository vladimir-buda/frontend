import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
        try {
      const res = await axios.get('http://localhost:3000/api/auth/me'
     ,{ withCredentials: true }
    )

      sessionStorage.setItem('user', res.data.user)
      onLogin()

    } catch (err) {
      alert('Login failed')
    }
  })


  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password
      }
     ,{ withCredentials: true }
    )

      sessionStorage.setItem('user', res.data.user)
      onLogin()

    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}