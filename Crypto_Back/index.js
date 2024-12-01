const axios = require('axios');
const BASE_SEPHOLIA_API_KEY="EUEGRKWQCQYT42C5IEQ67Z3JQRR1D4SJPT"

// ----------------------------------------------------------------------------------------
// 1. Aptos Testnet 
async function aptosTestnetAccountValidorNot(address) {
    try {
        const result = await axios.get(`https://api.testnet.aptoslabs.com/v1/accounts/${address}`);
        return result.data;
    } catch (err) {
        console.log(`Error:${err}`)
    }
}

async function getTransactionsByAddressonAptosTestnet(address) {
    try {
        const result = await axios.get(`https://api.testnet.aptoslabs.com/v1/accounts/${address}/transactions`);
        return result.data;
    } catch (err) {
        console.log(`Error:${err}`)
    }
}

async function getResourcesByAddressonAptosTestnet(address) {
    try {
        const result = await axios.get(`https://api.testnet.aptoslabs.com/v1/accounts/${address}/resources`);
        return result.data;
    } catch (err) {
        console.log(`Error:${err}`)
    }
}

async function contractDeployementTransactionbyAddress(address) {
    try {
        const result = await axios.get(`https://api.testnet.aptoslabs.com/v1/accounts/${address}//modules`);
        return result.data.length;
    } catch (err) {
        console.log(`Error:${err}`)
    }
}

async function getParticularEvent(address,eventnum) {
    try {
        const result = await axios.get(`https://api.testnet.aptoslabs.com/v1/accounts/${address}/events/${eventnum}`);
        return result.data;
    } catch (err) {
        console.log(`Error:${err}`)
    }
}

async function getParticularTransactionTestnet(tx_hash) {
    try {
        const result = await axios.get(`https://fullnode.testnet.aptoslabs.com/v1/transactions/by_hash/${tx_hash}`);
        return result.data;
    } catch (err) {
        console.log(`Error:${err}`)
    }
}

// ----------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------
//2. Aptos-Devnet
async function aptosDevnetAccountValidorNot(address) {
    try {
        const result = await axios.get(`https://api.devnet.aptoslabs.com/v1/accounts/${address}`);
        return result.data;
    } catch (err) {
        console.log(`Error:${err}`)
    }
}

async function getTransactionsByAddressonAptosDevnet(address) {
    try {
        const result = await axios.get(`https://api.devnet.aptoslabs.com/v1/accounts/${address}/transactions`);
        return result.data;
    } catch (err) {
        console.log(`Error:${err}`)
    }
}

async function getResourcesByAddressonAptosDevnet(address) {
    try {
        const result = await axios.get(`https://api.devnet.aptoslabs.com/v1/accounts/${address}/resources`);
        return result.data;
    } catch (err) {
        console.log(`Error:${err}`)
    }
}

async function contractDeployementTransactionbyAddress(address) {
    try {
        const result = await axios.get(`https://api.devnet.aptoslabs.com/v1/accounts/${address}//modules`);
        return result.data.length;
    } catch (err) {
        console.log(`Error:${err}`)
    }
}

async function getParticularEvent(address,eventnum) {
    try {
        const result = await axios.get(`https://api.devnet.aptoslabs.com/v1/accounts/${address}/events/${eventnum}`);
        return result.data;
    } catch (err) {
        console.log(`Error:${err}`)
    }
}

async function getParticularTransactionDevnet(tx_hash) {
    try {
        const result = await axios.get(`https://fullnode.testnet.aptoslabs.com/v1/transactions/by_hash/${tx_hash}`);
        return result.data;
    } catch (err) {
        console.log(`Error:${err}`)
    }
}
// ----------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------

// 3.Base-Sepholia

