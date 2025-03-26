import React from 'react'

const Valuta = ({val}) => {
 
  return (
    <tr>
        <th scope="row" ></th>
        <td>
        <p>{val.parity} {val.code}</p>
        </td>
        <td>{val.exchange_buy}</td>
        <td>{val.exchange_middle}</td>
        <td>{val.exchange_sell}</td>
    </tr>
  )
}

export default Valuta
