import Web3 from "web3";
import dotenv from "dotenv";
import abi from "./abi/erc721";
import contractAddress from "./contractAddr/erc721";

dotenv.config();

const getContract = () => {
    // console.log('http://127.0.0.1:7545')
    // const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER));
    return new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
}

const getTonkenId = async (contract) => {
    return await contract.methods.totalSupply().call();
}
const newContract = async (web3, address) => {
    return await new web3.eth.Contract(abi, contractAddress, { from: address, gas: 3000000 });
}
const transferToken = async (to, from, tokenId, web3) => {
    const checkSumTo = web3.utils.toChecksumAddress(to);
    const checkSumFrom = web3.utils.toChecksumAddress(from);
    try {
        const contract = await newContract(web3, checkSumFrom);
        return contract.methods.transferFrom(checkSumFrom, checkSumTo, tokenId).send({ from: checkSumFrom }).on("receipt", (receipt) => {
            if (receipt) {
                return receipt;
            }
            return false;
        });

    } catch (error) {
        console.log(error);
        return false;
    }
}
const ownerOfToken = async (tokenId, address, web3) => {
    //console.log(web3);
    const checkSumAddress = web3.utils.toChecksumAddress(address);
    try {
        const contract = await newContract(web3, checkSumAddress);
        // console.log(contract)
        return await web3.utils.toChecksumAddress(await contract.methods.ownerOf(tokenId).call());
    } catch (error) {
        console.log(error);
        return false;
    }
}
const minting = async (address, web3) => {
    try {

        const checkSumAddress = web3.utils.toChecksumAddress(address);
        try {

            const contract = await newContract(web3, checkSumAddress);
            //console.log(contract);
            const tokenId = await getTonkenId(contract);
            //console.log(tokenId)
            // console.log(contract);
            try {
                const tokenURI = await contract.methods.tokenURI(tokenId).call();
                const newNft = await contract.methods.mintNFT(checkSumAddress, String(tokenURI)).send();
                return tokenURI;

            } catch (error) {
                console.log(error);
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
        /*
        
        */

    } catch (error) {
        console.log(error);
        return false;
    }

}
export { minting, getContract, ownerOfToken, transferToken };