async function getNumberOfDeployedContractsByAddress(Address) {

    let numberOfDeployedContracts = 0;

    const getTransactionCountByAddress = await axios.get(`https://api-sepolia.basescan.org/api?module=proxy&action=eth_getTransactionCount&address=${Address}&tag=latest&apikey=${BASE_SEPHOLIA_API_KEY}`)

    const numberOfTransactions = parseInt(getTransactionCountByAddress.data['result'], 16)

    await axios.get(`https://api-sepolia.basescan.org/api?module=account&action=txlist&address=${Address}&startblock=0&endblock=latest&page=1&offset=${numberOfTransactions + 1}&sort=asc&apikey=${BASE_SEPHOLIA_API_KEY}`).then((res) => {

        for (let i = 0; i <= numberOfTransactions; i++) {
            if (res.data['result'][i]['to'] === "") {
                numberOfDeployedContracts++;
            }
        }

    }).catch((err) => {
        console.log(`Error While Making API Call : ${err}`);
    })

    return numberOfDeployedContracts;
}

async function getContractDeploymentTransactions(Address) {

    let contractTransactionObjectArray = []

    const getTransactionCountByAddress = await axios.get(`https://api-sepolia.basescan.org/api?module=proxy&action=eth_getTransactionCount&address=${Address}&tag=latest&apikey=${BASE_SEPHOLIA_API_KEY}`)

    const numberOfTransactions = parseInt(getTransactionCountByAddress.data['result'], 16)

    await axios.get(`https://api-sepolia.basescan.org/api?module=account&action=txlist&address=${Address}&startblock=0&endblock=latest&page=1&offset=${numberOfTransactions + 1}&sort=asc&apikey=${BASE_SEPHOLIA_API_KEY}`).then((res) => {

        for (let i = 0; i <= numberOfTransactions; i++) {
            if (res.data['result'][i]['to'] === "") {
                contractTransactionObjectArray.push(res.data['result'][i])
            }
    }

    }).catch((err) => {
        console.log(`Error While Making API Call : ${err}`);
    })

    return contractTransactionObjectArray;
}

async function getNumberofTransactionByAddress(Address) {

    const getTransactionCountByAddress = await axios.get(`https://api-sepolia.basescan.org/api?module=proxy&action=eth_getTransactionCount&address=${Address}&tag=latest&apikey=${BASE_SEPHOLIA_API_KEY}`)

    const numberOfTransactions = parseInt(getTransactionCountByAddress.data['result'], 16)

    return numberOfTransactions + 1;
}

async function getNumberOfInternalTransactions(Address) {

    const internalTransactionCount = await axios.get(`https://api-sepolia.basescan.org/api?module=account&action=txlistinternal&address=${Address}&startblock=0&endblock=latest&page=1&offset=10000&sort=asc&apikey=${BASE_SEPHOLIA_API_KEY}`)

    return internalTransactionCount.data["result"].length;

}

