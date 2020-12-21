import petion from "./petion";
import express from "express";

const router = express.Router();

router.use('/petion', petion);

export default router;