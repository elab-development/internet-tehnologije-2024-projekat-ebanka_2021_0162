import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Racuni from './Racuni';
import axios from 'axios';
import "../css/HomePageData.css";
import { PiVaultBold } from "react-icons/pi";
import TransactionDetails from './TransactionDetails';

const UserHome = () => {
    const navigate = useNavigate();

    const [focusedAcc, setFocusedAcc] = useState(null);
    let [transactions, setTransactions] = useState([]);

    const [tabFocused, setTabFocused]=useState({
      tab1: false,
      tab2: true,
      tab3: false
    });

    const [selectedTransaction, setSelectedTransaction] = useState(null);  
    const [showDetails, setShowDetails] = useState(false);

    function handleTabFocus(tab){
      switch(tab){
        case 'tab1':
          setTabFocused({tab1:true,tab2:false,tab3:false});
          getAccountDetails(focusedAcc);
          break;
        case 'tab2':
          setTabFocused({tab1:false,tab2:true,tab3:false});
          break;
        case 'tab3':
          setTabFocused({tab1:false,tab2:false,tab3:true});
          break;
      }
    }

    const handleAccountFocus = (acc) => {
      setFocusedAcc(acc);

      if(showDetails) {
        setShowDetails(false);
        setSelectedTransaction(null);
        document.querySelector("body").classList.remove("lock-background");
      }

      getAccountDetails(acc);
      prepareTransactions(acc);
    }

    function prepareTransactions(acc) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:8000/api/korisnik/izvrsene-transakcije/${acc.id}`,
        headers: { 
          'Authorization': 'Bearer ' + window.sessionStorage.getItem("user_auth_token")
        }
      };
      
      axios.request(config)
      .then((response) => {
        setTransactions(response.data.transakcije);
      })
      .catch((error) => {
        console.log(error);
      });

    }
    
    const [detailsAccount,setDetailsAccount]=useState();

    function getAccountDetails(account){

      let config;
      
      switch(account.tip){
        case "tekuci":
          config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/korisnik/tekuci_racun/${account.detalji.id}`,
            headers: { 
              'Authorization': 'Bearer '+window.sessionStorage.getItem('user_auth_token'), 
            },
          };

          axios.request(config)
          .then((response) => {
            
            setDetailsAccount(response.data.tekuci_racun);
          })
          .catch((error) => {
            console.log(error);
          });
          break;

        case "stedni":
          config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/korisnik/stedni_racun/${account.detalji.id}`,
            headers: { 
              'Authorization': 'Bearer '+window.sessionStorage.getItem('user_auth_token'), 
            },
          };

          axios.request(config)
          .then((response) => {
          
            setDetailsAccount(response.data.stedni_racun);
          })
          .catch((error) => {
            console.log(error);
          });
          break;

        case "studentski":
          config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/korisnik/studentski_racun/${account.detalji.id}`,
            headers: { 
              'Authorization': 'Bearer '+window.sessionStorage.getItem('user_auth_token'), 
            },
          };

          axios.request(config)
          .then((response) => {
      
            setDetailsAccount(response.data.studentski_racun);
          })
          .catch((error) => {
            console.log(error);
          });
          break;

        case "devizni":
          config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/korisnik/devizni_racun/${account.detalji.id}`,
            headers: { 
              'Authorization': 'Bearer '+window.sessionStorage.getItem('user_auth_token'), 
            },
          };

          axios.request(config)
          .then((response) => {
        
            setDetailsAccount(response.data.devizni_racun);
          })
          .catch((error) => {
            console.log(error);
          });
          break;
      }

    }


    useEffect( () => {
        const handleEscKeyPress = (event) => {
          if(event.key == "Escape") {
              setSelectedTransaction(null);
              setShowDetails(false);
              document.querySelector("body").classList.remove("lock-background");
          }
        }

        window.addEventListener("keydown", handleEscKeyPress);

        let user = window.sessionStorage.getItem("user_auth_token");
        let admin = window.sessionStorage.getItem("admin_auth_token");

        if(admin != null)
          navigate("/admin/home");

        if(user == null)
            navigate("/user/login");

        return () => {
          window.addEventListener("keydown", handleEscKeyPress);
        }

    }, []);

    const showTransactionDetails = async(trans_id) => {
      document.querySelector("body").classList.add("lock-background");
      
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:8000/api/korisnik/transakcija/${trans_id}`,
        headers: { 
          'Authorization': 'Bearer ' + window.sessionStorage.getItem("user_auth_token")
        }
      };
      
      axios.request(config)
      .then( (res) => {
        console.log(res.data.transakcija);  
        setSelectedTransaction(res.data.transakcija);
        setShowDetails(true);
      })
      .catch((e)=> {
        console.log("Greska pri ucitavanju detalja o transakciji: " + e);
      })
    }
    
    const closeDetails = () => {
      setShowDetails(false);
      setSelectedTransaction(null);
      document.querySelector("body").classList.remove("lock-background");
    }

  return (
      <>
        <Racuni onAccountFocus={handleAccountFocus} />

        <div className="main-container">
          <div className="tabs-container">
            <div onClick={()=>{handleTabFocus('tab1')}} className={`${tabFocused.tab1 ? "focused-tab" : ""} bank-account tab`}>Detalji Računa</div>
            <div onClick={()=>{handleTabFocus('tab2')}} className={`${tabFocused.tab2 ? "focused-tab" : ""} transactions tab`}>Transakcije</div>
            <div onClick={()=>{handleTabFocus('tab3')}} className={`${tabFocused.tab3 ? "focused-tab" : ""} transactions-export tab`}>Izvodi Transakcija</div>
          </div>

          <div className="data-container"> 

            {tabFocused.tab2 && (<><div className="list-of-transactions-container">
              <div className="lista-trans-icon-headline">
                <div><PiVaultBold style={{fontSize:'1.8em', marginBottom:'3px', color:'darkBlue'}} /></div>
                <div><h2>Lista Transakcija Za {focusedAcc == null ? <></> : focusedAcc.tip} Račun:</h2></div>
              </div>
              <div className="lista-trans-br-racuna">{focusedAcc == null ? <>/</>:focusedAcc.detalji.broj_racuna}</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th className="transactions-tbl-heading">ID Transakcije</th>
                  <th className="transactions-tbl-heading">Datum</th>
                  <th className="transactions-tbl-heading">Vreme</th>
                  <th className="transactions-tbl-heading">Iznos</th>
                  <th className="transactions-tbl-heading">Opis Transakcije</th>
                  <th className="transactions-tbl-heading">Broj Računa Primaoca</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? <tr style={{borderBottom : 'none'}}><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>: <></>}
            {transactions == null ? <></> : transactions.map( (transakcija) => {
             return (
                <tr className="data-row" key={transakcija.id}>
                  <td>{transakcija.id}</td>
                  <td>{transakcija.datum}</td>
                  <td>{transakcija.vreme}</td>
                  <td>{transakcija.iznos} <span>{focusedAcc.detalji.valuta == null ? "RSD" : focusedAcc.detalji.valuta}</span></td>
                  <td>{transakcija.opis_transakcije}</td>
                  <td>{transakcija.broj_racuna_primaoca}</td>
                </tr>
             );
            })}
            </tbody>
          </table>
          </>
            )}

            {tabFocused.tab1 && (<>
              <div className="list-of-transactions-container">
              <div className="lista-trans-icon-headline">
                <div></div>
                <div><h2>Detalji za {focusedAcc == null ? <></> : focusedAcc.tip} Račun</h2></div>
              </div>
            </div>
              {console.log(detailsAccount)}
            <div className="invoice-details">
            <div className="invoice-row">
              <span className="label">Broj računa:</span>
              <span className="value">{detailsAccount==null ? <></> : detailsAccount.broj_racuna}</span>
            </div>
            <div className="invoice-row">
              <span className="label">Stanje računa:</span>
              <span className="value">{detailsAccount==null ? <></> : detailsAccount.stanje_racuna} {detailsAccount==null ? <></> : (detailsAccount.hasOwnProperty("valuta") ? detailsAccount.valuta : "RSD") }</span>
            </div>
            <div className="invoice-row">
              <span className="label">Održavanje:</span>
              <span className="value">{detailsAccount==null ? <></> : (detailsAccount.hasOwnProperty("valuta") ? (detailsAccount.odrzavanje + " " + detailsAccount.valuta) : ( detailsAccount.odrzavanje+" RSD"))} </span>
            </div>
            <div className="invoice-row">
              <span className="label">Dozvoljeni minus:</span>
              <span className="value">{detailsAccount==null ? <></> : (detailsAccount.racun.tip === 'tekuci' ? detailsAccount.dozvoljeni_minus + " RSD" : "/")}</span>
            </div>
            <div className="invoice-row">
              <span className="label">Kamata:</span>
              <span className="value">{detailsAccount==null ? <></> : (detailsAccount.kamata != null ? detailsAccount.kamata + "%" : "/")}</span>
            </div>
            <div className="invoice-row">
              <span className="label">Valuta:</span>
              <span className="value">{detailsAccount==null ? <></> : (detailsAccount.hasOwnProperty("valuta") ? detailsAccount.valuta : "/")}</span>
            </div>
            <div className="invoice-row">
              <span className="label">Tip štednje:</span>
              <span className="value">{detailsAccount==null ? <></> : (detailsAccount.hasOwnProperty("tip_stednje") ? detailsAccount.tip_stednje : "/")}</span>
            </div>
            <div className="invoice-row">
              <span className="label">Banka u kojoj je otvoren račun:</span>
              <span className="value">{detailsAccount==null ? <></> : detailsAccount.racun.banka.naziv},{detailsAccount==null ? <></> : detailsAccount.racun.banka.grad}</span>
            </div>
            </div>
            </>)}

        </div>
            
      </div> 
      </>
  )
}

export default UserHome
