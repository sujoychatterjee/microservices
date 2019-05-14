// import React from 'react';
// import ReactDOM from 'react-dom';

// import App from './components/appComponent';

// ReactDOM.render(<App />, document.getElementById("app"));


import * as angular from 'angular';
import './angular/modules/appModule';

angular.bootstrap(document.getElementById('root'), ['app'], {
  strictDi: true,
});