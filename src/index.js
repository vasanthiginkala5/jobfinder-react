import React from "react";
import ReactDOM, { createRoot } from 'react-dom/client';
import App from './App';
import { render } from "@testing-library/react";
import './index.css'

createRoot(document.getElementById('root'))

render(<App/>)