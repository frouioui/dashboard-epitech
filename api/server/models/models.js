var moment = require('moment');

module.exports = {
    getAbout
}

function getAbout(req, resp) {
    const ip = (req.ip.substr(0, 7) == "::ffff:") ? req.ip.substr(7) : req.ip;
    return {
        client: {
            host: ip
        },
        server: {
            current_time: moment().unix(),
            services: [{
                name: "intra",
                widgets: [{
                    name: "GPA and Credits",
                    description: "Get the current GPA and credits of an user",
                    params: [{
                        name: "cycle",
                        type: "string"
                    }, {
                        name: "auth token",
                        type: "string"
                    }]
                }, {
                    name: "Netsoul",
                    description: "Get the given user's netsoul for the last 7 days",
                    params: [{
                        name: "auth token",
                        type: "string"
                    }]
                }, {
                    name: "Marks",
                    description: "Get the last marks of the given user",
                    params: [{
                        name: "auth token",
                        type: "string"
                    }]
                }]
            }, {
                name: "news",
                widgets: [{
                    name: "Search news",
                    description: "Search a news from a keyword",
                    params: [{
                        name: "search keyword",
                        type: "string"
                    }]
                }, {
                    name: "Headlines news",
                    description: "Get the lastest headline corresponding to a given search keyword",
                    params: [{
                        name: "search keyword",
                        type: "string"
                    }]
                }, {
                    name: "Headlines country",
                    description: "Get the lastest headline of a given country",
                    params: [{
                        name: "country",
                        type: "string"
                    }]
                }]
            }, {
                name: "currency",
                widgets: [{
                    name: "Exchange rate currency",
                    description: "Give the rate from one currency to another one",
                    params: [{
                        name: "from currency",
                        type: "string"
                    }, {
                        name: "to currency",
                        type: "string"
                    }]
                }, {
                    name: "Calculate money to currency",
                    description: "Calculate the amount of money from one currency to another one",
                    params: [{
                        name: "from currency",
                        type: "string"
                    }, {
                        name: "to currency",
                        type: "string"
                    }, {
                        name: "amount",
                        type: "integer"
                    }]
                }]
            }, {
                name: "github",
                widgets: [{
                    name: "Repository last issue",
                    description: "Get the very last issue of the given GitHub repository",
                    params: [{
                        name: "Repository",
                        type: "string"
                    }, {
                        name: "Owner",
                        type: "string"
                    }]
                }, {
                    name: "Repository last PR",
                    description: "Get the lastest PR of the given GitHub repository",
                    params: [{
                        name: "Repository",
                        type: "string"
                    }, {
                        name: "Owner",
                        type: "string"
                    }]
                }]
            }
            ]
        }
    }
}
