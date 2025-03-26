import React from 'react'
import { useState, useEffect } from 'react';
import OneRacun from './OneRacun';
import axios from 'axios';


const Racuni = () => {
    const [racuni,setRacuni]=useState();
    useEffect(()=>{
        if(racuni==null){

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
                setRacuni(response.data.racuni)
              })
              .catch((error) => {
                console.log(error);
              });

        }
    
    },[])
    
  return (
    <div>
      {racuni==null ? (<></>) : (racuni.map((racun)=>{
        return <OneRacun racun={racun}/>
      }))}
    </div>
  )
}

export default Racuni
