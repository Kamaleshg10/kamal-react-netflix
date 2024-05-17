import React, { useEffect, useState } from 'react'
import Navbar from '../compoents/Navbar';
import bgImage from '../assets/home.jpg';
import Movielogo from '../assets/homeTitle.webp';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '../compoents/Slider';

const Container = styled.div `
  background-color:#000;
  .hero{
    position:relative;
    .background-image{
      filter:brightness(60%);
    }
    img{
      height:100vh;
      width:100vw;
    }
    .container{
      position:absolute;
      bottom:5rem;
      .logo{
        img{
          width:100%;
          height:100%;
          margin-left:5rem;
          margin-bottom:-3rem; //kamal-style
        }
      }
      .buttons{
        margin:5rem;
        gap:2rem;
        button{
          font-size:1.4rem;
          gap:1rem;
          padding:0.5rem;
          padding-left:2rem;
          padding-right:2.4rem;
          border-radius:0.4rem;
          border:none;
          cursor:pointer;
          transition:0.3s ease-in-out;
          &:hover{
            opacity:0.8;
          }
          &:nth-of-type(2) {
            background-color:rgba(109,109,110,0.7);
            color:#fff;
            svg{
              font-size:1.2rem;
            }
          }
        }
      }
    }
  }
`;
const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const genresLoaded = useSelector((state)=> state.netflix.genresLoaded);
  const movies = useSelector((state)=> state.netflix.movies);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getGenres())
  },[]);
  useEffect(()=>{
    if(genresLoaded) dispatch(fetchMovies({type:"all"}))
  },[genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () =>(window.onscroll = null);
  }
  // console.log(movies)
  return (
    <Container>      
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img src={bgImage} alt="bgimage" className='background-image' />
        <div className="container">
          <div className="logo">
            <img src={Movielogo} alt="movielogo" />
          </div>
          <div className="buttons flex">
            <button className="flex j-center a-center" onClick={()=>navigate("/player")}>
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies}/>
    </Container>
    
  )
}

export default Netflix