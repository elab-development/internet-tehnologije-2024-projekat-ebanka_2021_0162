import React from 'react';
import '../css/KursnaLista.css';

const OneRacun = ({racun}) => {
  return (
    <div className="row row-cols-1 row-cols-sm-2 g-3">
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{racun.detalji.broj_racuna}</h4>
          <p className="card-text">{racun.tip}</p>
          <p className="card-text">{racun.user.ime} {racun.user.prezime}</p>
          <h5 className="card-text">{racun.detalji.stanje_racuna}</h5>
          <p className="card-text">{racun.banka.naziv}</p>
        </div>
      </div>
    </div>
  </div>

  )
}

export default OneRacun
