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
export { minting, getContract };