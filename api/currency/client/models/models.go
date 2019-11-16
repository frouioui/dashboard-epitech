package models

// Rates data struct for the Currency API
type Rates struct {
	Base string             `json:"base"`
	Date string             `json:"date"`
	Rate map[string]float64 `json:"rates"`
}
