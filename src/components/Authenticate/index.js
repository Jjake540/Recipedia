import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';

const Authenticate = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h3> Login </h3>
      <input
        type='email'
        placeholder='Email...'
        onChange={(event) => {
          setLoginEmail(event.target.value);
        }}
      />
      <input
        type='password'
        placeholder='Password...'
        onChange={(event) => {
          setLoginPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login</button>
    </div>
  );
};

export default Authenticate;
