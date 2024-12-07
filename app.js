import { ethers } from "https://cdn.jsdelivr.net/npm/ethers/dist/ethers.esm.min.js";

// Dirección RPC de Sepolia (Alchemy)
const ALCHEMY_RPC_URL = "https://eth-sepolia.g.alchemy.com/v2/1vzrJzkbzu-7p51SLrhqgqup4ZB3jGFx";

// Conectar a Sepolia usando el JsonRpcProvider de Alchemy
const provider = new ethers.JsonRpcProvider(ALCHEMY_RPC_URL);

// Direcciones de los contratos
const SIMPLEDEX_ADDRESS = "0x3c4b3d20c12c641913984316183330342801708a";
const TOKENA_ADDRESS = "0x51fd9583ff870b5f196649735706631ea366a110";
const TOKENB_ADDRESS = "0x104aaB6E69aF532D7AFF6f1951d2902f02b6e0Bc";

// ABI del contrato SimpleDEX
const SIMPLEDEX_ABI = [
    {
        "inputs": [
            { "internalType": "address", "name": "_tokenA", "type": "address" },
            { "internalType": "address", "name": "_tokenB", "type": "address" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "provider", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "amountA", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "amountB", "type": "uint256" }
        ],
        "name": "LiquidityAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "provider", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "amountA", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "amountB", "type": "uint256" }
        ],
        "name": "LiquidityRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "swapper", "type": "address" },
            { "indexed": true, "internalType": "address", "name": "fromToken", "type": "address" },
            { "indexed": true, "internalType": "address", "name": "toToken", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "inputAmount", "type": "uint256" },
            { "indexed": false, "internalType": "uint256", "name": "outputAmount", "type": "uint256" }
        ],
        "name": "TokensSwapped",
        "type": "event"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "amountA", "type": "uint256" },
            { "internalType": "uint256", "name": "amountB", "type": "uint256" }
        ],
        "name": "addLiquidity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "amountA", "type": "uint256" },
            { "internalType": "uint256", "name": "amountB", "type": "uint256" }
        ],
        "name": "removeLiquidity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "amountAIn", "type": "uint256" }
        ],
        "name": "swapAforB",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "amountBIn", "type": "uint256" }
        ],
        "name": "swapBforA",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPrice",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// ABI del contrato ERC-20
