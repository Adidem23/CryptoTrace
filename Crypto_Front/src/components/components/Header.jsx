import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from 'thirdweb/react';
import { useState } from "react";

const Header = () => {

  const [ChainOption, setChainOption] = useState("");

  const THIRDWEB_CLIENT = createThirdwebClient({
    clientId: "5fb26c268ed64fb73d9fb6010411dca9",
  });

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
      console.log(account);
    } catch (error) {
      console.log(`Error is occred : ${error}`);
    }
  }

  return (
    <>

      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">CryptoTrace</h1>

        <select style={{ backgroundColor: 'black', color: 'white', marginLeft: 'auto', marginRight: '70px' }} value={ChainOption} onChange={showSelectedoption}>
          <option>Base-Mainnet</option>
          <option>Base-Sephoila</option>
          <option>Aptos-Mainnet</option>
          <option>Aptos-Testnet</option>
          <option>Aptos-Devnet</option>
        </select>

        <ConnectButton client={THIRDWEB_CLIENT} />

        {/* <button onClick={connectWalletToPetra}>Connect petra</button> */}

      </header>
    </>

  );
};

export default Header;

