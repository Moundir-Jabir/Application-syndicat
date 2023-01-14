import React from 'react'
import AppartItem from '../components/appartement/AppartItem'
import FormInput from '../components/forms/FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addAppart, getAllAppart } from '../redux/feature/appartement/appartSlice'
import { useState } from 'react'

const Appartement = () => {

  const dispatch = useDispatch()
  const appartements = useSelector(state => state.appart.appartements)
  const token = useSelector(state => state.auth.token)
  const [numero, setNumero] = useState("")
  const [showModal, setShowModal] = useState("none")
  const [newAppart, setNewAppart] = useState({ numero: "", proprietaire: "", cotisation: "" })

  const handleNumero = (e) => {
    setNumero(e.target.value)
  }

  const addNewAppart = () => {
    dispatch(addAppart({ token, newAppart }))
    setNewAppart({ numero: "", proprietaire: "", cotisation: "" })
  }

  const update = (e) => {
    setNewAppart({
      ...newAppart,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    dispatch(getAllAppart({ token, numero }))
  }, [numero])

  const { proprietaire, cotisation } = newAppart
  let inputs = [
    { name: "numero", value: newAppart.numero, type: "number", icon: "", label: "Numero Appartement", error: "" },
    { name: "proprietaire", value: proprietaire, type: "text", icon: "", label: "Nom du Proprietaire", error: "" },
    { name: "cotisation", value: cotisation, type: "number", icon: "", label: "Cotisation mensuelle", error: "" }
  ]

  return (
    <div style={{ margin: "25px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <input onChange={handleNumero} value={numero} type="search" placeholder='taper un numero' />
        </div>

        <div className="invoice-create-btn">
          <div onClick={() => setShowModal("block")} className="btn waves-effect waves-light invoice-create border-round z-depth-4">
            <i className="material-icons">add</i>
            <span className="hide-on-small-only">Ajouter appartement</span>
          </div>
        </div>
      </div>
      <div style={{ display: showModal }} id="modal1" className="modal">
        <div className="modal-content">
          <h4>Nouveau Appartement</h4>
          {
            inputs.map((input, i) => (
              <FormInput key={i} onChange={update} value={input.value} name={input.name} type={input.type} icon={input.icon} label={input.label} error={input.error} />
            ))
          }
          <button onClick={addNewAppart} className='btn'>Ajouter</button>
        </div>
        <div className="modal-footer">
          <div onClick={() => setShowModal("none")} className="modal-action modal-close waves-effect waves-green btn-flat ">Close</div>
        </div>
      </div>
      <div className="responsive-table">
        <table className="table invoice-data-table white border-radius-4 pt-1">
          <thead>
            <tr>
              <th>Numero</th>
              <th>Proprietaire</th>
              <th>Cotisation mensuel</th>
              <th>Mois impayés</th>
              <th>Total à payer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              appartements.map((appart, i) => (<AppartItem data={appart} key={i} />))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Appartement