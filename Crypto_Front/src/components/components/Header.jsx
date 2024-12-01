import { useState } from "react";
import { Button } from "@nextui-org/react";
import {getAllTransactionsByAddress} from 'crytotrace'

const Header = () => {

  const [ChainOption, setChainOption] = useState("");
  const [Connected, setConnected] = useState(false);
  const [WalletAddPetra, setWalletAddPetra] = useState("");
  const [ConnectBase, setConnectBase] = useState(false);
  const [BaseAddress, setBaseAddress] = useState("");


  const showSelectedoption = async (e) => {
    setChainOption(e.target.value);
  }

  const getAptosWallet = () => {
    if ('aptos' in window) {
      return window.aptos;
    } else {
      window.open('https://petra.app/', `_blank`);
    }
  };

  const connectWalletToPetra = async () => {
    const wallet = getAptosWallet();
    try {
      const response = await wallet.connect();
      console.log(response);
      const account = await wallet.account();
      setConnected(true)
      setWalletAddPetra(account.address)
    } catch (error) {
      console.log(`Error is occred : ${error}`);
    }
  }

  const DisconnectPetra = async () => {
    const wallet = getAptosWallet();
    await wallet.disconnect();
    setConnected(false);
    setWalletAddPetra("")
  }

  const connecttoBase = async () => {
    try {

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setConnectBase(true)
      setBaseAddress(account)
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }

  }

  const disconnectBase = async () => {
    setConnectBase(false)
    setBaseAddress("")
  }

  return (
    <>

      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">CryptoTrace</h1>

        <select style={{ backgroundColor: 'black', color: 'white', marginLeft: 'auto', marginRight: '70px' }} value={ChainOption} onChange={showSelectedoption}>
          <option>Select Chain</option>
          <option>Base-Sephoila</option>
          <option>Aptos-Testnet</option>
          <option>Aptos-Devnet</option>
        </select>

        {ChainOption == "Base-Sephoila" && <>
          <Button color="secondary" onClick={connecttoBase}>{ConnectBase ? <p>{BaseAddress}</p> : <>Connect Base</>}</Button>
          {ConnectBase && <Button onClick={disconnectBase}>Disconnect</Button>}
        </>}

        {ChainOption == "Aptos-Testnet" && <>
          <Button color="secondary" onClick={connectWalletToPetra}>{Connected ? <p>{WalletAddPetra}</p> : <>Connect Petra</>}</Button>
          {Connected && <Button onClick={DisconnectPetra}>Disconnect</Button>}
        </>}

        {ChainOption == "Aptos-Devnet" && <>
          <Button color="secondary" onClick={connectWalletToPetra}>{Connected ? <p>{WalletAddPetra}</p> : <>Connect Petra</>}</Button>

        </>}

      </header>
    </>

  );
};

export default Header;

