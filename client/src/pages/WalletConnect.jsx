import { useState, useEffect } from "react";
import Web3authClient from "../utils/Web3AuthClient.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

function WalletConnect() {
  const [web3auth, setWeb3auth] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      const auth = await Web3authClient();
      setWeb3auth(auth);
    };
    init();
  }, []);
  const handleLogin = async () => {
    if (!web3auth) return;
    setLoading(true);
    try {
      const provider = await web3auth.connect();
      const tronAddress = await provider.request({
        method: "tron_address",
      });
      console.log("Tron Address:", tronAddress);
      await axios.post("http://localhost:8080/api/store/connect-wallet", {
        walletAddress: tronAddress,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px] shadow-2xl">
        <CardContent className="flex flex-col gap-4 p-6">
          <h1 className="text-xl font-bold text-center">signIn Wallet</h1>
          <Button onClick={handleLogin} disabled={loading}>
            {loading ? "Connecting to server..." : "SignIn Wallet"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
export default WalletConnect;
