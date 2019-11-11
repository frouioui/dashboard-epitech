import React from "react";
import "../CSS/html_properties_widgets_header.css"
import { getParamsOfWidget, addUserWidget, getAllServices, getAllWidgets, addUserParam, modifyWidgetPosition } from "../client/widgets";
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
            currentWidget: 0
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

    getParams2(widget_id) {
        this.setState({currentWidget: widget_id})
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

    handleValueChange = (id, e) => {
        var tt = this.state.params;
        tt.map(param => {
            if (param.id == id) {
                param.value = e.target.value;
                param.param_id = e.target.param_id;
            }
        })
        this.setState ({
            params: tt
        })
    }

    handleOnClick = (e) => {
        this.addWidgetUser(1, this.state.currentWidget)
    }


    render() {
        var cookies = new Cookies()
        var user_id = cookies.get('user_id')
        if (!this.state.isLoaded) {
            return <div>Loading ...</div>;
        } else {
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
                            <a href="#">Use our API</a>
                        </div>
                    </div>
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
                        <div className="bloc">
                                <h4>{parametres.name}</h4>
                                <div className="textModif">
                                <input type="text" value={parametres.value} name="value" onChange={this.handleValueChange.bind(this, parametres.id)} placeholder="New param"></input>
                                </div>
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
                        <form method="get" action="/allwidget">
                            <button onClick={() => this.handleOnClick(this)}>Add</button>
                        </form>
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
