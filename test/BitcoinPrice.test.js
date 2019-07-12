const BitcoinPrice = artifacts.require("BitcoinPrice");
const sleep = require("./helpers/sleep");

const getEventLogByTopic = async eventTopic => {
    try {
        let logEventFromTopic;

        do {
            let logs = await web3.eth.getPastLogs({
                fromBlock: 0,
                topic: [eventTopic]
            });

            logEventFromTopic = logs.find(log => {
                const {topics} = log;
                const [topic] = topics;
                return topic === eventTopic;
            });
            await sleep(1000);
        } while (logEventFromTopic === undefined);

        return logEventFromTopic;
    } catch (err) {
        console.error(err);
    }
};

contract("BitcoinPrice", accounts => {
    let bitcoinPrice;
    const newProvableResultEventTopic = web3.utils.sha3("LogNewProvableResult(string)");

    before(async () => {
        bitcoinPrice = await BitcoinPrice.new({from: accounts[0]});
    });

    it("should retrieve the bitcoin price in USD", async () => {
        await bitcoinPrice.retrieveBitcoinPrice({from: accounts[0]});

        const newProvableResultEventLog = await getEventLogByTopic(newProvableResultEventTopic);
        const bitcoinPriceFromCoinGecko = web3.utils.hexToUtf8(newProvableResultEventLog.data);

        console.log(`Bitcoin Price: $${bitcoinPriceFromCoinGecko}`);
    });
});
