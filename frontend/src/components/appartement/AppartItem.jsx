import React, { useState } from 'react'
import moment from 'moment'
import FormInput from '../forms/FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { updateAppart } from '../../redux/feature/appartement/appartSlice'

const AppartItem = ({ data: { _id, numero, proprietaire, dernier_payment, cotisation } }) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    let now = new Date()
    let a = moment(now)
    let b = moment(dernier_payment)
    let moisInpaye = a.diff(b, 'months')
    const [showModal, setShowModal] = useState("none")
    const [appart, setAppart] = useState({ proprietaire, cotisation })
    let inputs = [
        { name: "proprietaire", value: appart.proprietaire, type: "text", icon: "", label: "", error: "" },
        { name: "cotisation", value: appart.cotisation, type: "number", icon: "", label: "", error: "" }
    ]
    const update = (e) => {
        setAppart({
            ...appart,
            [e.target.name]: e.target.value
        })
    }

    const patchAppart = () => {
        dispatch(updateAppart({ token, id: _id, newAppart: appart }))
    }
    return (
        <tr>
            <td><span>{numero}</span></td>
            <td><span>{proprietaire}</span></td>
            <td><span className="invoice-amount">{cotisation} dh</span></td>
            <td>
                <span className="chip lighten-5 red red-text">{moisInpaye} mois</span>
            </td>
            <td>{cotisation * moisInpaye} dh</td>
            <td>
                <div className="invoice-action">
                    <a href="#" className="invoice-action-view mr-4">
                        <i className="material-icons">remove_red_eye</i>
                    </a>
                    <a onClick={() => setShowModal("block")} href="#" className="invoice-action-edit">
                        <i className="material-icons">edit</i>
                    </a>
                    <div style={{ display: showModal }} id="modal1" className="modal">
                        <div className="modal-content">
                            <h4>Modification appartement numero : {numero}</h4>
                            {
                                inputs.map((input, i) => (
                                    <FormInput key={i} onChange={update} value={input.value} name={input.name} type={input.type} icon={input.icon} label={input.label} error={input.error} />
                                ))
                            }
                            <button onClick={patchAppart} className='btn'>Modifier</button>
                        </div>
                        <div className="modal-footer">
                            <div onClick={() => setShowModal("none")} className="modal-action modal-close waves-effect waves-green btn-flat ">Close</div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default AppartItem