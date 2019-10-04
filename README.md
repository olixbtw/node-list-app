### Build Setup:
# Install dependencies:
npm install

## Launch app:
# Server with hot reload at http://localhost:8080/
npm run server
# Output will be at build/ folder
npm run build

## Development:
# Client with hot reload at http://localhost:8081/
npm run dev

- to run a proper dev version, change "src/js/service/_address.js"
- to enable test pannel, uncomment display:none; at #testSection (or remove inline styles at "src/html/pages/index.html")
- to enable secure authentification - dont push "server/config/_sugar.json" (encription key) to your repo

```
