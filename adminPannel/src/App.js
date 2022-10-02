import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
 import './scss/style.scss';
import { CookiesProvider } from 'react-cookie';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <CookiesProvider>
          <React.Suspense fallback={loading}>
            <Route path="/admin" name="Home" render={props => <TheLayout {...props} />} />
          </React.Suspense>
        </CookiesProvider>

      </BrowserRouter>
    );
  }
}

export default App;
