import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import './index.css'
import { Switch , Route } from "wouter";
import notFound from './notFound.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <div>
          <Switch>
            <Route path="/" component={App} ></Route>
            <Route component={notFound} ></Route>
          </Switch>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
