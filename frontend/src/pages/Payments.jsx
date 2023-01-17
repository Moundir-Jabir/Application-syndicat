import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PaymentItem from '../components/appartement/PaymentItem'
import FormInput from '../components/forms/FormInput'
import { addPayment, getPayment } from '../redux/feature/appartement/appartSlice'

const Payments = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const payments = useSelector(state => state.appart.paymentsOfAppartement)
    useEffect(() => {
        dispatch(getPayment({ token, id }))
    }, [])

    const [showModal, setShowModal] = useState("none")
    const [newPayment, setNewPayment] = useState({ nbr_mois: "", moyen_payment: "espece" })

    const update = (e) => {
        setNewPayment({
            ...newPayment,
            [e.target.name]: e.target.value
        })
    }

    const addNewPayment = () => {
        dispatch(addPayment({ token, payment: newPayment, id }))
        setNewPayment({ nbr_mois: "", moyen_payment: "espece" })
    }

    const { nbr_mois, moyen_payment } = newPayment
    let inputs = [
        { name: "nbr_mois", value: nbr_mois, type: "number", icon: "", label: "Nombre de mois payé", error: "" },
        { name: "moyen_payment", value: moyen_payment, type: "select", icon: "", label: "Nom du Proprietaire", error: "", options: ["espece", "virement", "check"] }
    ]

    return (
        <div style={{ margin: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="invoice-create-btn">
                    <div onClick={() => setShowModal("block")} className="btn waves-effect waves-light invoice-create border-round z-depth-4">
                        <i className="material-icons">add</i>
                        <span className="hide-on-small-only">Ajouter Payment</span>
                    </div>
                </div>
            </div>
            <div style={{ display: showModal }} id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Ajouter Paiment</h4>
                    {
                        inputs.map((input, i) => (
                            <FormInput key={i} onChange={update} value={input.value} name={input.name} type={input.type} icon={input.icon} label={input.label} error={input.error} options={input.options} />
                        ))
                    }
                    <button onClick={addNewPayment} className='btn'>Ajouter</button>
                </div>
                <div className="modal-footer">
                    <div onClick={() => setShowModal("none")} className="modal-action modal-close waves-effect waves-green btn-flat ">Close</div>
                </div>
            </div>
            <div className="responsive-table">
                <table className="table invoice-data-table white border-radius-4 pt-1">
                    <thead>
                        <tr>
                            <th>Mois Payés</th>
                            <th>Moyen de paiement</th>
                            <th>Date de paiement</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, i) => (<PaymentItem data={payment} key={i} />))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Payments