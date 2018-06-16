# PWAkandan Movies

🔥 A progressive [movie] web app from Wakanda! 🚀

# Live Demo

https://pwakanda.herokuapp.com

![Pwakanda homepage](https://i.imgur.com/pJONJR8.png)

## Instructions

- Visit https://pwakanda.herokuapp.com
- Turn off your network connection via wifi or Chrome DevTools [Device Mode](https://developer.chrome.com/devtools/docs/device-mode#network-conditions)
- Reload the page! WHAAAT! STILL WORKS!
- Star the repo 😉

### Prerequisites

- [Node](http://nodejs.org/)
- [TMDb API KEY](https://www.themoviedb.org/)

Clone the repo

```sh
# clone with SSH
git clone git@github.com:codeshifu/pwakanda.git
```

or

```sh
# clone with HTTPS
git clone https://github.com/codeshifu/pwakanda.git
```

### Running

```sh
cd pwakanda
```

create a file in `src/config/`

```js
// dev.js
module.exports = {
  apiKey: 'YOUR_TMDB_API_KEY_HERE'
};
```

```sh
npm start
```

#### Server

[http://localhost:2222](http://localhost:2222)

## License

Copyright (c) 2018 Olushi Luqman O.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
