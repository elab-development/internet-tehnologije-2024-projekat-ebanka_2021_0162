import React from 'react'
import { useState, useEffect } from 'react';
import OneRacun from './OneRacun';
import axios from 'axios';
import '../css/AccountsCarousel.css';

const Racuni = ({onAccountFocus}) => {
    const [racuni,setRacuni]=useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isHovered, setIsHovered] = useState(false);
    const [zeroAccountsHook, setZeroAccountsHook] = useState(false);

    const handleAccountFocus = (acc) => {
      if(onAccountFocus) 
        onAccountFocus(acc);
    }

    useEffect(()=>{
        const fetchRacuni = async () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/korisnik/bankovni-racuni',
                headers: { 
                  'Authorization': 'Bearer '+window.sessionStorage.getItem("user_auth_token")
                }
            
              };
              
              axios.request(config)
              .then((response) => {
                setRacuni(response.data.racuni);
                response.data.racuni.length === 0 ? setZeroAccountsHook(true) :
                handleAccountFocus(response.data.racuni[0]);
              })
              .catch((error) => {
                console.log(error);
              });

        }
        fetchRacuni();
    },[])

    /*
    {racuni==null ? (<><h1>Nema racuna za prikaz.</h1></>) : (racuni.map((racun)=>{
        return <OneRacun racun={racun}/>
      }))}
    */

      const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % racuni.length);
        handleAccountFocus(racuni[(currentIndex+1) %racuni.length]);
      };

      let carouselItems = [];

      racuni == null ? <></> : racuni.map( racun => {
        carouselItems.push(<OneRacun racun={racun} key={racun.id} /> );
     })

  return (
    <div className="carousel-container">
      {!zeroAccountsHook && ( <><div className={`carousel-item-active two-col-container-layout ${isHovered ? "arrow_hovered_active" : "arrow_unhovered"}`}>{carouselItems[currentIndex]}</div>
      <div className="arrow" onMouseEnter={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}} onClick={handleNext}>&#8594;</div>
      <div className={`carousel-item-next two-col-container-layout ${isHovered ? "arrow_hovered_next" : "arrow_unhovered"}`} onClick={handleNext}>{carouselItems[(currentIndex+1)%racuni.length ]}</div>
      </>)}
      {zeroAccountsHook && (<> {document.querySelector(".carousel-container").classList.add("no-bank-accounts-background")}
        <h1>Nema računa za prikaz.</h1>
      </>)}
    </div>
  )
}

export default Racuni
