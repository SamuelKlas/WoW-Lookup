import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Character from "./Character";





ReactDOM.render(
    <div>
        <Character baseUrl = "http://localhost:8080/backend/eu/outland/trillethree" />
    </div>
,
  document.getElementById('root')
);

