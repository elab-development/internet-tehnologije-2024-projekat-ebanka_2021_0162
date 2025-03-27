import React from 'react'
import { useState, useEffect } from 'react';
import OneRacun from './OneRacun';
import axios from 'axios';
import '../css/AccountsCarousel.css';

const Racuni = () => {
    const [racuni,setRacuni]=useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

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
                console.log(JSON.stringify(response.data));
                setRacuni(response.data.racuni);
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
      };

      let carouselItems = [];

      racuni == null ? <></> : racuni.map( racun => {
        carouselItems.push(<OneRacun racun={racun} key={racun.id} /> );
     })

  return (
   
    <div className="carousel-container">
      <div className="carousel-item-active two-col-container-layout">{carouselItems[currentIndex]}</div>
      <div className="arrow" onClick={handleNext}>&#8594;</div>
      <div className="carousel-item-next two-col-container-layout">{carouselItems[(currentIndex+1)%racuni.length ]}</div>
    </div>
  )
}

export default Racuni
