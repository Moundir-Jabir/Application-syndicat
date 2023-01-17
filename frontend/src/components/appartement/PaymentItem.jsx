import React from 'react'

const PaymentItem = ({ data: { mois, moyen_payment, createdAt, _id } }) => {
  let datePayment = new Date(createdAt)
  let lien = `${process.env.REACT_APP_API_URL}/payment/facture/${_id}`
  return (
    <tr>
      <td>
        {
          mois.map((m, i) => {
            let date = new Date(m)
            return (<p key={i}>
              {
                `${date.getMonth() + 1} / ${date.getFullYear()}`
              }
            </p>)
          })
        }
      </td>
      <td><span>{moyen_payment}</span></td>
      <td><span>{datePayment.toUTCString()}</span></td>
      <td><span><a href={lien}>Télecharger facture</a></span></td>
    </tr>
  )
}

export default PaymentItem