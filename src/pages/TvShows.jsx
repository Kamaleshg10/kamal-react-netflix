import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { fetchMovies, getGenres } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../compoents/Navbar';
import Slider from '../compoents/Slider';
import { NotAvailable } from '../compoents/NotAvailable';
import { SelectGenre } from '../compoents/SelectGenre';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from '@firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';

export const TvShows = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const genresLoaded = useSelector((state)=> state.netflix.genresLoaded);
    const dataLoading = useSelector((state) => state.netflix.dataLoading);
    const movies = useSelector((state)=> state.netflix.movies);
    const genres = useSelector((state)=> state.netflix.movies);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(()=>{
        // console.log("in use effect");
        if(!genres.length) dispatch(getGenres())
    },[]);
    useEffect(()=>{
      if(genresLoaded) {
        dispatch(fetchMovies({genres, type:"tv"}));
      }
    },[genresLoaded]);

    const [user, setUser] = useState(undefined);
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) setUser(currentUser.uid);
      else navigate("/login");
    });

    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true)
      return () =>(window.onscroll = null);
    }
  return (
    <Container>
            <Navbar isScrolled={{isScrolled}} />
        <div className="data">
            <SelectGenre genres={genres} type="tv" />
            {movies.length ? (
            <>
               <Slider movies={movies} />
            </>
           ) : (<h1 className="not-available">
                    No TV Shows avaialble for the selected genre. Please select a
                    different genre.
                </h1> 
              )}
        </div>
    </Container>
  )
}
const Container = styled.div `
.data{
    margin-top:8rem;
    .not-available{
      text-align:center;
      margin-top:4rem;
    }
  }
`;
