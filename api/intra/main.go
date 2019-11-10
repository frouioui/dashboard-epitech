package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/handlers"

	"github.com/frouioui/dashboard-epitech/api/intra/routes"

	"github.com/gorilla/mux"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Using default port %s.", port)
	}
	r := mux.NewRouter()
	routes.SetMiddleware(r)
	routes.Assign(r)

	s := &http.Server{
		Addr:         ":" + port,
		Handler:      handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(r),
		IdleTimeout:  10 * time.Second,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	waiter := make(chan error)
	log.Println("Starting server ...")
	go func() {
		err := s.ListenAndServe()
		waiter <- err
	}()
	log.Println("Server up and running.")
	err := <-waiter
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Server shutted down.")
}
