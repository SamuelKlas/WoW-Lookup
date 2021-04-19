import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Character from "./Character";

import 'semantic-ui-css/semantic.min.css'


ReactDOM.render(
    <div>
        <Character baseUrl = "http://localhost:8080/backend/eu/drakthul/rosti" />
    </div>
,
  document.getElementById('root')
);

