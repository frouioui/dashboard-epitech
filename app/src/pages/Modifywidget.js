import React, { Redirect } from "react";
import "../CSS/html_properties_widgets_header.css"
import { getParamsOfUserWidget } from "../client/widgets";
import { modifyParamValue } from "../client/widgets";


class Modifywidget extends React.Component {
    constructor(props) {
        super()

        this.handleValueChange = this.handleValueChange.bind(this);
    }

    state = {
        widget_id: null,
        params: [],
        widgets: [],
        redirectMainPage: false
    }

    componentDidMount() {
        const { widget_id } = this.props.match.params

        getParamsOfUserWidget(widget_id).then(jsonParams => {
            this.setState({
                params: jsonParams.data
            })
        }).catch((err) => setImmediate(() => {
            console.error(err)
        }))
    }

    handleValueChange = (id, e) => {
        var tt = this.state.params;
        tt.map(param => {
            if (param.id === id) {
                param.value = e.target.value;
                param.param_id = e.target.param_id;
            }
            return (param)
        })
        this.setState({
            params: tt
        })
    }

    validateParams(param_id, new_value) {
        modifyParamValue(param_id, new_value).then((
            this.setState({
                redirectMainPage: true
            })
        )).catch((err) => setImmediate(() => {
            console.log(err)
        }))
    }

    handleOnClickModify = (e) => {
        this.state.params.map(param => {
            this.validateParams(param.id, param.value)
        })
    }

    displayParamsDependingOnWidget(parametres) {
        if (parametres.widget_param_id == 2) {
            return (
                <div className="bloc">
                    <h4>{parametres.name}</h4>
                    <div className="optionForCycle">
                        <select name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>
                            <option value="bachelor" name="value">bachelor</option>
                            <option value="master" name="value">master</option>
                        </select>
                    </div>
                </div>
            )
        } else if (parametres.widget_param_id == 3) {
            return (
                <div className="bloc">
                    <h4>{parametres.name}</h4>
                    <div className="optionForCountries">
                        <select name="country" onChange={this.handleValueChange.bind(this, parametres.id)}>
                            <option value="dz" name="value">Algeria</option>
                            <option value="de" name="value">Germany</option>
                            <option value="au" name="value">Australia</option>
                            <option value="be" name="value">Belgium</option>
                            <option value="br" name="value">Brasil</option>
                            <option value="ca" name="value">Canada</option>
                            <option value="dk" name="value">Denmark</option>
                            <option value="es" name="value">Spain</option>
                            <option value="us" name="value">United-States of America</option>
                            <option value="fr" name="value">France</option>
                            <option value="gr" name="value">Greece</option>
                            <option value="in" name="value">India</option>
                            <option value="it" name="value">Italia</option>
                            <option value="jp" name="value">Japan</option>
                            <option value="ma" name="value">Morocco</option>
                            <option value="mc" name="value">Monaco</option>
                            <option value="nl" name="value">Netherlands</option>
                            <option value="pt" name="value">Portugal</option>
                            <option value="gb" name="value">Great-Britain</option>
                            <option value="ch" name="value">Swiss</option>
                            <option value="tn" name="value">Tunisia</option>
                        </select>
                    </div>
                </div>
            )
        } else if (parametres.widget_param_id == 12 || parametres.widget_param_id == 13 || parametres.widget_param_id == 14 || parametres.widget_param_id == 16) {
            return (
                <div className="bloc">
                    <div className="optionForCurrencies">
                        <select name="currencies" onChange={this.handleValueChange.bind(this, parametres.id)}>
                            <option value="AUD" name="value">Australian dollar</option>
                            <option value="BRL" name="value">Brazilian real</option>
                            <option value="CHF" name="value">Swiss franc</option>
                            <option value="CZK" name="value">Czech koruna</option>
                            <option value="EUR" name="value">Euro</option>
                            <option value="HKD" name="value">Hong Kong dollar</option>
                            <option value="MXN" name="value">Mexican peso</option>
                            <option value="TRY" name="value">Turkish lira</option>
                            <option value="UDS" name="value">United States of America</option>
                            <option value="ISK" name="value">Icelandic krona</option>
                            <option value="PHP" name="value">Philippine peso</option>
                            <option value="DKK" name="value">Danish krone</option>
                            <option value="HUF" name="value">Turkish lira</option>
                            <option value="RON" name="value">Romanian leu</option>
                            <option value="SEK" name="value">Swedish krona/kronor</option>
                            <option value="IDR" name="value">Indonesian rupiah</option>
                            <option value="INR" name="value">Indian rupee</option>
                            <option value="RUB" name="value">Russian ruble</option>
                            <option value="HRK" name="value">Croation kuna</option>
                            <option value="JPY" name="value">Japanese yen</option>
                            <option value="THB" name="value">Thai baht</option>
                            <option value="SGD" name="value">Singapore dollar</option>
                            <option value="PLN" name="value">Polish zloty</option>
                            <option value="BGN" name="value">Bulgarian lev</option>
                            <option value="CNY" name="value">Chinese yuan</option>
                            <option value="NOK" name="value">Norwegian krone</option>
                            <option value="ZAR" name="value">South African rand</option>
                            <option value="ILS" name="value">Israeli new shekel</option>
                            <option value="KRW" name="value">South Korean won</option>
                            <option value="MYR" name="value">Malaysian ringgit</option>
                        </select>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="bloc">
                    <h4>{parametres.name}</h4>
                    <div className="textModif">
                        <input type="text" value={parametres.value} name="value" onChange={this.handleValueChange.bind(this, parametres.id)} placeholder="New param"></input>
                    </div>
                </div>
            )
        }

    }


    render() {
        if (this.state.redirectMainPage) {
            return <Redirect to='/allwidget' />
        }
        return (
            <div>
                <div className="header">
                    <button>Pedafy</button>
                </div>
                <div class="dropdown">
                    <button class="dropbtn">Setting</button>
                    <div class="dropdown-content">
                        <a href="https://pedafy.com/signup">Add Widget</a>
                        <a href="https://pedafy.com/signup">Logout</a>
                        <a href="https://pedafy.com/signup">Use our API</a>
                    </div>
                </div>
                <div className="body">
                    <div className="body2">
                        <form method="get" action="/allwidget/">
                            <button type="submit">Cancel</button>
                        </form>
                    </div>
                    <div className="body">
                        <h3>Modify a widget</h3>
                    </div>
                    <div className="modifInput">
                        {this.state.params.map(param => (

                            this.displayParamsDependingOnWidget(param)
                        ))}
                    </div>
                    <div className="submitModif">
                        <button onClick={() => this.handleOnClickModify(this)}>Modify</button>
                    </div>
                </div>
                <div className="footer4">
                </div>
            </div>
        );
    }
}

export default Modifywidget;
