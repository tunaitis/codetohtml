## About the Project

This is the code repository behind https://codetohtml.com website.

Code to HTML is an online tool that you can use to convert source code to syntax highlighted HTML code and then embed it into a web page or email.

### Built With

* [eleventy](https://github.com/11ty/eleventy)
* [Go](https://github.com/golang/go)
* [Highlight.js](https://github.com/highlightjs/highlight.js/)
* [TypeScript](https://github.com/microsoft/TypeScript)
* [Sass](https://github.com/sass/sass)
* [Webpack](https://github.com/webpack/webpack)

## Getting Started

Make sure you have [Node.js](https://github.com/nodejs/node) and the npm package manager installed.

[Go](https://github.com/golang/go) is required only for generating the stylesheet file used inside the theme preview page.

### Running Locally

Run the command below and then browse to http://localhost:8080

```
npm install
npm run dev
```

### Generating Theme Preview Stylesheet

```
go run ./cmd/genthemes
```

Remember to rebuild the stylesheet afterwards.
