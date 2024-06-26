require("dotenv").config()

require("hardhat-contract-sizer")
require("@nomiclabs/hardhat-waffle")
require(`@nomiclabs/hardhat-etherscan`)
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("@openzeppelin/hardhat-upgrades")
require("./tasks")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

function getMnemonic(networkName) {
    if (networkName) {
        const mnemonic = process.env["MNEMONIC_" + networkName.toUpperCase()]
        if (mnemonic && mnemonic !== "") {
            return mnemonic
        }
    }

    const mnemonic = process.env.MNEMONIC
    if (!mnemonic || mnemonic === "") {
        return "test test test test test test test test test test test junk"
    }

    return mnemonic
}

function accounts(chainKey) {
    return { mnemonic: getMnemonic(chainKey) }
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.18",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },

    // solidity: "0.8.4",
    contractSizer: {
        alphaSort: false,
        runOnCompile: true,
        disambiguatePaths: false,
    },

    namedAccounts: {
        deployer: {
            default: 0, // wallet address 0, of the mnemonic in .env
        },
        proxyOwner: {
            default: 1,
        },
    },

    networks: {
        ethereum: {
            url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
            chainId: 1,
            accounts: accounts(),
        },
        bsc: {
            url: "https://bsc-dataseed1.binance.org",
            chainId: 56,
            accounts: accounts(),
        },
        avalanche: {
            url: "https://api.avax.network/ext/bc/C/rpc",
            chainId: 43114,
            accounts: accounts(),
        },
        polygon: {
            url: "https://rpc-mainnet.maticvigil.com",
            chainId: 137,
            accounts: accounts(),
        },
        arbitrum: {
            url: `https://arb1.arbitrum.io/rpc`,
            chainId: 42161,
            accounts: accounts(),
        },
        optimism: {
            url: `https://mainnet.optimism.io`,
            chainId: 10,
            accounts: accounts(),
        },
        fantom: {
            url: `https://rpcapi.fantom.network`,
            chainId: 250,
            accounts: accounts(),
        },

        "ethereum-goerli": {
            url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
            chainId: 5,
            accounts: accounts(),
        },
        "ethereum-sepolia": {
            url: "https://eth-sepolia.g.alchemy.com/v2/r24vXvM3fi53zBdclFRC79MOyMx7w5k-", // public infura endpoint
            chainId: 11155111,
            accounts: accounts(),
        },
        "bsc-testnet": {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            chainId: 97,
            accounts: accounts(),
        },
        fuji: {
            url: `https://api.avax-test.network/ext/bc/C/rpc`,
            chainId: 43113,
            accounts: accounts(),
        },
        mumbai: {
            url: "https://rpc-mumbai.maticvigil.com/",
            chainId: 80001,
            accounts: accounts(),
        },
        "arbitrum-goerli": {
            url: `https://goerli-rollup.arbitrum.io/rpc/`,
            chainId: 421613,
            accounts: accounts(),
        },
        "optimism-goerli": {
            url: `https://goerli.optimism.io/`,
            chainId: 420,
            accounts: accounts(),
        },
        "fantom-testnet": {
            url: `https://rpc.ankr.com/fantom_testnet`,
            chainId: 4002,
            accounts: accounts(),
        },
        "manta-testnet": {
            url: `https://pacific-rpc.testnet.manta.network/http`,
            chainId: 3441005,
            accounts: accounts(),
        },
        "blast-testnet": {
            url: `https://blastl2-sepolia.blastapi.io/d5dbadc2-16a2-4792-a557-9199cf6346e3`,
            chainId: 168587773,
            accounts: accounts(),
        },
    },
    etherscan: {
        apiKey: {
            mainnet: "5KKUIPX5EDA1KX2RU7ZSAKYWMEJWPZQT4X",
            sepolia: "5KKUIPX5EDA1KX2RU7ZSAKYWMEJWPZQT4X",
        },
    },
}
