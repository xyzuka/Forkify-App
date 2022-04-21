import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again!';
  _message = '';

  _generateMarkup() {
    console.log(this._data);

    // Since the data is in a array we can loop through it to display each of the mark up html
    return this._data
      .map((result) => previewView.render(result, false))
      .join('');
  }
}

export default new ResultsView();