async function makeGivenContractVerified(contractAddress, sourceCode, codeformat, contractname, compilerversion) {

    const apikey = `${BASE_SEPHOLIA_API_KEY}`;
    const contractaddress = contractAddress;
    const optimizationUsed = 0;
    const constructorArguements = "";
    const evmversion = "";
    const licenseType = 1;

    const data = {
        apikey: apikey,
        module: 'contract',
        action: 'verifysourcecode',
        contractaddress: contractaddress,
        sourceCode: sourceCode,
        codeformat: codeformat,
        contractname: contractname,
        compilerversion: compilerversion,
        optimizationUsed: optimizationUsed,
        runs: 200,
        constructorArguements: constructorArguements,
        evmversion: evmversion,
        licenseType: licenseType,
    };


    axios.post('https://api-sepolia.basescan.org/api', new URLSearchParams(data).toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => {
            const contentType = response.headers['content-type'];
            if (contentType && contentType.includes('application/json')) {
                return response.data;
            } else {
                throw new Error('Received non-JSON response');
            }
        })
        .then(result => {
            if (result.status === '1') {
                console.log(result);
                return result ; 
            } else {
                console.log(`${result.status}; ${result.message}; ${result.result}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function checkContractVerifcation(guid) {
    
    const apikey =`${BASE_SEPHOLIA_API_KEY}`;

    const params = {
        apikey: apikey,
        guid: guid,
        module: 'contract',
        action: 'checkverifystatus'
    };
    

    axios.get('https://api-sepolia.basescan.org/api', { params })
        .then(response => {
            const result = response.data;
            console.log("status : " + result.status);   
            console.log("message : " + result.message);
            console.log("result : " + result.result);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('error');
        });
    
}

async function calcuateAverageUsedGasFees(Address) {

    let allGasUsedDataInt=0;
    
    const getTransactionCountByAddress = await axios.get(`https://api-sepolia.basescan.org/api?module=proxy&action=eth_getTransactionCount&address=${Address}&tag=latest&apikey=${BASE_SEPHOLIA_API_KEY}`)

    const numberOfTransactions = parseInt(getTransactionCountByAddress.data['result'], 16)

    await axios.get(`https://api-sepolia.basescan.org/api?module=account&action=txlist&address=${Address}&startblock=0&endblock=latest&page=1&offset=${numberOfTransactions + 1}&sort=asc&apikey=${BASE_SEPHOLIA_API_KEY}`).then((res) => {

        for (let i = 0; i <= numberOfTransactions; i++) {
            allGasUsedDataInt=allGasUsedDataInt+parseInt(res.data['result'][i]['gasUsed']);
        }

    }).catch((err) => {
        console.log(`Error While Making API Call : ${err}`);
    })

    const avgGasUsed=parseFloat(allGasUsedDataInt/parseInt(numberOfTransactions+1));
    return avgGasUsed ;
}

async function getAllTransactionsByAddress(Address){

    let allTransactionsdata=[]

    const getTransactionCountByAddress = await axios.get(`https://api-sepolia.basescan.org/api?module=proxy&action=eth_getTransactionCount&address=${Address}&tag=latest&apikey=${BASE_SEPHOLIA_API_KEY}`)

    const numberOfTransactions = parseInt(getTransactionCountByAddress.data['result'], 16)

    await axios.get(`https://api-sepolia.basescan.org/api?module=account&action=txlist&address=${Address}&startblock=0&endblock=latest&page=1&offset=${numberOfTransactions + 1}&sort=asc&apikey=${BASE_SEPHOLIA_API_KEY}`).then((res) => {

        for (let i = 0; i <= numberOfTransactions; i++) {
            allTransactionsdata.push(res.data['result'][i])
        }

    }).catch((err) => {
        console.log(`Error While Making API Call : ${err}`);
    })

    return allTransactionsdata;

}

async function getParticularTransactionReceipt(TxHash){

    let result=[];

    await axios.get(`https://api-sepolia.basescan.org/api?module=proxy&action=eth_getTransactionReceipt&txhash=${TxHash}&apikey=${BASE_SEPHOLIA_API_KEY}`).then((res)=>{
       result.push(res.data);
   }).catch((err)=>{
    console.log(`Error While Making Request : ${err}`);
   })

   return result;
}


async function getLastestMinedBlock() {

    let parsedIntergerBlockNumber=0 ;

    await axios.get(`https://api-sepolia.basescan.org/api?module=proxy&action=eth_blockNumber&apikey=${BASE_SEPHOLIA_API_KEY}`).then((res)=>{
        parsedIntergerBlockNumber=parseInt(res.data['result'],16)
    }).catch((err)=>{
        console.log(`Error While Making Request : ${err}`);
    })

    return parsedIntergerBlockNumber ; 

}
// ----------------------------------------------------------------------------------------

module.exports={
    aptosTestnetAccountValidorNot,
    getTransactionsByAddressonAptosTestnet,
    getResourcesByAddressonAptosTestnet,
    contractDeployementTransactionbyAddress,
    getParticularEvent,
    getParticularTransactionTestnet,
    aptosDevnetAccountValidorNot,
    getTransactionsByAddressonAptosDevnet,
    getParticularTransactionDevnet,
    getNumberOfDeployedContractsByAddress,
    getContractDeploymentTransactions,
    getNumberofTransactionByAddress,
    getNumberOfInternalTransactions,
    makeGivenContractVerified,
    checkContractVerifcation,
    calcuateAverageUsedGasFees,
    getAllTransactionsByAddress,
    getParticularTransactionReceipt,
    getLastestMinedBlock
}