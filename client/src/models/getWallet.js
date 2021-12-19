
const getMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            //console.log(accounts);
            return accounts[0];
        } catch (error) {
            return false;
        }
    }
    return false;

};

const getKaikas = async () => {
    if (typeof window.klaytn !== "undefined") {
        try {
            const accounts = await window.klaytn.enable()

            return accounts[0];
        } catch (error) {
            return false;
        }
    }
    return false;
};



export { getKaikas, getMetaMask }