import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleAuth() {
    await login();
    return navigate("/");
  }

  // return (
  //   <div className="logout text-center bg-dark text-white" onClick={() => handleAuth()}>
  //     Login with Github
  //   </div>
  // )
  

  return (
    <div className="login">
      <article className='mt-5 mb-5 p-5 text-dark'>
        <h1 className='text-center'>Welcome!</h1>
      </article>

      <Container>
        <Card className='m-2 border-dark text-center col-md-6 m-auto'>
          <Card.Header className='bg-dark text-white'>
            <h2>Login for full functionality</h2>
          </Card.Header>
          <Card.Body>
            <button className='btn btn-danger' onClick={() => handleAuth()}>
              Login w/Github
            </button>
          </Card.Body>
        </Card>
      </Container>
    </div>

  )


  
}
