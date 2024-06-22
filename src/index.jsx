import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import { MainContextProvider } from './MainContext/MainContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <MainContextProvider>
            <App />
        </MainContextProvider>
    </Router>
);
