import React from 'react';
import Valuta from './Valuta';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/KursnaLista.css';

const KursnaLista = ({date}) => {
  
  const [valute, setValute] = useState();
  
  useEffect( () => {
    const dateElements = date.split("-");

      if(date == "today") {
        axios.get("http://127.0.0.1:8000/api/kursna-lista").then( (res) => {
          setValute(res.data.rates);
        });
      } else {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `http://127.0.0.1:8000/api/korisnik/kursna-lista/${dateElements[0]}-${dateElements[1]}-${dateElements[2]}`,
          headers: { 
            'Authorization': 'Bearer '+window.sessionStorage.getItem('user_auth_token'), 
          },
        };
        
        axios.request(config)
        .then((res) => {
          setValute(res.data.rates);
        })
        .catch((error) => {
          console.log(error);
        });
      } 
    
  },[date]);

  return (
    
    
      <div className="body">
    <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Aktuelna kursna lista</th>
      <th scope="col">Valuta</th>
      <th scope="col">Kupovni kurs</th>
      <th scope="col">Srednji kurs</th>
      <th scope="col">Prodajni kurs</th>
    </tr>
  </thead>
  <tbody>
    {valute==null ? (<></>) : (valute.map((v)=>{
      if(v.code==='RUB' || v.code==='EUR' || v.code==='USD' || v.code==='CHF' || v.code==='GBP' || v.code==='AUD' || v.code==='CAD' || v.code==='JPY' || v.code==='SEK' || v.code==='NOK' || v.code==='DKK' || v.code==='HUF' || v.code==='TRY' || v.code==='RON'){
        return <Valuta val={v} key={v.code}/>
      }
    }))}
  </tbody>
</table>
</div>

  )
}

export default KursnaLista
