import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThirdwebProvider } from "thirdweb/react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { NextUIProvider } from '@nextui-org/react'

const wallets = [new PetraWallet()];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
        <ThirdwebProvider >
          <GoogleOAuthProvider clientId='913620313468-sl42mg4tcbpqu47nnag5l885so208kj4.apps.googleusercontent.com'>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </GoogleOAuthProvider>
        </ThirdwebProvider>
      </AptosWalletAdapterProvider>
    </NextUIProvider>
  </React.StrictMode>
)
