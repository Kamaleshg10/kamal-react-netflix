import React, { useState } from 'react';
import styled from "styled-components";
import BackgroundImage from '../compoents/BackgroundImage';
import Header from '../compoents/Header';
import { onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';

const Container = styled.div `
  position:relative;
  .content{
    position:absolute;
    top:0;
    left:0;
    background-color:rgba(0,0,0,0.5);
    height:100vh;
    width:100vw;
    grid-template-rows:15vh 85vh;
    .form-container{
      gap:2rem;
      height:85vh;
      .form{
        padding:2rem;
        background-color:#000000b0;
        width:25vw;
        gap:2rem;
        color:#fff;
        .container{
          gap:2rem;        
          input {
            width:15rem;
            padding:0.5rem 1rem;
          }                
          button{
            padding:0.5rem 1rem;
            background-color:#e50914;
            border:none;
            cursor:pointer;
            color:white;
            border-radius:0.2rem;
            font-size:1.05rem;
            font-weight:border;
          } 
        }        
      }   
    }     
  }
`;

const Login = () => {
  // const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email:"",
    password:"",
  });
  const navigate = useNavigate();

  const handleLogIn = async () => {
    // console.log(formValues)
    try{
      const {email, password} = formValues;
      await signInWithEmailAndPassword(firebaseAuth,email,password)
    } catch (err){
      console.log(err);
    }
  }
  onAuthStateChanged(firebaseAuth,(currentUser) => {
    if (currentUser) navigate("/");
  })
  return (
    <Container >
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input type="email" placeholder='Enter Address' name='email' value={formValues.email} onChange={(e)=>setFormValues({...formValues,[e.target.name]: e.target.value,})} />          
              <input type="password" placeholder='Passwors' name='password' value={formValues.password} onChange={(e)=>setFormValues({...formValues,[e.target.name]: e.target.value,})} /> 
              <button onClick={handleLogIn}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Login