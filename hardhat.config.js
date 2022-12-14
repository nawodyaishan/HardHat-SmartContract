/** @type import('hardhat/config').HardhatUserConfig */
require(`@nomiclabs/hardhat-waffle`);
const GOERLI_URL = `https://goerli.infura.io/v3/11c493cddb9a48eea2e2351d58ab0657`;
const PRIVATE_KEY = `6dd5f918660ada299d2c60994df8492ce00ee0d63de2335a6355d496c26c39fa`;

module.exports = {
    solidity: "0.8.17",
    networks: {
        goerli: {
            url: GOERLI_URL,
            accounts: [`0x${PRIVATE_KEY}`]
        }
    }
};
