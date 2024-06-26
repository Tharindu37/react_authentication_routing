// import React from 'react'

// function UpdateProfile() {
//   return (
//     <div>UpdateProfile</div>
//   )
// }

// export default UpdateProfile

import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { updateEmail } from 'firebase/auth'


function UpdateProfile() {
    const emailRef=useRef<HTMLInputElement>(null)
    const passwordRef=useRef<HTMLInputElement>(null)
    const passwordConfirmRef=useRef<HTMLInputElement>(null)
    const { currentUser,emailUpdate,passwordUpdate } = useAuth();
    const [error, setError]=useState('');
    const [loading, setLoading]=useState(false);
    const navigate=useNavigate()


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        

        if (emailRef.current && passwordRef.current && passwordConfirmRef.current) {
            if(passwordRef.current.value !== passwordConfirmRef.current.value){
                return setError('Passwords do not match')
            }

            const promises=[];
            setLoading(true);
            setError("")

            if(emailRef.current.value!=currentUser.email){
              promises.push(emailUpdate(emailRef.current.value))
            }
            if(passwordRef.current.value){
              promises.push(passwordUpdate(passwordRef.current.value));
            }

            Promise.all(promises).then(()=>{
              navigate('/')
            }).catch(()=>{
              setError("Failed to update account")
            }).finally(()=>{
              setLoading(false)
            })
        }

    }
    

  return (
    <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Update Profile</h2>
            {currentUser && currentUser.email}
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required placeholder='Leave blank to keep the same'/>
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirm</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required placeholder='Leave blank to keep the same'/>
                </Form.Group>
                <Button disabled={loading} className='w-100' type='submit'>Update</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
       <Link to='/'>Cancel</Link>
    </div>
    </>
  )
}

export default UpdateProfile