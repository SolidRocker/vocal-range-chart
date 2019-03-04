import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ChartManager from './components/chart/chart';
import CreateVocalist from './components/createVocalist/createVocalist';
import FilterVocalist from './components/filterVocalist/filterVocalist';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <header className="app-header">
            <h2>
              VOCAL RANGE CHART
            </h2>
            <div className="app-subtitle">
              Charting your favorite vocalists by their vocal range!
            </div>
          </header>
        </div>

        <div className="app-body">
          <ChartManager/>
          <FilterVocalist/>
        </div>
      </Provider>
    );
  }
}
export default App;
