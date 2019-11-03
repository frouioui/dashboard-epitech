package main

import (
	"log"
	"net/http"
	"os"
	"time"

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
		Addr:           ":" + port,
		Handler:        r,
		IdleTimeout:    5 * time.Second,
		ReadTimeout:    5 * time.Second,
		WriteTimeout:   5 * time.Second,
		MaxHeaderBytes: 1 << 20,
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
