# Build Setup:
## Install dependencies:
npm install

## Launch app:
### Output will be at build/ folder
npm run build
### Server with hot reload at http://localhost:8080/
npm run server

## Development:
### Client with hot reload at http://localhost:8081/
npm run dev

- to run a proper dev version, change "src/js/service/_address.js" for development requests redirecting
- to enable test pannel, uncomment display:none; at #testSection from devTools (or remove inline styles at "src/html/pages/index.html")
- to enable secure authentification - dont push "server/config/_sugar.json" (encription key) to your repo

```
