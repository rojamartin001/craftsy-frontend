import React, { useContext, useEffect, useState } from 'react'
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import { tokenAuthContext } from '../contexts/AuthContextAPI'


const Auth = ({ insideRegister }) => {
   const {isAuthorised, setIsAuthorised} = useContext(tokenAuthContext)
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()
  const [inputData, setInputData] = useState({
    username: "", email: "", password: ""
  })
  const [inputErrors, setInputErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  // Handle Register Form Submit
  const handleRegister = (e) => {
    e.preventDefault()
    setInputErrors(validate(inputData))
    setIsSubmit(true)
  }

  // Handle Login Form Submit
  const handleLogin = (e) => {
    e.preventDefault()
    setInputErrors(validate(inputData))
    setIsSubmit(true)
  }

  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|co|us|in)$/i

    if (insideRegister && !values.username) {
      errors.username = "Username is required!"
    }

    if (!values.email) {
      errors.email = "Email is required!"
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email Format!"
    }

    if (!values.password) {
      errors.password = "Password is required!"
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!"
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters!"
    }

    return errors
  }

  useEffect(() => {
    if (Object.keys(inputErrors).length === 0 && isSubmit) {
      if (insideRegister) {
        const registerUser = async () => {
          try {
            const result = await registerAPI(inputData);
            if (result.status === 200) {
              alert(`Welcome ${result.data.username}, Please login to explore our website`);
              navigate('/login');
              setInputData({ username: "", email: "", password: "" });
            } else {
              if (result.response?.status === 406) {
                alert(result.response.data);
                setInputData({ username: "", email: "", password: "" });
              }
            }
          } catch (err) {
            console.log("Registration failed:", err);
            alert("Registration failed. Please try again.");
          }
        };
        registerUser();
      } else {
        const loginUser = async () => {
          try {
            const result = await loginAPI(inputData)
            if (result.status === 200) {
              sessionStorage.setItem("user", JSON.stringify(result.data.user))
              sessionStorage.setItem("token", result.data.token)
              setIsAuthorised(true)
              setIsLogin(true)
              setTimeout(() => {
                setInputData({ username: "", email: "", password: "" })
                navigate('/')
                setIsLogin(false)
              }, 2000)
            } else {
              if (result.response?.status === 404) {
                alert("User not found. Please register.")
              } else if (result.response?.status === 401) {
                alert("Incorrect password. Please try again.")
              } else {
                alert("Login failed. Please try again.")
              }
            }
          } catch (err) {
            if (err.response?.status === 404) {
              alert("User not found. Please register.")
            } else if (err.response?.status === 401) {
              alert("Incorrect password. Please try again.")
            } else {
              alert("Login failed. Please try again.")
            }
            console.log(`error : ${err}`);
          }
        };
        loginUser();
      }

      setIsSubmit(false)
    }
  }, [inputErrors, isSubmit, insideRegister, inputData, navigate])

  return (
    <div style={{ minHeight: '100vh', width: '100%' }} className='d-flex align-items-center justify-content-center'>
      <div className='container w-75'>
        <div className='card shadow p-2 '>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img className='img-fluid' src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
            </div>
            <div className='col-lg-6'>
              <h1 className='mt-2'>Craftsy</h1>
              <h5 className='mt-2'>Sign {insideRegister ? 'up' : 'in'} to your account</h5>
              <Form onSubmit={insideRegister ? handleRegister : handleLogin} noValidate>

                {
                  insideRegister &&
                  <>
                    <FloatingLabel controlId="floatingInputName" label="Username" className="mb-3 text-dark">
                      <Form.Control value={inputData.username} onChange={e => setInputData({ ...inputData, username: e.target.value })} type="text" placeholder="Username" />
                    </FloatingLabel>
                    {inputErrors.username && <p className="text-danger">{inputErrors.username}</p>}
                  </>
                }

                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 text-dark">
                  <Form.Control value={inputData.email} onChange={e => setInputData({ ...inputData, email: e.target.value })} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                {inputErrors.email && <p className="text-danger">{inputErrors.email}</p>}

                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 text-dark">
                  <Form.Control value={inputData.password} onChange={e => setInputData({ ...inputData, password: e.target.value })} type="password" placeholder="Password" />
                </FloatingLabel>
                {inputErrors.password && <p className="text-danger">{inputErrors.password}</p>}

                {
                  insideRegister ?
                    <div>
                      <button type="submit" className='btn btn-primary mb-2'>Register</button>
                      <p>Already a User? Please click here to <Link to={'/login'}>Login</Link></p>
                    </div>
                    :
                    <div>
                      <button type='submit' className='btn btn-primary d-flex mb-2 '>Login{isLogin && <Spinner className='ms-2' animation="border" variant="light" />}</button>
                      <p>New User? Please click here to <Link to={'/register'}>Register</Link></p>
                    </div>
                }
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
