import React, { useState } from 'react';
import styled from "styled-components";
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom';
import { FaPowerOff, FaSearch } from 'react-icons/fa';
import { firebaseAuth } from '../utils/firebase-config';
import { signOut } from '@firebase/auth';
import { onAuthStateChanged } from '@firebase/auth';
// import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';

const Container = styled.div `
    .scrolled{
        background-color:#000;
    }
    nav{
        position:sticky;
        top:0;
        height:6.5rem;
        width:100%;
        justify-content:space-between;
        position:fixed;
        z-index:2;
        padding:0 4rem;
        align-items:center;
        transition :0.3s ease-in-out;
        .left{
            gap:2rem;
            justify-content:space-between;
            .brand{
                img{
                    height:4rem;
                }
            }
        }
        .links{
            list-style-type:none;
            gap:2rem;
            li{
                a{
                    color:#fff;
                    text-decoration:none;
                }
            }
        }
    }
    .right{
        gap:1rem;
        button{
            padding:0.5rem 1rem;
            background-color:transparent;
            border:none;
            cursor:pointer;
            &:focus{
                outline:none;
            }
            svg{
                color:#342424
                font-size:1.2rem
            }        
        }
        .search{
            display:flex;
            gap:0.4rem;
            align-items:center;
            justify-content:center;
            padding-left:0.5rem;
            padding:0.2rem;
            button{
                background-color:transparent;
                svg{
                    color:#fff;
                }
            }
            input{
                width:0;
                opacity:0;
                visibility:hidden;
                transition:0.3s ease-in-out;
                background-color:transparent;
                border:none;
                color:#fff;
                &:focus{
                    outline:none;
                }
            }
        }
        .show-search{
            border:1px solid  #fff;
            background-color:rgba(0,0,0,0.6);
            input{
                width:100%;
                opacity:1;
                visibility:visible;
                padding:0.3rem;
            }
        }
    }
`;


const Navbar = ({isScrolled}) => {
    const links = [
        {name:"Home",link:"/"},
        {name:"TV Shows",link:"/tv"},
        {name:"Movies",link:"/movies"},
        {name:"My List",link:"/mylist"},
    ];
    const navigate = useNavigate();
    onAuthStateChanged(firebaseAuth,(currentUser) => {
        if (!currentUser) navigate("/login");
      })

    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
  return (
    <Container>
        <nav className={`flex ${isScrolled ? "scrollred" : ""}`}>
            <div className="left flex a-center">
                <div className="brand flex a-center j-center">
                    <img src={logo} alt="logo" />
                </div>
                <ul className="links flex">
                    {links.map(({name,link})=> {
                        return (
                            <li key={name}><Link to={link}>{name}</Link></li>
                        )
                    })}
                </ul>
            </div>
            <div className="right flex a-center">
                <div className={`search ${showSearch ? "show-search" : ""}`}>
                    <button onFocus={()=>setShowSearch(true)} onBlur={
                        ()=>{
                            if(!inputHover) setShowSearch(false)
                        }
                    }>
                        <FaSearch />
                    </button>
                    <input type="text" placeholder='Search'
                        onMouseEnter={()=>setInputHover(true)}
                        onMouseLeave={()=>setInputHover(false)}
                        onBlur={()=>{
                        setShowSearch(false)
                        setInputHover(false)
                        }}
                    />
                </div>
                    <button onClick={()=>signOut(firebaseAuth)} >
                    <FaPowerOff style={{color:"red"}} />
                    </button>
            </div>
        </nav>
    </Container>
  )
}

export default Navbar