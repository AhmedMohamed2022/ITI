const Quote = require("../models/Quote");

// Create a new quote
exports.createQuote = async (req, res) => {
  try {
    const { text, author } = req.body;
    const newQuote = new Quote({
      text,
      author: author || "Anonymous",
      user: req.user.id,
    });
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all quotes for the current user
exports.getUserQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({ user: req.user.id });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a quote
exports.updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuote = await Quote.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedQuote)
      return res.status(404).json({ error: "Quote not found" });
    res.json(updatedQuote);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a quote
exports.deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuote = await Quote.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!deletedQuote)
      return res.status(404).json({ error: "Quote not found" });
    res.json({ message: "Quote deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
exports.getAllQuotes = async () => {
  return await Quote.find().populate("user", "username");
};
