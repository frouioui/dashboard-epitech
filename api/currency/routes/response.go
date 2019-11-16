package routes

type ReponseCalcul struct {
	From       string  `json:"from"`
	FromAmount string  `json:"from_amount"`
	Result     float64 `json:"amount"`
	To         string  `json:"to"`
}
