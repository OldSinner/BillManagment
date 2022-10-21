import axios from 'axios'
import { useEffect, useState } from 'react'
import { Apischema } from '../Apischema/Apischema'
import AuthHeader from '../Auth/AuthHeader'
import './Invoicecont.css'
export default function Sidebar() {
  var [invoices, setInvoices] = useState([])
  useEffect(() => {
    var token = AuthHeader()
    console.log(token)
    axios.get(Apischema.bills, { headers: token }).then((res) => {
      console.log(res.data.data)
      setInvoices(res.data.data)
    })
  }, [])
  return (
    <div className="invCont">
      <div className="inv">
        <table>
          <tr>
            <th>Kwota</th>
            <th>Kategoria</th>
            <th>Data Utworzenia</th>
            <th>Usuń</th>
            <th>Edytuj</th>
          </tr>
          {invoices != null ? (
            invoices.map((inv) => (
              <tr>
                <td>{inv.amount}</td>
                <td>{inv.category.name}</td>
                <td>{inv.createdDate}</td>
                <td>Edytuj</td>
                <td>Edytuj</td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </table>
      </div>
    </div>
  )
}
