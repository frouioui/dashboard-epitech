package client

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/frouioui/dashboard-epitech/api/intra/client/models"
)

var (
	urlAPI = "https://intra.epitech.eu/"
)

func getUserInfo(authToken string) (user models.User, err error) {
	url := urlAPI + authToken + "/user/?format=json"

	resp, err := http.Get(url)
	if err != nil {
		return user, err
	}

	defer resp.Body.Close()

	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return user, err
	}

	err = json.Unmarshal(respBody, &user)
	log.Println(user)
	if err != nil {
		return user, err
	}
	return user, err
}

func getUserBoard(authToken string) (board models.AllInfo, err error) {
	url := urlAPI + authToken + "/?format=json"

	resp, err := http.Get(url)
	if err != nil {
		return board, err
	}

	defer resp.Body.Close()

	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return board, err
	}

	err = json.Unmarshal(respBody, &board)
	if err != nil {
		return board, err
	}
	return board, err
}

// GetGPAAndCredits returns the GPA of the user and its
// amount of credits
func GetGPAAndCredits(cycle, authToken string) (gpa float64, credits int, err error) {
	if cycle == "" || (cycle != "bachelor" && cycle != "master") {
		return 0.00, 0, errors.New("invalid cycle")
	} else if authToken == "" {
		return 0.00, 0, errors.New("authToken is not set")
	}

	user, err := getUserInfo(authToken)
	if err != nil {
		return 0.00, 0, err
	}

	var userGpa = ""
	for _, gpa := range user.Gpa {
		if gpa.Cycle == cycle {
			userGpa = gpa.Value
			break
		}
	}

	gpa, err = strconv.ParseFloat(userGpa, 64)
	if err != nil {
		return 0.00, 0, err
	}

	return gpa, user.Credits, nil
}

// GetNetsoul returns the log time of the user
func GetNetsoul(authToken string) (logtime float64, err error) {
	if authToken == "" {
		return 0.00, errors.New("authToken is not set")
	}

	user, err := getUserInfo(authToken)
	if err != nil {
		return 0.00, err
	}

	logtime = user.Netsoul.Active

	return logtime, nil
}

// GetLastMarks returns the last marks the user received on its
// epitech intranet
func GetLastMarks(authToken string) (marks []models.Note, err error) {
	if authToken == "" {
		return marks, errors.New("authToken is not set")
	}

	board, err := getUserBoard(authToken)

	marks = board.All.Notes
	for i, mark := range marks {
		marks[i].Link = "https://intra.epitech.eu" + mark.Link
	}
	return marks, err
}
