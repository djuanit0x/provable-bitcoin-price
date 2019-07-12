module.exports = {
  networks: {
    development: {
      host: process.env.DEVELOPMENT_HOST,
      port: 8545,
      network_id: "*", // Match any network id
      gas: 4700000
    },
  }
};
