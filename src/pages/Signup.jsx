import React, { useState } from 'react';
import styled from "styled-components";
import BackgroundImage from '../compoents/BackgroundImage';
import Header from '../compoents/Header';
import { createUserWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email:"",
    password:"",
  });
  const navigate = useNavigate();

  const handleSignIn = async () => {
    // console.log(formValues)
    try{
      const {email, password} = formValues;
      await createUserWithEmailAndPassword(firebaseAuth,email,password)
    } catch (err){
      console.log(err);
    }
  }
  onAuthStateChanged(firebaseAuth,(currentUser) => {
    if (currentUser) navigate("/");
  })
  return (
    <Container showPassword={showPassword}>
      <BackgroundImage/>
      <div className="content">
      <Header login />
      <div className="body flex column a-center j-center">
        <div className="text flex column">
          <h1>Unlimited movies, TV shows and more</h1>
          <h4>Wathch anyware, cancel anytime</h4>
          <h6>Ready to watch? Enter your Email to create or restart membership </h6>
        </div>
        <div className="form">
          <input type="email" placeholder='Email Address' name='email' value={formValues.email} onChange={(e)=>setFormValues({...formValues,[e.target.name]: e.target.value,})} />
          {showPassword && (
          <input type="password" placeholder='Password' name='password' value={formValues.password} onChange={(e)=>setFormValues({...formValues,[e.target.name]: e.target.value,})} />
           )}
          {!showPassword && (
          <button onClick={()=>setShowPassword(true)}>Get Started</button>
          )}
        </div>        
        {showPassword &&<button onClick={handleSignIn}>Log In</button>}
      </div>
      </div>
    </Container>
  )
}
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
    .body{
      gap:1rem;
      .text{
        gap:1rem;
        text-align:center;
        font-size:2rem;
        h1{
          padding;0 25rem;          
        }
    }
    .form{
      display:grid;
      grid-template-columns:${({showPassword})=>showPassword ? "1fr 1fr " : "2fr 1fr"};
      width:60%;
      input {
        color:#000;
        border:none;
        padding:1.5rem;
        font-size:1.2rem;
        border:1px solid #000;
        &:focus{
          outline:none;
        }
      }          
      button{
        padding:0.5rem 1rem;
        background-color:#e50914;
        border:none;
        cursor:pointer;
        color:white;
        // border-radius:0.2rem;
        font-size:1.05rem;
        font-weight:bolder;
      }          
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
`;
export default Signup