const TOKENA_ABI = [
    {
        "inputs": [
            { "internalType": "string", "name": "name_", "type": "string" },
            { "internalType": "string", "name": "symbol_", "type": "string" },
            { "internalType": "uint8", "name": "decimals_", "type": "uint8" },
            { "internalType": "uint256", "name": "initialSupply", "type": "uint256" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "spender", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [
            { "internalType": "bool", "name": "", "type": "bool" }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "owner", "type": "address" },
            { "internalType": "address", "name": "spender", "type": "address" }
        ],
        "name": "allowance",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            { "internalType": "string", "name": "", "type": "string" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            { "internalType": "string", "name": "", "type": "string" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            { "internalType": "uint8", "name": "", "type": "uint8" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "account", "type": "address" }
        ],
        "name": "balanceOf",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "recipient", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [
            { "internalType": "bool", "name": "", "type": "bool" }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const TOKENB_ABI = [
        {
           "inputs": [],
           "stateMutability": "nonpayable",
           "type": "constructor"
        },
        {
           "inputs": [
              {
                 "internalType": "address",
                 "name": "spender",
                 "type": "address"
              },
              {
                 "internalType": "uint256",
                 "name": "allowance",
                 "type": "uint256"
              },
              {
                 "internalType": "uint256",
                 "name": "needed",
                 "type": "uint256"
              }
           ],
           "name": "ERC20InsufficientAllowance",
           "type": "error"
        },
        {
           "inputs": [
              {
                 "internalType": "address",
                 "name": "sender",
                 "type": "address"
              },
              {
                 "internalType": "uint256",
                 "name": "balance",
                 "type": "uint256"
              },
              {
                 "internalType": "uint256",
                 "name": "needed",
                 "type": "uint256"
              }
           ],
           "name": "ERC20InsufficientBalance",
           "type": "error"
        },
        {
           "inputs": [
              {
                 "internalType": "address",
                 "name": "approver",
                 "type": "address"
              }
           ],
           "name": "ERC20InvalidApprover",
           "type": "error"
        },
        {
           "inputs": [
              {
                 "internalType": "address",
                 "name": "receiver",
                 "type": "address"
              }
           ],
           "name": "ERC20InvalidReceiver",
           "type": "error"
        },
        {
           "inputs": [
              {
                 "internalType": "address",
                 "name": "sender",
                 "type": "address"
              }
           ],
           "name": "ERC20InvalidSender",
           "type": "error"
        },
        {
           "inputs": [
              {
                 "internalType": "address",
                 "name": "spender",
                 "type": "address"
              }
           ],
           "name": "ERC20InvalidSpender",
           "type": "error"
        },
        {
           "anonymous": false,
           "inputs": [
              {
                 "indexed": true,
                 "internalType": "address",
                 "name": "owner",
                 "type": "address"
              },
              {
                 "indexed": true,
                 "internalType": "address",
                 "name": "spender",
                 "type": "address"
              },
              {
                 "indexed": false,
                 "internalType": "uint256",
                 "name": "value",
                 "type": "uint256"
              }
           ],
           "name": "Approval",
           "type": "event"
        },
        {
           "anonymous": false,
           "inputs": [
              {
                 "indexed": true,
                 "internalType": "address",
                 "name": "from",
                 "type": "address"
              },
              {
                 "indexed": true,
                 "internalType": "address",
                 "name": "to",
                 "type": "address"
              },
              {
                 "indexed": false,
                 "internalType": "uint256",
                 "name": "value",
                 "type": "uint256"
              }
           ],
           "name": "Transfer",
           "type": "event"
        },
        {
           "inputs": [
              {
                 "internalType": "address",
                 "name": "owner",
                 "type": "address"
              },
              {
                 "internalType": "address",
                 "name": "spender",
                 "type": "address"
              }
           ],
           "name": "allowance",
           "outputs": [
              {
                 "internalType": "uint256",
                 "name": "",
                 "type": "uint256"
              }
           ],
           "stateMutability": "view",
           "type": "function"
        },
        {
           "inputs": [
              {
                 "internalType": "address",
                 "name": "spender",
                 "type": "address"
              },
              {
                 "internalType": "uint256",
                 "name": "value",
                 "type": "uint256"
              }
           ],
           "name": "approve",
           "outputs": [
              {
                 "internalType": "bool",
                 "name": "",
                 "type": "bool"
              }
           ],
           "stateMutability": "nonpayable",
           "type": "function"
        },
        {
           "inputs": [
              {
                 "internalType": "address",
                 "name": "account",
                 "type": "address"
              }
           ],
           "name": "balanceOf",
           "outputs": [
              {
                 "internalType": "uint256",
                 "name": "",
                 "type": "uint256"
              }
           ],
           "stateMutability": "view",
           "type": "function"
        },
        {
           "inputs": [],
           "name": "decimals",
           "outputs": [
              {
                 "internalType": "uint8",
                 "name": "",
                 "type": "uint8"
              }
           ],
           "stateMutability": "view",
           "type": "function"
        },
        {
           "inputs": [],
           "name": "name",
           "outputs": [
              {
                 "internalType": "string",
                 "name": "",
                 "type": "string"
              }
           ],
           "stateMutability": "view",
           "type": "function"
        },
        {
           "inputs": [],
           "name": "symbol",
           "outputs": [
              {
                 "internalType": "string",
                 "name": "",
                 "type": "string"
              }
           ],
           "stateMutability": "view",
           "type": "function"
        },
        {
           "inputs": [],
           "name": "totalSupply",
           "outputs": [
              {
                 "internalType": "uint256",
                 "name": "",
                 "type": "uint256"
              }
           ],
           "stateMutability": "view",
           "type": "function"
        },
        {
           "inputs": [
              {
                 "internalType": "address",
                 "name": "to",
                 "type": "address"
              },
              {
                 "internalType": "uint256",
                 "name": "value",
                 "type": "uint256"
              }
           ],
           "name": "transfer",
           "outputs": [
              {
                 "internalType": "bool",
                 "name": "",
                 "type": "bool"
              }
           ],
           "stateMutability": "nonpayable",
           "type": "function"
        },
        {
           "inputs": [
              {
                 "internalType": "address",
                 "name": "from",
                 "type": "address"
              },
              {
                 "internalType": "address",
                 "name": "to",
                 "type": "address"
              },
              {
                 "internalType": "uint256",
                 "name": "value",
                 "type": "uint256"
              }
           ],
           "name": "transferFrom",
           "outputs": [
              {
                 "internalType": "bool",
                 "name": "",
                 "type": "bool"
              }
           ],
           "stateMutability": "nonpayable",
           "type": "function"
        }
     ];

// Variables globales

let signer;
let walletAddress;
let simpleDEXContract;
let tokenAContract;
let tokenBContract;



document.addEventListener('DOMContentLoaded', function () {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const btnConnect = document.getElementById('btnConnect');
    const btnDisconnect = document.getElementById('btnDisconnect');
    const walletInfo = document.getElementById('wallet-info');
    const statusText = document.getElementById('status-text');
    const walletAddress = document.getElementById('wallet-address');
    const ethBalance = document.getElementById('eth-balance');
    const networkName = document.getElementById('network-name');

    // Conectar la wallet de MetaMask
    btnConnect.addEventListener('click', async function () {
        await connectWallet();
    });

    // Desconectar la wallet
    btnDisconnect.addEventListener('click', function () {
        disconnectWallet();
    });

    // Función para conectar la wallet
    async function connectWallet() {
        if (window.ethereum) {
            try {
                // Solicitar acceso a la wallet
                await ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await provider.listAccounts();
                const balance = await provider.getBalance(accounts[0]);
                const network = await provider.getNetwork();

                // Mostrar información de la wallet
                statusText.innerText = 'Conectado';
                walletAddress.innerText = accounts[0];
                ethBalance.innerText = ethers.utils.formatEther(balance) + ' ETH';
                networkName.innerText = network.name === 'sepolia' ? 'Sepolia' : 'Mainnet';

                // Mostrar interfaz de funciones
                walletInfo.classList.remove('hidden');
                btnConnect.classList.add('hidden');
                btnDisconnect.classList.remove('hidden');
            } catch (error) {
                console.error('Error al conectar wallet:', error);
            }
        } else {
            alert('MetaMask no está disponible');
        }
    }

    // Función para desconectar la wallet
    function disconnectWallet() {
        // Aquí no hay una forma oficial de desconectar la wallet en MetaMask, 
        // por lo que simplemente ocultamos la información y mostramos el botón de conectar.
        statusText.innerText = 'Desconectado';
        walletAddress.innerText = '-';
        ethBalance.innerText = '-';
        networkName.innerText = '-';

        walletInfo.classList.add('hidden');
        btnConnect.classList.remove('hidden');
        btnDisconnect.classList.add('hidden');
    }
// Interactuar con contratos
async function interactWithDEX(action, ...params) {
    try {
      const dexContract = new ethers.Contract(SIMPLEDEX_ADDRESS, SIMPLEDEX_ABI, signer);
      const tx = await dexContract[action](...params);
      await tx.wait();
      alert(`${action} ejecutado con éxito`);
    } catch (error) {
      console.error(`Error en ${action}:`, error);
    }
  }

// Agregar liquidez
async function addLiquidity() {
    const amountA = ethers.parseUnits(document.getElementById("addLiquidityTokenA").value, 18);
    const amountB = ethers.parseUnits(document.getElementById("addLiquidityTokenB").value, 18);

    try {
        await tokenAContract.approve(SIMPLEDEX_ADDRESS, amountA);
        await tokenBContract.approve(SIMPLEDEX_ADDRESS, amountB);
        await simpleDEXContract.addLiquidity(amountA, amountB);
        alert("Liquidez añadida con éxito.");
    } catch (error) {
        console.error("Error al agregar liquidez:", error);
        alert("Hubo un error al agregar liquidez.");
    }
}

// Retirar liquidez
async function removeLiquidity() {
    const amountA = ethers.parseUnits(document.getElementById("removeLiquidityTokenA").value, 18);
    const amountB = ethers.parseUnits(document.getElementById("removeLiquidityTokenB").value, 18);

    try {
        await simpleDEXContract.removeLiquidity(amountA, amountB);
        alert("Liquidez retirada con éxito.");
    } catch (error) {
        console.error("Error al retirar liquidez:", error);
        alert("Hubo un error al retirar liquidez.");
    }
}

// Intercambiar tokens
async function swapTokens() {
    const amountA = ethers.parseUnits(document.getElementById("swapTokenA").value, 18);
    const amountB = ethers.parseUnits(document.getElementById("swapTokenB").value, 18);
    const tokenToSwap = document.getElementById("tokenToSwap").value;

    try {
        if (tokenToSwap === "A") {
            await tokenAContract.approve(SIMPLEDEX_ADDRESS, amountA);
            await simpleDEXContract.swapAforB(amountA);
            alert("Intercambio realizado con éxito.");
        } else {
            await tokenBContract.approve(SIMPLEDEX_ADDRESS, amountB);
            await simpleDEXContract.swapBforA(amountB);
            alert("Intercambio realizado con éxito.");
        }
    } catch (error) {
        console.error("Error al intercambiar tokens:", error);
        alert("Hubo un error al intercambiar tokens.");
    }
}
if (parseFloat(amountA) <= 0 || parseFloat(amountB) <= 0) {
    alert("Las cantidades deben ser mayores que cero.");
    return;
}
const tokenDecimals = 18;  // O el valor correcto para cada token
const amountInWei = ethers.utils.parseUnits(amount, tokenDecimals);

// Obtener precio del token
async function getTokenPrice() {
    try {
        const price = await simpleDEXContract.getPrice();
        document.getElementById("priceResult").textContent = `Precio: ${ethers.formatUnits(price, 18)}`;
    } catch (error) {
        console.error("Error al obtener el precio:", error);
        alert("Hubo un error al obtener el precio.");
    }
}

// Eventos de los botones
document.getElementById("btnConnect").addEventListener("click", connectWallet);
document.getElementById("btnDisconnect").addEventListener("click", disconnectWallet);
document.getElementById("btnAddLiquidity").addEventListener("click", addLiquidity);
document.getElementById("btnRemoveLiquidity").addEventListener("click", removeLiquidity);
document.getElementById("btnSwap").addEventListener("click", swapTokens);
document.getElementById("btnGetPrice").addEventListener("click", getTokenPrice);
})