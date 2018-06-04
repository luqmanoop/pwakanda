/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/movie.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/movie.js":
/*!****************************!*\
  !*** ./public/js/movie.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

const createGenre = genre => {
  return `
      <small>${genre}</small>
      `;
};

const createReview = review => {
  const { author, content } = review || {};
  return `
            <div class="col-md-12 review">
              <div class="row">
                  <h5>${author}</h5>
                  <p>${content}</p>
              </div>
            </div>
        `;
};

const createTrailer = trailer => {
  const { key } = trailer;
  return `
          <div class="col-md-4 trailer">
              <div class="embed-responsive embed-responsive-16by9">
                  <iframe 
                    class="embed-responsive-item"
                    id="ytplayer"
                    type="text/html"
                    src="https://www.youtube.com/embed/${key}"></iframe>
              </div>
        </div>
      `;
};

const createCast = cast => {
  const { character, name, profile } = cast || {};
  return `
        <div class="media cast">
            <div class="media-left media-middle">
                <div>
                    <a href="javascript:void()">
                        <img class="media-object" src="${profile}" width="64">
                    </a>
                </div>
            </div>
            <div class="media-body">
                <h5 class="media-heading">${name}</h5>
                <p>as ${character}</p>
            </div>
        </div>
        `;
};

const emptyData = (text, classList = '') => {
  return `
      <div class='${classList}'>There are no ${text} available</div>
    `;
};

const _hero = document.querySelector('.hero');
const _release_date = document.querySelector('.release_date');
const _movieTitle = document.querySelector('.movie_title');
const _moviePoster = document.querySelector('.movie_poster');
const _sypnosis = document.querySelector('.sypnosis');
const _genres = document.querySelector('.genres');
const _reviews = document.querySelector('.reviews_container');
const _trailers = document.querySelector('.trailers_container');
const _cast = document.querySelector('.casts');

(() => {
  const id = window.location.pathname
    .trim()
    .split('/')[3]
    .trim();

  fetch(`/api/movie/${id}`)
    .then(response => response.json())
    .then(movie => {
      const {
        release_date,
        original_title,
        title,
        poster,
        backdrop,
        overview,
        genres,
        cast,
        reviews,
        trailers
      } = movie;

      _release_date.textContent = 'Released: ' + release_date;
      _movieTitle.textContent = original_title || title;

      const genreHtml = genres
        .map((value, index) => {
          if (index + 1 === genres.length) return createGenre(value.name);
          return createGenre(value.name + ' &raquo; ');
        })
        .join('')
        .trim();
      _genres.innerHTML = 'Genres: ' + genreHtml;

      _hero.setAttribute('style', `background-image: url(${backdrop})`);

      _moviePoster.setAttribute('src', poster);
      _sypnosis.textContent = overview;

      _reviews.innerHTML = reviews.length
        ? reviews
            .map(value => createReview(value))
            .join('')
            .trim()
        : emptyData('reviews');

      _trailers.innerHTML = trailers.length
        ? trailers
            .map(value => createTrailer(value))
            .join('')
            .trim()
        : emptyData('trailer');

      const castNode = document.createElement('div');

      castNode.innerHTML = cast.length
        ? cast
            .map(cast => createCast(cast))
            .join('')
            .trim()
        : emptyData('cast');

      _cast.appendChild(castNode);
    });
})();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL21vdmllLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLGtCQUFrQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQix1QkFBdUIsUUFBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVMsTUFBTTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELElBQUk7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLDJCQUEyQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELFFBQVE7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsS0FBSztBQUNqRCx3QkFBd0IsVUFBVTtBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFVBQVUsaUJBQWlCLEtBQUs7QUFDcEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsR0FBRztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSwyREFBMkQsU0FBUzs7QUFFcEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxDQUFDIiwiZmlsZSI6Im1vdmllLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcHVibGljL2pzL21vdmllLmpzXCIpO1xuIiwiY29uc3QgY3JlYXRlR2VucmUgPSBnZW5yZSA9PiB7XG4gIHJldHVybiBgXG4gICAgICA8c21hbGw+JHtnZW5yZX08L3NtYWxsPlxuICAgICAgYDtcbn07XG5cbmNvbnN0IGNyZWF0ZVJldmlldyA9IHJldmlldyA9PiB7XG4gIGNvbnN0IHsgYXV0aG9yLCBjb250ZW50IH0gPSByZXZpZXcgfHwge307XG4gIHJldHVybiBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIHJldmlld1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICA8aDU+JHthdXRob3J9PC9oNT5cbiAgICAgICAgICAgICAgICAgIDxwPiR7Y29udGVudH08L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG59O1xuXG5jb25zdCBjcmVhdGVUcmFpbGVyID0gdHJhaWxlciA9PiB7XG4gIGNvbnN0IHsga2V5IH0gPSB0cmFpbGVyO1xuICByZXR1cm4gYFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNCB0cmFpbGVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlbWJlZC1yZXNwb25zaXZlIGVtYmVkLXJlc3BvbnNpdmUtMTZieTlcIj5cbiAgICAgICAgICAgICAgICAgIDxpZnJhbWUgXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZW1iZWQtcmVzcG9uc2l2ZS1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgaWQ9XCJ5dHBsYXllclwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0L2h0bWxcIlxuICAgICAgICAgICAgICAgICAgICBzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke2tleX1cIj48L2lmcmFtZT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgYDtcbn07XG5cbmNvbnN0IGNyZWF0ZUNhc3QgPSBjYXN0ID0+IHtcbiAgY29uc3QgeyBjaGFyYWN0ZXIsIG5hbWUsIHByb2ZpbGUgfSA9IGNhc3QgfHwge307XG4gIHJldHVybiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZWRpYSBjYXN0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVkaWEtbGVmdCBtZWRpYS1taWRkbGVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJtZWRpYS1vYmplY3RcIiBzcmM9XCIke3Byb2ZpbGV9XCIgd2lkdGg9XCI2NFwiPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZWRpYS1ib2R5XCI+XG4gICAgICAgICAgICAgICAgPGg1IGNsYXNzPVwibWVkaWEtaGVhZGluZ1wiPiR7bmFtZX08L2g1PlxuICAgICAgICAgICAgICAgIDxwPmFzICR7Y2hhcmFjdGVyfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbn07XG5cbmNvbnN0IGVtcHR5RGF0YSA9ICh0ZXh0LCBjbGFzc0xpc3QgPSAnJykgPT4ge1xuICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz0nJHtjbGFzc0xpc3R9Jz5UaGVyZSBhcmUgbm8gJHt0ZXh0fSBhdmFpbGFibGU8L2Rpdj5cbiAgICBgO1xufTtcblxuY29uc3QgX2hlcm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVybycpO1xuY29uc3QgX3JlbGVhc2VfZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWxlYXNlX2RhdGUnKTtcbmNvbnN0IF9tb3ZpZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmllX3RpdGxlJyk7XG5jb25zdCBfbW92aWVQb3N0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW92aWVfcG9zdGVyJyk7XG5jb25zdCBfc3lwbm9zaXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3lwbm9zaXMnKTtcbmNvbnN0IF9nZW5yZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2VucmVzJyk7XG5jb25zdCBfcmV2aWV3cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXZpZXdzX2NvbnRhaW5lcicpO1xuY29uc3QgX3RyYWlsZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRyYWlsZXJzX2NvbnRhaW5lcicpO1xuY29uc3QgX2Nhc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FzdHMnKTtcblxuKCgpID0+IHtcbiAgY29uc3QgaWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcbiAgICAudHJpbSgpXG4gICAgLnNwbGl0KCcvJylbM11cbiAgICAudHJpbSgpO1xuXG4gIGZldGNoKGAvYXBpL21vdmllLyR7aWR9YClcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4obW92aWUgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICByZWxlYXNlX2RhdGUsXG4gICAgICAgIG9yaWdpbmFsX3RpdGxlLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgcG9zdGVyLFxuICAgICAgICBiYWNrZHJvcCxcbiAgICAgICAgb3ZlcnZpZXcsXG4gICAgICAgIGdlbnJlcyxcbiAgICAgICAgY2FzdCxcbiAgICAgICAgcmV2aWV3cyxcbiAgICAgICAgdHJhaWxlcnNcbiAgICAgIH0gPSBtb3ZpZTtcblxuICAgICAgX3JlbGVhc2VfZGF0ZS50ZXh0Q29udGVudCA9ICdSZWxlYXNlZDogJyArIHJlbGVhc2VfZGF0ZTtcbiAgICAgIF9tb3ZpZVRpdGxlLnRleHRDb250ZW50ID0gb3JpZ2luYWxfdGl0bGUgfHwgdGl0bGU7XG5cbiAgICAgIGNvbnN0IGdlbnJlSHRtbCA9IGdlbnJlc1xuICAgICAgICAubWFwKCh2YWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoaW5kZXggKyAxID09PSBnZW5yZXMubGVuZ3RoKSByZXR1cm4gY3JlYXRlR2VucmUodmFsdWUubmFtZSk7XG4gICAgICAgICAgcmV0dXJuIGNyZWF0ZUdlbnJlKHZhbHVlLm5hbWUgKyAnICZyYXF1bzsgJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5qb2luKCcnKVxuICAgICAgICAudHJpbSgpO1xuICAgICAgX2dlbnJlcy5pbm5lckhUTUwgPSAnR2VucmVzOiAnICsgZ2VucmVIdG1sO1xuXG4gICAgICBfaGVyby5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGJhY2tncm91bmQtaW1hZ2U6IHVybCgke2JhY2tkcm9wfSlgKTtcblxuICAgICAgX21vdmllUG9zdGVyLnNldEF0dHJpYnV0ZSgnc3JjJywgcG9zdGVyKTtcbiAgICAgIF9zeXBub3Npcy50ZXh0Q29udGVudCA9IG92ZXJ2aWV3O1xuXG4gICAgICBfcmV2aWV3cy5pbm5lckhUTUwgPSByZXZpZXdzLmxlbmd0aFxuICAgICAgICA/IHJldmlld3NcbiAgICAgICAgICAgIC5tYXAodmFsdWUgPT4gY3JlYXRlUmV2aWV3KHZhbHVlKSlcbiAgICAgICAgICAgIC5qb2luKCcnKVxuICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICA6IGVtcHR5RGF0YSgncmV2aWV3cycpO1xuXG4gICAgICBfdHJhaWxlcnMuaW5uZXJIVE1MID0gdHJhaWxlcnMubGVuZ3RoXG4gICAgICAgID8gdHJhaWxlcnNcbiAgICAgICAgICAgIC5tYXAodmFsdWUgPT4gY3JlYXRlVHJhaWxlcih2YWx1ZSkpXG4gICAgICAgICAgICAuam9pbignJylcbiAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgOiBlbXB0eURhdGEoJ3RyYWlsZXInKTtcblxuICAgICAgY29uc3QgY2FzdE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgY2FzdE5vZGUuaW5uZXJIVE1MID0gY2FzdC5sZW5ndGhcbiAgICAgICAgPyBjYXN0XG4gICAgICAgICAgICAubWFwKGNhc3QgPT4gY3JlYXRlQ2FzdChjYXN0KSlcbiAgICAgICAgICAgIC5qb2luKCcnKVxuICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICA6IGVtcHR5RGF0YSgnY2FzdCcpO1xuXG4gICAgICBfY2FzdC5hcHBlbmRDaGlsZChjYXN0Tm9kZSk7XG4gICAgfSk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==