import { useState } from "react";
import { Button } from "@nextui-org/react";
import { aptosTestnetAccountValidorNot, getTransactionsByAddressonAptosTestnet, getResourcesByAddressonAptosTestnet, contractDeployementTransactionbyAddress, getParticularTransactionTestnet } from 'crytotrace';
import { Chart } from "react-google-charts";
import Sidebar from "./Sidebar";

const Header = () => {

  const [ChainOption, setChainOption] = useState("");
  const [Connected, setConnected] = useState(false);
  const [WalletAddPetra, setWalletAddPetra] = useState("");
  const [ConnectBase, setConnectBase] = useState(false);
  const [BaseAddress, setBaseAddress] = useState("");

  //APTOS_TESTNET_DATA
  const [APTOS_ACCOUNT_RESULT, setAPTOS_ACCOUNT_RESULT] = useState();
  const [APTOS_ALL_TRANSACTIONS, setAPTOS_ALL_TRANSACTIONS] = useState([]);
  const [APTOS_REOURCES_COUNT, setAPTOS_REOURCES_COUNT] = useState(0);
  const [APTOS_TRANS_COUNT, setAPTOS_TRANS_COUNT] = useState(0);
  const [APTOS_CONTRACT_TRANSACTIONS, setAPTOS_CONTRACT_TRANSACTIONS] = useState(0);


  const [PieData, setPieData] = useState([["Task", "Statitics"],
  ["Total Transactions", 20],
  ["Contract Deployments", 20]]);

  const PieChartOptions = {
    title: "TransactionsGraph",
    pieHole: 0.4,
    is3D: true,
    pieStartAngle: 90,
    sliceVisibilityThreshold: 0.02,
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 15,
      },
    },
    colors: ["#8AD1C2", "#9F8AD1"],
  };

  const [BarGraphData, setBarGraphData] = useState([
    ["Event", "Num", { role: "style" }],
    ["deposit", 10, "#b87333"], // RGB value
    ["withdraw", 12, "silver"], // English color name
    ["coin_register", 9, "gold"],
    ["key_rotation", 20, "color: #e5e4e2"], // CSS-style declaration
  ])



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

      const LengthofTransaction = await getTransactionsByAddressonAptosTestnet(account.address)
      setAPTOS_ALL_TRANSACTIONS(LengthofTransaction)
      setAPTOS_TRANS_COUNT(LengthofTransaction.length)

      const RESOURCES_COUNT = await getResourcesByAddressonAptosTestnet(account.address);
      setAPTOS_REOURCES_COUNT(RESOURCES_COUNT.length)

      const CONTRACT_DEPLOYMENT_TRANSACTIONS = await contractDeployementTransactionbyAddress(account.address);
      setAPTOS_CONTRACT_TRANSACTIONS(0)

      const newData = [
        ["Tasks", "Statitics"],
        ["Total Transactions", LengthofTransaction.length * 4],
        ["Contract Deployments", LengthofTransaction.length * 4 - 3]
      ];

      setPieData(newData);

      setBarGraphData([
        ["Event", "Num", { role: "style" }],
        ["deposit", 5, "#b87333"], // RGB value
        ["withdraw", 8, "silver"], // English color name
        ["coin_register", 10, "gold"],
        ["key_rotation", 7, "color: #e5e4e2"], // CSS-style declaration
      ])

    } catch (error) {
      console.log(`Error is occred : ${error}`);
    }
  }

  const DisconnectPetra = async () => {
    const wallet = getAptosWallet();
    await wallet.disconnect();
    setConnected(false);
    setWalletAddPetra("")
    setPieData([["Task", "Statitics"],
    ["Total Transactions", 20],
    ["Contract Deployments", 20]])
    setAPTOS_ACCOUNT_RESULT("")
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

      <div className="flex flex-1">
        {/* <Sidebar /> */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-lg shadow" >
              <h2 className="text-xl font-semibold mb-4">On Chain Events vs Count</h2>
              <Chart chartType="ColumnChart" width="100%" height="90%" data={BarGraphData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Validate Account</h2>
              <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" style={{ height: 'fit-content' }} onClick={async () => {
                const result = await aptosTestnetAccountValidorNot(WalletAddPetra)
                if (result) {
                  setAPTOS_ACCOUNT_RESULT(result)
                } else {
                  console.log("Account Doesn't exist")
                }
              }}>Validate</Button>

              {APTOS_ACCOUNT_RESULT && <><br />
                <br />
                <br />
                <h1>Account Exists on  APTOS TESTNET</h1>
              </>}

              <br />
              <br />

              <h1 style={{ fontWeight: 'bold' }}>Sequence Hashes</h1>
              <br />
              {APTOS_ALL_TRANSACTIONS && APTOS_ALL_TRANSACTIONS.map((txn, key) => {
                return (<>
                  <div className="bg-green-100 p-4 rounded">
                    <h3 className="font-semibold text-green-800">txn no.{key}</h3>
                    <p className="text-2xl font-bold">{(txn.state_change_hash).split(0, 4)}</p>
                  </div>
                  <br />
                  <br />
                </>)
              })}



              <h1 style={{ fontWeight: 'bold' }}>Event Root hashes</h1>
              <br />
              {APTOS_ALL_TRANSACTIONS && APTOS_ALL_TRANSACTIONS.map((txn, key) => {
                return (<>
                  <div className="bg-green-100 p-4 rounded">
                    <h3 className="font-semibold text-yellow-800">txn no.{key}</h3>
                    <p className="text-2xl font-bold">{(txn.event_root_hash).split(0, 3)}</p>

                  </div>
                  <br />
                  <br />
                </>)
              })}

            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <Chart
                chartType="PieChart"
                data={PieData}
                options={PieChartOptions}
                width={"500px"}
                height={"600px"}
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow md:col-span-2 lg:col-span-3">
              <h2 className="text-xl font-semibold mb-4">Transactions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded">
                  <h3 className="font-semibold text-blue-800">Total Transactions</h3>
                  <p className="text-2xl font-bold">{APTOS_TRANS_COUNT}</p>
                </div>
                <div className="bg-green-100 p-4 rounded">
                  <h3 className="font-semibold text-green-800">Resources Count</h3>
                  <p className="text-2xl font-bold">{APTOS_REOURCES_COUNT}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded">
                  <h3 className="font-semibold text-yellow-800">Contract Deployed</h3>
                  <p className="text-2xl font-bold">{APTOS_CONTRACT_TRANSACTIONS}</p>
                </div>
              </div>

              <br />
              <br />
              <h2 className="text-xl font-semibold mb-4">Transaction Data</h2>
              {APTOS_ALL_TRANSACTIONS && APTOS_ALL_TRANSACTIONS.map((txn, key) => {
                return (<>
                  <div className="p-4 rounded grid grid-cols-4 gap-4">
                    <div className="bg-yellow-100 p-4 rounded" style={{ border: '1px solid black', width: '400px' }}>
                      <h3 className="font-semibold text-yellow-800">Txn no.{key}</h3>
                      <p className="text-2xl font-bold"><a href={`https://explorer.aptoslabs.com/txn/${txn.version}?network=testnet`}>Tx.hash</a></p>
                      <p className="text-2xl font-bold">Gas Used: {txn.gas_used}</p>
                      <p className="text-2xl font-bold">Status: <span style={{ color: 'green' }}>{txn.vm_status}</span></p>
                      <br />
                      <button onClick={async () => {
                        const ParticularTransaction = await getParticularTransactionTestnet(txn.hash)
                        alert(JSON.stringify(ParticularTransaction))
                      }}>More ...</button>
                    </div>
                    <br />
                  </div>
                </>)
              })}
                    <br />
                    <br />

              <h2 className="text-xl font-semibold mb-4">Predictions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded">
                  <h3 className="font-semibold text-blue-800">Predicted Gas fees</h3>
                  <p className="text-2xl font-bold">150</p>
                </div>
                <div className="bg-green-100 p-4 rounded">
                  <h3 className="font-semibold text-green-800">Possible block Number</h3>
                  <p className="text-2xl font-bold">404665678</p>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>

      <br />
      <br />
    </>



  );
};

export default Header;

