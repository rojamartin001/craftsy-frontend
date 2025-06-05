import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { tokenAuthContext } from '../contexts/AuthContextAPI'


const Header = ({insideDashboard}) => {
  const navigate = useNavigate()
  const {isAuthorised, setIsAuthorised} = useContext(tokenAuthContext)

  const logout = ()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }
  return (
    <>
      <Navbar
        style={{ zIndex: 1 }}
        className="position-fixed top-0 w-100 bg-white shadow border-0">
        <Container>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Navbar.Brand className="d-flex  align-items-center justify-content-between">
              <div>
                <img style={{ width: '80px' }} src={logo} alt="Logo" />
                <h4 className="ms-2 text-dark">CRAFTSY</h4>
              </div>

            </Navbar.Brand>
          </Link>
          {
            insideDashboard && 
            <div className='ms-auto'>
              <button onClick={logout} className='btn btn-link'>Logout <i className='fa-solid fa-right-from-bracket'></i></button>
            </div>
          }

        </Container>
      </Navbar>

    </>
  )
}

export default Header