package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("public"))
	http.Handle("/public/", http.StripPrefix("/public/", fs))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "public/index.html")
	})

	log.Println("Server running on 0.0.0.0:8080")
	err := http.ListenAndServe("0.0.0.0:8080", nil)

	if err != nil {
		log.Fatal("Server error:", err)
	}
}

// func handler(w http.ResponseWriter, r *http.Request) {
// 	html, err := os.ReadFile("/public/index.html")

// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusServiceUnavailable)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "text/html")
// 	fmt.Fprintf(w, "%s", html)
// }
