package routes

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/frouioui/dashboard-epitech/api/intra/client"

	"github.com/gorilla/mux"
)

// Assign all the routes to a mux Router
func Assign(r *mux.Router) {
	log.Println("Setting up routes ...")
	r.HandleFunc("/v1/intra/", homeRoute).Methods(http.MethodGet, http.MethodOptions)
	r.HandleFunc("/v1/intra", homeRoute).Methods(http.MethodGet, http.MethodOptions)
	r.HandleFunc("/v1/intra/grade/{cycle}", gpaAndCreditsRoute).Methods(http.MethodGet, http.MethodOptions)
	r.HandleFunc("/v1/intra/netsoul", netsoulRoute).Methods(http.MethodGet, http.MethodOptions)
	r.HandleFunc("/v1/intra/marks", markRoute).Methods(http.MethodGet, http.MethodOptions)
	log.Println("Routes set.")
}

func homeRoute(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(`{"status": "success", "code": 200}`))
}

func markRoute(w http.ResponseWriter, r *http.Request) {
	authToken := r.Header.Get("Authorization")
	marks, err := client.GetLastMarks(authToken)
	if err != nil {
		w.WriteHeader(400)
		log.Println(err)
		fmt.Fprintf(w, `{"status": "failure", "code": %d, "message": "%s"}`, 400, err)
		return
	}

	marksB, err := json.Marshal(marks)
	if err != nil {
		w.WriteHeader(500)
		log.Println(err)
		fmt.Fprintf(w, `{"status": "failure", "code": %d, "message": "%s"}`, 500, err)
	}

	w.WriteHeader(200)
	fmt.Fprintf(w, `{"status": "success", "code": %d, "data": %s}`, 200, string(marksB))
	return
}

func netsoulRoute(w http.ResponseWriter, r *http.Request) {
	authToken := r.Header.Get("Authorization")
	netsoul, err := client.GetNetsoul(authToken)
	log.Println(netsoul)
	if err != nil {
		w.WriteHeader(400)
		log.Println(err)
		fmt.Fprintf(w, `{"status": "failure", "code": %d, "message": "%s"}`, 400, err)
		return
	}

	w.WriteHeader(200)
	fmt.Fprintf(w, `{"status": "success", "code": %d, "data": "%.0f"}`, 200, netsoul)
	return
}

func gpaAndCreditsRoute(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	cycle := vars["cycle"]
	authToken := r.Header.Get("Authorization")
	gpa, credits, err := client.GetGPAAndCredits(cycle, authToken)
	if err != nil {
		w.WriteHeader(400)
		log.Println(err)
		fmt.Fprintf(w, `{"status": "failure", "code": %d, "message": "%s"}`, 400, err)
		return
	}

	info := responseGPAAndCredits{
		Gpa:     gpa,
		Credits: credits,
	}

	infoB, err := json.Marshal(info)
	if err != nil {
		w.WriteHeader(500)
		log.Println(err)
		fmt.Fprintf(w, `{"status": "failure", "code": %d, "message": "%s"}`, 500, err)
	}

	w.WriteHeader(200)
	fmt.Fprintf(w, `{"status": "success", "code": %d, "data": %s}`, 200, string(infoB))
	return
}
