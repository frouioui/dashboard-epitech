import React from "react";
import "../CSS/html_properties_widgets_header.css"
import { getAllServices, getAllWidgets } from "../client/widgets";

class AddWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            isError: false,
            services: [],
            widgets: []
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

    render() {
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
                        <form method="get" action="/allwidget">
                            <button type="submit">Cancel</button>
                        </form>
                    </div>
                    <div className="header_widgets">
                        <h6>Widget name</h6>
                        <h6>Name</h6>
                    </div>
                    <div className="block">
                        <div className="first">
                            {this.state.services.map(service => (
                                <h3>{service.name}</h3>
                            ))}
                            <input type="radio" checked="checked" name="radio"></input>
                            <span class="checkmark"></span>
                            <hr />
                        </div>
                        <div className="second">
                            {this.state.widgets.map(widget => (
                                <h3>{widget.name}</h3>
                            ))}
                            <input onClick="" type="radio" checked="checked" name="radio"></input>
                            <span class="checkmark"></span>
                            <hr />
                        </div>
                    </div>
                    <div className="manage_widget">
                        <h3>Configure your widget</h3>
                        <div className="bloc">
                        </div>

                        <div className="submit">
                            <button>Submit</button>
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