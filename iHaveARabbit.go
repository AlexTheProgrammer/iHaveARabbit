package main

import (
	"html/template"
	"io/ioutil"
	"net/http"
)

type Page struct {
	Title string
	Body  []byte
}

func renderTemplate(w http.ResponseWriter, tmpl string, p *Page) {
	t, _ := template.ParseFiles(tmpl + ".html")
	t.Execute(w, p)
}

func loadPage() (*Page, error) {
	title := "BUNNIES"
	filename := "view.txt"
	body, err := ioutil.ReadFile(filename)
	if err != nil {
		return nil, err
	}
	return &Page{Title: title, Body: body}, nil
}

func viewHandler(w http.ResponseWriter, r *http.Request) {
	p, _ := loadPage()
	renderTemplate(w, "index", p)
}

func main() {
	http.Handle("/resources/", http.StripPrefix("/resources/", http.FileServer(http.Dir("./resources")))) 
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./js")))) 
	http.HandleFunc("/", viewHandler)
	http.ListenAndServe(":8080", nil)
}


