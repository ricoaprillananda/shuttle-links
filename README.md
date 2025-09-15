# shuttle-links 🛰️
Shuttle Links is a lightning-fast URL shortener built for simplicity. Map short codes to full destinations with zero database overhead. Static, reliable, and ready to launch—because sometimes the shortest path is the smartest one

---

## Features

- Static mapping from a JSON file  
- Zero database overhead  
- Clean 302 redirects (toggle to 301 with env)  
- Simple health check endpoint  
- Clear error handling for unknown slugs  

---

## Getting Started

### 1. Clone & Install
``bash
git clone https://github.com/ricoaprillananda/shuttle-links.git
cd shuttle-links
npm install
``

### 2. Run the Server

``bash
npm run dev
``
Server runs at: http://localhost:3000

---

## API Endpoints

### Health Check
``http
GET /health
``
### Response
``json
{
  "status": "ok",
  "service": "shuttle-links"
}
``

### Redirect
``http
GET /:slug
``

### Behavior

> Looks up slug in src/links.json

> Redirects to target with 302 Found (default)

> If USE_301=true, redirect becomes permanent (301)

### Example
``http
GET /gh
→ 302 Location: https://github.com/ricoaprillananda
``

Returns JSON 404 if slug is unknown

### Configure Links

Edit src/links.json to define your own mappings:

``json
{
  "gh": "https://github.com/ricoaprillananda",
  "tw": "https://twitter.com/ricoaprillananda",
  "docs": "https://yourwebsite.com/docs"
}
``
### Scripts

``bash
npm run dev   # start with nodemon (auto-reload)
npm start     # start plain node
``

---

### Environment

> PORT (default: 3000)

> USE_301 (default: false) → set true for permanent redirects

---

### License

This project is licensed under the MIT License. See the LICENSE file for details.


