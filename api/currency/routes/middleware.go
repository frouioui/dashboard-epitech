package routes

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// SetMiddleware set the middlewares used by mux router
func SetMiddleware(r *mux.Router) {
	log.Println("Setting up middlewares ...")
	r.Use(setCORS)
	r.Use(setJSONResponse)
	log.Println("Middlewares set.")
}

func setCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		next.ServeHTTP(w, r)
	})
}

func setJSONResponse(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}
