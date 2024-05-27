import React from 'react'
import { Container } from 'react-bootstrap'

export default function Cancel() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{minHeight:"80vh"}}>
        <h1 className='text-danger'>Payment Cancelled</h1>
        <p className="lead">Your payment has been cancelled. You can try again.</p>
    </Container>
  )
}
