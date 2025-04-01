import express from "express";
import prisma from "../utils/prismaClient.js";
import tronweb from "../utils/tronWeb.js";
const router = express.Router();

router.post("/payment/create", async (req, res) => {
  const { storeId, amount, symbol, txHash } = req.body;
  if (!storeId || !amount || !symbol || !txHash) {
    return res.status(404).json({ error: "Missing Required Fields" });
  }
  try {
    const payment = await prisma.payment.create({
      data: {
        storeId,
        amount,
        symbol,
        txHash,
        status: "pending",
      },
    });
    res.status(201).json({ payment });
  } catch (error) {
    console.error("error payment 500", error);
    res.status(500).json({ error });
  }
});
router.get("/payment/:txHash", async (req, res) => {
  const { txHash } = req.params;
  try {
    const txInfo = await tronweb.trx.getTransactionInfo(txHash);
    if (!txInfo || !txInfo.receipt) {
      return res.status(400).json({ status: "pending", txHash });
    }
    const isSuccess = txInfo.receipt.result === "SUCCESS";
    return res.json({
      txHash,
      status: isSuccess ? "Confirmed" : "Failed",
      confirmedAt: isSuccess ? new Date(txInfo.blockTimeStamp) : null,
    });
  } catch (error) {
    console.error("error get payment 500", error.message);
    return res
      .status(500)
      .json({ error: "failed 500 to checked transaction!" });
  }
});
router.patch("/payment/:txHash", async (req, res) => {
  const { txHash } = req.params;
  try {
    const txInfo = await tronweb.trx.getTransactionInfo(txHash);
    if (!txInfo || !txInfo.receipt) {
      return res.status(404).json({ error: "no txHash found!" });
    }
    const isSucces = txInfo.receipt.result === "SUCCESS";
    const updated = await prisma.payment.update({
      where: { txHash },
      data: {
        status: isSucces ? "Confirmed" : "Failed",
        confirmedAt: isSucces ? new Date(txInfo.blockTimeStamp) : null,
      },
    });
    return res.json({
      message: `liveStatus:${updated.status}`,
      payment: updated,
    });
  } catch (error) {
    console.error("Updated payment error 500", error.message);
    return res.status(500).json({ error: "Updated payment failed 500" });
  }
});

export default router;
