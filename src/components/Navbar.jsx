import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('loggedInUser')
    navigate('/')
  }

  const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}')

  return (
    <nav className="navbar">
      <h1 className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        myINVOICE
      </h1>
      <div className="nav-right">
        <span className="nav-user">👋 {user.name}</span>
        <button onClick={() => navigate('/dashboard')} className="btn-nav">Dashboard</button>
        <button onClick={() => navigate('/settings')} className="btn-nav">Settings</button>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
    </nav>
  )
}

export default Navbar