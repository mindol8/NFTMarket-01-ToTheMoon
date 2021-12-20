import IPFS from 'ipfs-api';

const ipfsHashValue = null;

const ipfs = new IPFS({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
});

const fileFormatingIpfs = async (file) => {
    try {
        let imgHash = "";
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = async () => {
            const buffer = Buffer.from(reader.result);
            return imgHash = await ipfs.add(buffer)[0];
        };
        await onload();
        return imgHash;
    } catch (error) {
        return false;
    }

};


export { ipfs, fileFormatingIpfs };