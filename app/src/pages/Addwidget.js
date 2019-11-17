import React from "react";
import "../CSS/html_properties_widgets_header.css"
import { getLastWidgetPosition, getParamsOfWidget, addUserWidget, getAllServices, getAllWidgets, addUserParam } from "../client/widgets";
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

class AddWidget extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            isLoaded: false,
            isError: false,
            services: [],
            widgets: [],
            params: [],
            currentWidget: 0,
            redirectMainPage: false,
            lastPosition: 0,
            currentTimer: 1
        }
    }

    componentDidMount() {
        getAllServices().then(jsonServices => {
            getAllWidgets().then(jsonWidgets => {
                this.setState({
                    widgets: jsonWidgets.data,
                    services: jsonServices.data,
                    isLoaded: true
                })
            }).catch((err) => setImmediate(() => {
                this.setState({
                    isError: true
                })
                console.error(err)
            }))
        }).catch((err) => setImmediate(() => {
            this.setState({
                isError: true
            })
            console.error(err)
        }))
        this.getLastPosition()
    }

    getLastPosition() {
        var cookies = new Cookies()
        var user_id = cookies.get('user_id')

        getLastWidgetPosition(user_id).then(res => {
            this.setState({ lastPosition: res.data.data + 1 })
        }).catch((err) => setImmediate(() => {
            console.log(err)
        }))
    }

    getServiceName(service_id) {
        var res = this.state.services.map(service => {
            if (service.id == service_id) {
                return service.name
            }
        })
        return res
    }

    getParams2(widget_id) {
        this.setState({ currentWidget: widget_id })
        getParamsOfWidget(widget_id).then(getParams => {
            this.setState({
                params: getParams.data
            })
            return (getParams.data);
        })
    }

    addWidgetUser(position, widget_id, timer) {
        var cookies = new Cookies()
        var user_id = cookies.get('user_id')

        addUserWidget(user_id, position, widget_id, timer).then(res => {
            this.state.params.map(param => {
                this.addParams(user_id, param.value, param.id, res.data.data)
            })
            this.setState({
                redirectMainPage: true
            })
        }).catch((err) => setImmediate(() => {
            console.log(err)
        }))
    }

    addParams(user_id, value, param_id, widget_id) {
        addUserParam(user_id, value, param_id, widget_id).then({

        }).catch((err) => setImmediate(() => {
            console.log(err)
        }))
    }

    handleOnClick = (e) => {
        this.addWidgetUser(this.state.lastPosition, this.state.currentWidget, this.state.currentTimer)
    }

    handleValueChange = (id, e) => {
        var tt = this.state.params;
        tt.map(param => {
            if (param.id == id) {
                param.value = e.target.value;
                param.param_id = e.target.param_id;
            }
        })
        this.setState({
            params: tt
        })
    }

    handleValueTimerChange = (e) => {
        this.setState({
            currentTimer: e.target.value
        })
    }

    displayParamsDependingOnWidget(parametres) {
        if (parametres.name === "Cycle" && parametres.widget_id === 1) {
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
        } else if (parametres.name === "country" && (parametres.widget_id === 6)) {
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
        } else if ((parametres.name === "From currency" || parametres.name === "To currency") && (parametres.widget_id === 9 || parametres.widget_id === 10)) {
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

    renderOneWidgetSelection(widget) {
        var cookies = new Cookies()
        var auth = cookies.get('auth')

        if ((!auth || auth === "") && auth !== "none" && (widget.name == "Repo last issue" || widget.name == "Repo last PR")) {
            return (
                <tr>
                    <div className="hr">
                        <hr />
                    </div>

                    <div className="serviceName">
                        <td>{this.getServiceName(widget.service_id)}</td>
                    </div>
                    <div className="test">
                        <td>Login with GitHub to use this widget</td>
                    </div>
                </tr>
            )
        }
        return (
            <tr>
                <div className="hr">
                    <hr />
                </div>

                <div className="serviceName">
                    <td>{this.getServiceName(widget.service_id)}</td>
                </div>
                <div className="test">
                    <td>{widget.name}</td>
                </div>
                <div className="bti">
                    <button widget-id={widget.id} onClick={this.getParams2.bind(this, widget.id)}>Select</button>
                </div>
            </tr>
        )
    }

    render() {
        var cookies = new Cookies()
        var user_id = cookies.get('user_id')
        if (!this.state.isLoaded) {
            return <div>Loading ...</div>;
        } else if (this.state.redirectMainPage) {
            return <Redirect to='/allwidget' />
        } else if (!user_id || user_id === "") {
            return <Redirect to='/login' />
        } else {
            return (
                <div>
                    <div className="body">
                        <h3>Add a widget</h3>
                        <hr class="separator" />
                    </div>

                    <div className="body2">
                        <form method="get" action="/allwidget">
                            <button type="submit">Cancel</button>
                        </form>
                    </div>
                    <div className="header_widgets">
                        <h6>Service name</h6>
                        <h6>Widget name</h6>
                    </div>
                    <div className="block">
                        <div className="first">
                            <table>
                                <thead>
                                    <tr>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.widgets.map(widget => (
                                        <div>
                                            {this.renderOneWidgetSelection(widget)}
                                        </div>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="manage_widget">
                        <h3>Configure your widget</h3>
                        {this.state.params.map(parametres => (
                            <div>
                                {this.displayParamsDependingOnWidget(parametres)}
                            </div>
                        ))}
                        <div className="test">
                            <td>Position</td>
                        </div>
                        <div className="box">
                            <input type="number" value={this.state.lastPosition} name="position"></input>
                        </div>
                        <div className="test">
                            <td>Refresh rate (in minutes)</td>
                        </div>
                        <div className="box">
                            <input type="number" value={this.state.currentTimer} onChange={this.handleValueTimerChange.bind(this)} name="timer"></input>
                        </div>
                        <div className="submit">
                            <button onClick={() => this.handleOnClick(this)}>Add</button>
                        </div>

                    </div>
                    <div className="footer3">
                    </div>
                </div>
            );
        }
    }
}

export default AddWidget;