import express from "express";
import supabase from "../utils/supabaseClient.js";
import bcrypt from "bcrypt";
import prisma from "../utils/prismaClient.js";
const router = express.Router();

router.post("/signUp", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) return res.status(400).json({ error: error.message });
    const hashedPassword = await bcrypt.hash(password, 10);
    const dataDB = await prisma.Store.create({
      data: {
        id: data.user.id,
        email,
        password: hashedPassword,
      },
    });
    if (error) return res.status(400).json({ error: error.message });
    res.json({ dataDB });
  } catch (error) {
    console.error("error signUp 500", error);
    res.status(500).json({ error: "error signUp 500" });
  }
});
router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ data });
});
export default router;
