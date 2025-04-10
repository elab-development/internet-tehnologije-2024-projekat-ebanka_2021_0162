import React from 'react';
import '../css/NewTransaction.css';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import PopUp from './PopUp';


const NewTransaction = ({focusedAcc}) => {

    const [datum, setDatum] = useState('');
    const [successfulTran, setSuccessfulTran]=useState(false);
    const messageText='Transakcija uspesno izvrsena!';
    const navigate=useNavigate();
    
  useEffect(() => {
    const trenutniDatum = new Date();
    const formattedDate = trenutniDatum.toISOString().split('T')[0];
    setDatum(formattedDate);
    
  }, []);

  const [transactionData, setTransactionData]=useState({
    iznos: '',
    broj_racuna_primaoca: '',
    opis_transakcije: '',
    naziv_primaoca: '',
    sifra_placanja: ''
  });

  const [errors, setErrors]=useState({});

  function handleInput(e){
    let temp=transactionData;
    temp[e.target.name]=e.target.value;
    setTransactionData(temp);
    setErrors({
        ...errors,
        [e.target.name]: ''
    });
  };

  const handleSelectChange = (event) => {
    let pom=transactionData;
    pom.sifra_placanja=event.target.value;
    setTransactionData(pom);
  };


  function handleNewTransaction(e){
        e.preventDefault();

        let error={};

        const noviDatum=new Date();
        const h=noviDatum.getHours();
        const m=noviDatum.getMinutes();
        const s=noviDatum.getSeconds();
        const time=`${h}:${m}:${s}`;

        let data = new FormData();

        if(transactionData.iznos != '') {
            data.append('iznos', transactionData.iznos);
        } else {
            error.iznos='Unesite unos';
        }

        if(transactionData.naziv_primaoca != '') {
            data.append('naziv_primaoca',transactionData.naziv_primaoca);
        }else{
            error.naziv_primaoca='Unesite naziv primaoca';
        }

        if(transactionData.broj_racuna_primaoca != '') {
            data.append('broj_racuna_primaoca', transactionData.broj_racuna_primaoca);
        } else {
            error.broj_racuna_primaoca='Unesite broj_racuna_primaoca';
        }

        if(transactionData.opis_transakcije != '') {
            data.append('opis_transakcije', transactionData.opis_transakcije);
        } else {
            error.opis_transakcije='Unesite opis';
        }

        if(transactionData.sifra_placanja!=''){
            data.append('sifra_placanja',transactionData.sifra_placanja);
        }else{
            error.sifra_placanja='Morate izabrati sifru placanja';
        }

        if (Object.keys(error).length > 0) {
            setErrors(error);
          }

    
        data.append('datum', datum);
        data.append('vreme', time );
        data.append('racun_id', focusedAcc.id);


        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/api/korisnik/nova-transakcija',
        headers: { 
            'Authorization': 'Bearer '+window.sessionStorage.getItem('user_auth_token'),
        },
        data : data
        };

        axios.request(config)
        .then((response) => {
            setSuccessfulTran(true);
        })
        .catch((error) => {
            console.log(error);
        });
        
    }


    const closeMessageBox=()=>{
        setSuccessfulTran(false);
        navigate('/user/home');
    }


  return (
    <div className="form-body">
        <form className="main" onChange={(e)=>handleInput(e)}>
            
            <div className="each-container">
                <label className="label-transaction"> Naziv primaoca:  </label>
                <input type="text" name="naziv_primaoca" placeholder='ime primaoca' className={errors.naziv_primaoca ? 'input-transaction-error' : 'input-transaction'} />
            </div>


        <div className="each-container">
            <label className="label-transaction"> Broj računa primaoca:  </label>
            <input type="text" name="broj_racuna_primaoca" placeholder='broj racuna primaoca' className={errors.broj_racuna_primaoca ? 'input-transaction-error' : 'input-transaction'} required/>
        </div>

        <div className="sub-container">
        <div className="each-container">
            
            <label className="label-transaction"> Datum:  </label>
            <input type="date" name="datum" defaultValue={datum} disabled className="input-transaction"/>
        </div>

        <div className="each-container">
            <label className="label-transaction"> Iznos:  </label>
            <input type="number" step="100" name="iznos" placeholder='iznos' className={errors.iznos ? 'input-transaction-error' : 'input-transaction'} />
        </div>
        </div>
    
        <div className="each-container">
            <label className="label-transaction"> Opis transakcije:  </label>
            <input type="text" name="opis_transakcije" placeholder='svrha placanja' className={errors.opis_transakcije ? 'input-transaction-error' : 'input-transaction'} />
        </div>

        <div className="each-container">
            <label className="label-transaction"> Sifra plaćanja:  
                <select onChange={handleSelectChange} className={errors.sifra_placanja ? 'input-transaction-error' : 'input-transaction'} >
                    <option value=""></option>
                    <option value="289">289-Transakcije po nalogu gradjana</option>
                    <option value="222">222-Usluge javnih preduzeća</option>
                    <option value="254">254-Uplata poreza i doprinosa po odbitku</option>
                    <option value="221">221-Promet robe i usluga-finalna potrosnja</option>
                    <option value="229">229-Digitalna imovina</option>
                    <option value="230">230-Promet nepokretnosti</option>
                    <option value="240">240-Zarade i druga primanja zaposlenih</option>
                    <option value="253">253-Uplata javnih prihoda izuzev poreza i doprinosa po odbitku</option>
                    <option value="281">281-Pozajmice osnivača za likvidnost</option>
                    <option value="287">287-Donacije i sponzorstva</option>
                    <option value="288">288-Donacije</option>
                    <option value="290">290-Druge transakcije</option>
                </select>
            </label>
        </div>

        <div className="each-container">
            <label className="label-transaction">Naziv platioca:  </label>
            <input type="text" name="racun_id_naziv" placeholder='platilac' className="input-transaction" defaultValue={focusedAcc.user.ime + " " + focusedAcc.user.prezime} disabled/>
        </div>

        <div className="sub-container"> 
            <div className="each-container">
                <label className="label-transaction">Adresa platioca:  </label>
                <input type="text" name="racun_id_adresa" placeholder='platilac' className="input-transaction" defaultValue={focusedAcc.user.adresa} disabled/>
            </div>
            <div className="each-container">
                <label className="label-transaction">Grad platioca:  </label>
                <input type="text" name="racun_id_grad" placeholder='platilac' className="input-transaction" defaultValue={focusedAcc.user.grad} disabled/>
            </div>
        </div>
       
        <button type="submit" className="btn-transaction" onClick={(e)=>{handleNewTransaction(e)}}>Izvrši plaćanje</button>
        </form>
        {successfulTran && <PopUp closeMessageBox={closeMessageBox} messageText={messageText}/>}
    </div>
  )
}

export default NewTransaction
