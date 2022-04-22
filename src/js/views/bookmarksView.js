import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // Since the data is in a array we can loop through it to display each of the mark up html
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
