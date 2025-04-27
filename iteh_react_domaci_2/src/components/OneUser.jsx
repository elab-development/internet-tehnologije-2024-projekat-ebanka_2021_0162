import React from 'react';
import '../css/OneUser.css';


const OneUser = ({details, closeDetails}) => {
  return (
    <div className='oneUser-container'> 
      <h3 className='naslov'>Detalji izabranog korisnika</h3>
      <br/>
      <p className="paragraf"><span className="span1">ID: </span><spna className="span2">{details.id}</spna></p>
      <p className="paragraf"><span className="span1">Ime: </span><span className="span2">{details.ime}</span></p>
      <p className="paragraf"><span className="span1">Prezime: </span><span className="span2">{details.prezime}</span></p>
      <p className="paragraf"><span className="span1">Email: </span><span className="span2">{details.email}</span></p>
      <p className="paragraf"><span className="span1">Datum rodjenja: </span><span className="span2">{details.datum_rođenja}</span></p>
      <p className="paragraf"><span className="span1">Maticni broj: </span><span className="span2">{details.maticni_broj}</span></p>
      <p className="paragraf"><span className="span1">Broj licne karte: </span><span className="span2">{details.broj_licne_karte}</span></p>
      <p className="paragraf"><span className="span1">Adresa: </span><span className="span2">{details.adresa}</span></p>
      <p className="paragraf"><span className="span1">Grad: </span><span className="span2">{details.grad}</span></p>
      <p className="paragraf"><span className="span1">Drzava: </span><span className="span2">{details.drzava}</span></p>
      <p className="paragraf"><span className="span1">Broj telefona: </span><span className="span2">{details.broj_telefona}</span></p>
      <br/>
      <div className='second-user-container'>
      <button className='closed-btn'  onClick={closeDetails}>Zatvori</button>
      <button className='closed-btn'>Izmeni</button>
      <button className='closed-btn'>Obrisi</button>
      </div>
    </div>
  )
}

export default OneUser
