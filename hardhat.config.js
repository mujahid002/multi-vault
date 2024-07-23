  require("@nomiclabs/hardhat-ethers");
  require("dotenv").config();
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
  const { task } = require("hardhat/config");
  const {
    API_URL_GOERLI,
    API_URL_MUMBAI,
    API_URL_ARBITRUM,
    API_URL_OPTIMISM,
    PRIVATE_KEY,
  } = process.env;

  task(
    "account",
    "returns nonce and balance for specified address on multiple networks"
  )
    .addParam("address")
    .setAction(async (address) => {
      const web3Sepolia = createAlchemyWeb3(API_URL_GOERLI);
      const web3OptimismSepolia = createAlchemyWeb3(API_URL_MUMBAI);
      const web3BaseSepolia = createAlchemyWeb3(API_URL_ARBITRUM);
      const web3CeloAlfajores = createAlchemyWeb3(API_URL_OPTIMISM);
      const web3ModeSepolia = createAlchemyWeb3(API_URL_OPTIMISM);

      const networkIDArr = [
        "Ethereum Goerli:",
        "Polygon  Mumbai:",
        "Arbitrum Rinkby:",
        "Optimism Goerli:",
      ];
      const providerArr = [web3Goerli, web3Mumbai, web3Arb, web3Opt];
      const resultArr = [];

      for (let i = 0; i < providerArr.length; i++) {
        const nonce = await providerArr[i].eth.getTransactionCount(
          address.address,
          "latest"
        );
        const balance = await providerArr[i].eth.getBalance(address.address);
        resultArr.push([
          networkIDArr[i],
          nonce,
          parseFloat(providerArr[i].utils.fromWei(balance, "ether")).toFixed(2) +
            "ETH",
        ]);
      }
      resultArr.unshift(["  |NETWORK|   |NONCE|   |BALANCE|  "]);
      console.log(resultArr);
    });

  module.exports = {
    solidity: "0.8.23",
    networks: {
      hardhat: {},
      sepolia: {
        url: API_URL_SEPOLIA,
        accounts: [`0x${PRIVATE_KEY}`],
      },
      optimismSepolia: {
        url: API_URL_OPTIMISM_SEPOLIA,
        accounts: [`0x${PRIVATE_KEY}`],
      },
      baseSepolia: {
        url: API_URL_BASE_SEPOLIA,
        accounts: [`0x${PRIVATE_KEY}`],
      },
      celoAlfajores: {
        url: API_URL_CELO_ALFAJORES,
        accounts: [`0x${PRIVATE_KEY}`],
      },
      modeSepolia: {
        url: API_URL_MODE_SEPOLIA,
        accounts: [`0x${PRIVATE_KEY}`],
      },
    },
  };
