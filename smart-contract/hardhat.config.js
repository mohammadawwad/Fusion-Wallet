

require('@nomiclabs/hardhat-waffle');

module.exports = {
    solidity: '0.8.0',
    networks: {
        ropsten: {
            // http key from alchemy
            url: 'https://eth-ropsten.alchemyapi.io/v2/ZKnsLBGe65HanKqKw0KuRC1NWVn9QB1z',
            accounts: ['f6b28694a926e4ac168dfe1043f982e0c4dbbfd49d9f8fe591abd4576c87fb86']
        }
    }
}