import React from 'react'
import FormInput from './FormInput'

const FormCard = (props) => {

    const { submit, title, button, inputs, setState, state } = props

    const update = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="register-bg vertical-layout vertical-menu-collapsible page-header-dark vertical-modern-menu preload-transitions 1-column forgot-bg blank-page blank-page" data-open="click" data-menu="vertical-modern-menu" data-col="1-column">
            <div className="row">
                <div className="col s12">
                    <div className="container">
                        <div id="register-page" className="row">
                            <div className="col s12 m6 l4 z-depth-4 card-panel border-radius-6 register-card bg-opacity-8">
                                <form onSubmit={submit} className="login-form">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <h5 className="ml-4">{title}</h5>
                                        </div>
                                    </div>
                                    {
                                        inputs.map((input, i) => (
                                            <FormInput key={i} onChange={update} value={input.value} name={input.name} type={input.type} icon={input.icon} label={input.label} error={input.error} options={input.options} />
                                        ))
                                    }
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <button type='submit' className="btn waves-effect waves-light border-round gradient-45deg-purple-deep-orange col s12">{button}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormCard