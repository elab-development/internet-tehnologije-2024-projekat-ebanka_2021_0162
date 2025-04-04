import React from 'react'
import '../css/ExportEmptyPopUp.css';

const ExportEmpty = ({closeMessageBox}) => {
  return (
    <div className="message-box">
      <div>
        <h2>Za izabrani mesec <span className="empty-export-span">nema</span> transakcija za dati nalog.</h2>
      </div>
      
      <div>
        <button className="close-message-box" onClick={()=>closeMessageBox()}>Zatvori</button>
      </div>
    </div>
  )
}

export default ExportEmpty
