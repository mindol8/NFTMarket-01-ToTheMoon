import Web3 from "web3";
const pay = async (_to, _from, price) => {

    if (window.ethereum) {
        try {
            const sendEth = Number(Web3.utils.toWei(String(price), "ether")).toString(16);
            const params = [
                {
                    from: _from,
                    to: _to,
                    gas: (21000).toString(16),
                    gasPrice: "0x9184e72a000",
                    value: sendEth,
                },
            ];
            const transactionHash = await window.ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params,
                });
            //console.log(transactionHash);
            let receipt = await window.ethereum
                .request({
                    method: 'eth_getTransactionReceipt',
                    params: [transactionHash]
                })
            while (!receipt) {
                setTimeout(async () => {
                    receipt = await window.ethereum
                        .request({
                            method: 'eth_getTransactionReceipt',
                            params: [transactionHash]
                        })
                }, 1000);
            }
            return receipt;
        } catch (err) {
            console.log(err);
            return false;
        }

    }
    return false;
}

export default pay;