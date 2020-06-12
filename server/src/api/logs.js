const express = require("express");

const router = express.Router();

const LogEntry = require("../models/LogEntry");

const { API_KEY } = process.env;

router.get("/", async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (req.get("X-API-KEY") !== API_KEY) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const logentry = new LogEntry(req.body);
    const createdEntry = await logentry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
