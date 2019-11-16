import React from "react";
import "../CSS/html_properties_widgets_header.css"
import { getParamsOfWidget, addUserWidget, getAllServices, getAllWidgets, addUserParam, modifyWidgetPosition, getParamsOfUserWidget } from "../client/widgets";
import Cookies from 'universal-cookie';
import Login from "./Login";
import { Link, Redirect } from 'react-router-dom';

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
            redirectMainPage: false
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
                // TODO: HANDLE ERRORS -> Display an error message
                this.setState({
                    isError: true
                })
                console.error(err)
            }))
        }).catch((err) => setImmediate(() => {
            // TODO: HANDLE ERRORS -> Display an error message
            this.setState({
                isError: true
            })
            console.error(err)
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

    getParams(id, e) {
        console.log(e)
        console.log(id)
    }


    displayCycle(widget_id) {
        console.log("yes")
        getParamsOfWidget(widget_id).then(displayCycle => {
            if (widget_id === 1) {
                console.log("ok frere")

            }
            else {
                console.log("try again")
            }
        })
    }

    getParams2(widget_id) {
        this.setState({ currentWidget: widget_id })
        getParamsOfWidget(widget_id).then(getParams => {
            console.log(getParams)
            this.setState({
                params: getParams.data,
                /*widgets: res.data,*/
            })
            return (getParams.data);
        })
    }

    addWidgetUser(position, widget_id) {
        var cookies = new Cookies()
        var user_id = cookies.get('user_id')

        addUserWidget(user_id, position, widget_id).then(res => {
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
        this.addWidgetUser(1, this.state.currentWidget)
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

    displayParamsDependingOnWidget(parametres) {
        console.log(parametres)
        if (parametres.name == "Cycle" && parametres.widget_id == 1) {
            return (
                <div>
                    <h4>{parametres.name}</h4>
                    <div className="optionForCycle">
                        <select name="value">
                            <option value={parametres.value} name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>bachelor</option>
                            <option value={parametres.value} name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>master</option>
                        </select>
                    </div>
                </div>
            )
        } else if (parametres.name == "country" && (parametres.widget_id == 6)) {
            return (
                <div>
                    <h4>{parametres.name}</h4>
                    <div className="optionForCountries">
                        <select name="country">
                            <option value="dz" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Algeria</option>
                            <option value="de" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Germany</option>
                            <option value="au" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Australia</option>
                            <option value="be" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Belgium</option>
                            <option value="br" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Brasil</option>
                            <option value="ca" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Canada</option>
                            <option value="dk" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Denmark</option>
                            <option value="es" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Spain</option>
                            <option value="us" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>United-States of America</option>
                            <option value="fr" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>France</option>
                            <option value="gr" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Greece</option>
                            <option value="in" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>India</option>
                            <option value="it" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Italia</option>
                            <option value="jp" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Japan</option>
                            <option value="ma" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Morocco</option>
                            <option value="mc" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Monaco</option>
                            <option value="nl" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Netherlands</option>
                            <option value="pt" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Portugal</option>
                            <option value="gb" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Great-Britain</option>
                            <option value="ch" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Swiss</option>
                            <option value="tn" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Tunisia</option>
                        </select>
                    </div>
                </div>
            )
        } else if (false) {
            return (
                <div>
                    <div className="optionForCurrencies">
                        <select name="currencies">
                            <option value="aud" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Australian dollar</option>
                            <option value="brl" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Brazilian real</option>
                            <option value="chf" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Swiss franc</option>
                            <option value="czk" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Czech koruna</option>
                            <option value="eur" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Euro</option>
                            <option value="hkd" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Hong Kong dollar</option>
                            <option value="mxn" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Mexican peso</option>
                            <option value="try" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Turkish lira</option>
                            <option value="usd" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>United States of America</option>
                            <option value="isk" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Icelandic krona</option>
                            <option value="php" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Philippine peso</option>
                            <option value="dkk" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Danish krone</option>
                            <option value="huf" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Turkish lira</option>
                            <option value="ron" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Romanian leu</option>
                            <option value="sek" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Swedish krona/kronor</option>
                            <option value="idr" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Indonesian rupiah</option>
                            <option value="inr" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Indian rupee</option>
                            <option value="rub" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Russian ruble</option>
                            <option value="hrk" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Croation kuna</option>
                            <option value="jpy" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Japanese yen</option>
                            <option value="thb" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Thai baht</option>
                            <option value="sgd" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Singapore dollar</option>
                            <option value="pln" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Polish zloty</option>
                            <option value="bgn" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Bulgarian lev</option>
                            <option value="cny" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Chinese yuan</option>
                            <option value="nok" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Norwegian krone</option>
                            <option value="zar" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>South African rand</option>
                            <option value="ils" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Israeli new shekel</option>
                            <option value="krw" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>South Korean won</option>
                            <option value="myr" name="value" onChange={this.handleValueChange.bind(this, parametres.id)}>Malaysian ringgit</option>
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
        var cookies = new Cookies()
        var user_id = cookies.get('user_id')
        if (!this.state.isLoaded) {
            return <div>Loading ...</div>;
        } else if (this.state.redirectMainPage) {
            return <Redirect to='/allwidget' />
        } else {
            return (
                <div>
                    <div className="body">
                        <h3>Add a widget</h3>
                        <hr class="separator" />
                    </div>

                    <div className="body2">
                        <form method="get" action="/allwidget/2">
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
                        <div className="box">
                            <select name="position">
                                <option value="postion">position</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
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