package client

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/frouioui/dashboard-epitech/api/currency/client/models"
)

var (
	urlAPI = "https://api.exchangeratesapi.io"
)

// GetRateForOneCurrency returns the rate that correspond to the given
// currency source
//
// For example: EUR = 1 / USD = 1.1
// from = "EUR" and to = "USD", will return 1.1
func GetRateForOneCurrency(from, to string) (rate models.Rates, err error) {
	url := urlAPI + "/latest?symbols=" + to + "&base=" + from

	resp, err := http.Get(url)
	if err != nil {
		return rate, err
	}

	defer resp.Body.Close()

	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return rate, err
	}

	err = json.Unmarshal(respBody, &rate)
	if err != nil {
		return rate, err
	}
	return rate, err
}
