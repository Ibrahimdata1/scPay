import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";

const clientId = import.meta.env.VITE_WEB3AUTH_CLIENT_ID;
async function Web3AuthClient() {
  const web3auth = new Web3Auth({
    clientId,
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.OTHER,
      chainId: "0x2b6653dc",
      rpcTarget: "https://api.trongrid.io",
      displayName: "Tron Mainnet",
      blockExplorer: "https://tronscan.org",
      ticker: "TRX",
      ticketName: "Tronix",
    },
  });
  await web3auth.initModal();
  return web3auth;
}
export default Web3AuthClient;
