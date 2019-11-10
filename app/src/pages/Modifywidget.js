import React from "react";
import "../CSS/html_properties_widgets_header.css"
import { getParamsOfUserWidget } from "../client/widgets";
import { modifyParamValue } from "../client/widgets";
import queryString from 'query-string';
import { Link, Redirect } from 'react-router-dom';


class Modifywidget extends React.Component {
    constructor(props) {
    super()

    this.handleValueChange = this.handleValueChange.bind(this);
    }

    state = {
        widget_id: null,
        params: [],
        widgets: []
    }

    componentDidMount() {
        const { widget_id } = this.props.match.params

        fetch(`http://localhost/9001/v1/modify/widget/${widget_id}`)
        .then((widget_id) => {
            this.setState(() => ({ widget_id} ))
            console.log(widget_id)
        })
        console.log(widget_id)
        getParamsOfUserWidget(widget_id).then(jsonParams => {
            console.log(jsonParams)
            this.setState({
                params: jsonParams.data
            })
        }).catch((err) => setImmediate(() => {
            console.error(err)
        }))
    }

    handleValueChange = (id, e) => {
        console.log(id)
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

    validateParams(param_id, new_value) {
        modifyParamValue(param_id, new_value).then({

        }).catch((err) => setImmediate(() => {
                console.log(err)
        }))
    }

    handleOnClickModify = (e) => {
        this.state.params.map(param => {
            this.validateParams(param.id, param.value)
        })
    }

    render () {
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
                 <input type="text" value={param.value} name="value" onChange={this.handleValueChange.bind(this, param.id)} />
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
