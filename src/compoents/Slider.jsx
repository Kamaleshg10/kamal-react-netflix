import React from 'react'
import CardSlider from './CardSlider';
import styled from "styled-components";

const Container = styled.div `
  
`;

const Slider = ({movies}) => {
    const getMoviesFromRange = (from,to) =>{
        return movies.slice(from,to)
    }
  return (
    <Container>
        <CardSlider title="Trending New" data={getMoviesFromRange(0,10)} />
        <CardSlider title="New Releseses" data={getMoviesFromRange(10,20)} />
        <CardSlider title="Blockbuster Movies" data={getMoviesFromRange(20,30)} />
        <CardSlider title="Populor on Netflix" data={getMoviesFromRange(30,40)} />
        <CardSlider title="Romance Movies" data={getMoviesFromRange(40,50)} />
        <CardSlider title="Thiller Movies" data={getMoviesFromRange(50,60)} />
    </Container>
  )
}

export default Slider