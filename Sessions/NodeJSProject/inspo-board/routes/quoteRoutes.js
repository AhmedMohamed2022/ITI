const express = require("express");
const router = express.Router();
const quoteController = require("../controllers/quoteController");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/public", async (req, res) => {
  try {
    const quotes = await quoteController.getAllQuotes();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", authMiddleware, quoteController.createQuote);
router.get("/", authMiddleware, quoteController.getUserQuotes);
router.put("/:id", authMiddleware, quoteController.updateQuote);
router.delete("/:id", authMiddleware, quoteController.deleteQuote);

module.exports = router;
