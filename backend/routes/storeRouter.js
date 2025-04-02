import express from "express";
import supabase from "../utils/supabaseClient";
import prisma from "../utils/prismaClient";
const router = express.Router();

router.post("/store/connect-wallet", async (req, res) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) return console.error("connect wallet error", error);
  const userId = user.id;
  const { walletAddress } = req.body;
  if (!walletAddress) {
    return res.status(404).json({ error: "Missing walletAddress!" });
  }
  try {
    const storeWallet = await prisma.Store.update({
      where: { id: userId },
      data: { walletAddress },
    });
    res.status(200).json({ storeWallet });
  } catch (error) {
    console.error("error connect wallet 500", error);
  }
});
export default router;
