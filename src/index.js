import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import { GameContextProvider } from './contexts/GameContext';
import { BrowserRouter } from 'react-router-dom'; 
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameContextProvider>
      <BrowserRouter>
        <ToastContainer closeButton={false} autoClose={2000} position={"top-right"} />
        <Header />        
        <App />
      </BrowserRouter>
    </GameContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
