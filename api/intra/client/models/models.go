package models

// User is the main user information
type User struct {
	Semester int     `json:"semester"`
	Gpa      []GPA   `json:"gpa"`
	Credits  int     `json:"credits"`
	Netsoul  Netsoul `json:"nsstat"`
}

// GPA is the GPA field in intra.epitech.eu API
//
// There can be multiple GPAs for users (bachelor & master)
// We have the value (from 0 to 4) and the
// cycle which is "bachelor" or "master"
type GPA struct {
	Value string `json:"gpa"`
	Cycle string `json:"cycle"`
}

// Netsoul correspond to the "log time"
//
// Active represents the time spent at school over
// the last 7 days
type Netsoul struct {
	Active float64 `json:"active"`
}

// Note is a mark on the intranet
//
// It is composed of the title of the mark, the mark itself,
// the teacher who gave the mark and the link to the intranet
type Note struct {
	Title   string `json:"title"`
	Note    string `json:"note"`
	Teacher string `json:"noteur"`
	Link    string `json:"title_link"`
}

// AllSubInfo are all the info we can find in the board
type AllSubInfo struct {
	Notes []Note `json:"notes"`
}

// AllInfo is the user board (all the intranet information)
type AllInfo struct {
	All AllSubInfo `json:"board"`
}
