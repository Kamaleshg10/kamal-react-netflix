import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { fetchMovies, getGenres } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../compoents/Navbar';
import Slider from '../compoents/Slider';
import { NotAvailable } from '../compoents/NotAvailable';
import { SelectGenre } from '../compoents/SelectGenre';

export const Movies = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const genresLoaded = useSelector((state)=> state.netflix.genresLoaded);
    const movies = useSelector((state)=> state.netflix.movies);
    const genres = useSelector((state)=> state.netflix.movies);
    const dispatch = useDispatch();
  
    useEffect(()=>{
        console.log("in use effect");
      dispatch(getGenres())
    },[]);
    useEffect(()=>{
      if(genresLoaded) dispatch(fetchMovies({type:"movies"}))
    },[genresLoaded]);
  
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true)
      return () =>(window.onscroll = null);
    }
  return (
    <Container>
        <div className="navbar">
            <Navbar isScrolled={{isScrolled}} />
        </div>
        <div className="data">
            <SelectGenre genres={genres} type="movie" />
            {movies.length ? <Slider movies={movies} /> : <NotAvailable /> }
        </div>
    </Container>
  )
}
const Container = styled.div `
.data{
    margin-top:8rem;
    .not-available{
        text-align:center;
        color:#fff;
        margin-top:4rem;
    }
}
`;
