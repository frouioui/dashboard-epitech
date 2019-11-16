package routes

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/frouioui/dashboard-epitech/api/currency/client"

	"github.com/gorilla/mux"
)

// Assign all the routes to a mux Router
func Assign(r *mux.Router) {
	log.Println("Setting up routes ...")
	r.HandleFunc("/v1/currency/", homeRoute).Methods(http.MethodGet, http.MethodOptions)
	r.HandleFunc("/v1/currency", homeRoute).Methods(http.MethodGet, http.MethodOptions)
	r.HandleFunc("/v1/currency/convert", getOneRateRoute).Methods(http.MethodGet, http.MethodOptions)
	r.HandleFunc("/v1/currency/calcul", calculOneRateRoute).Methods(http.MethodGet, http.MethodOptions)
	log.Println("Routes set.")
}

func homeRoute(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(`{"status": "success", "code": 200}`))
}

func getOneRateRoute(w http.ResponseWriter, r *http.Request) {
	to, okTo := r.URL.Query()["to"]
	from, okFrom := r.URL.Query()["from"]

	if !okTo || !okFrom || len(to[0]) < 1 || len(from[0]) < 1 {
		w.WriteHeader(400)
		fmt.Fprintf(w, `{"status": "failure", "code": %d, "message": "%s"}`, 400, "invalid query params")
		return
	}
	rate, err := client.GetRateForOneCurrency(from[0], to[0])
	if err != nil {
		w.WriteHeader(400)
		log.Println(err)
		fmt.Fprintf(w, `{"status": "failure", "code": %d, "message": "%s"}`, 400, err)
		return
	}

	rateJSON, err := json.Marshal(rate)
	if err != nil {
		w.WriteHeader(500)
		log.Println(err)
		fmt.Fprintf(w, `{"status": "failure", "code": %d, "message": "%s"}`, 500, err)
	}

	w.WriteHeader(200)
	fmt.Fprintf(w, `{"status": "success", "code": %d, "data": %s}`, 200, rateJSON)
	return
}

func calculOneRateRoute(w http.ResponseWriter, r *http.Request) {
	to, okTo := r.URL.Query()["to"]
	from, okFrom := r.URL.Query()["from"]
	amount, okAmount := r.URL.Query()["amount"]

	if !okTo || !okFrom || !okAmount || len(to[0]) < 1 || len(from[0]) < 1 || len(amount[0]) < 1 {
		w.WriteHeader(400)
		fmt.Fprintf(w, `{"status": "failure", "code": %d, "message": "%s"}`, 400, "invalid query params")
		return
	}
	rate, err := client.GetRateForOneCurrency(from[0], to[0])
	if err != nil {
		w.WriteHeader(400)
		log.Println(err)
		fmt.Fprintf(w, `{"status": "failure", "code": %d, "message": "%s"}`, 400, err)
		return
	}

	rateValue := rate.Rate[to[0]]

	amountFloat, err := strconv.ParseFloat(amount[0], 64)
	if err != nil {
		w.WriteHeader(500)
		log.Println(err)
		fmt.Fprintf(w, `{"status": "failure", "code": %d, "message": "%s"}`, 500, err)
	}

	resp := ReponseCalcul{
		From:       from[0],
		To:         to[0],
		FromAmount: amount[0],
		Result:     rateValue * amountFloat,
	}

	respJSON, err := json.Marshal(resp)
	if err != nil {
		w.WriteHeader(500)
		log.Println(err)
		fmt.Fprintf(w, `{"status": "failure", "code": %d, "message": "%s"}`, 500, err)
	}

	w.WriteHeader(200)
	fmt.Fprintf(w, `{"status": "success", "code": %d, "data": %s}`, 200, string(respJSON))
	return
}
