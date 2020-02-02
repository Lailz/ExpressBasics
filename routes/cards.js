const express = require("express");
const router = express.Router();

const { data } = require("../data/flashcardData.json");
const { cards } = data;

router.get("/", (req, res) => {
  const cardID = Math.floor(Math.random() * cards.length);
  res.redirect(`/cards/${cardID}?side=question`);
});

router.get("/:id", (req, res) => {
  const { side } = req.query;
  const { id } = req.params;

  if (!side) {
    return res.redirect(`/cards/${id}?side=question`);
  }

  const name = req.cookies.username;
  const text = cards[id][side];
  const { hint } = cards[id];

  const templateData = { id, text, sideToShow: "question", name };
  if (side === "question") {
    templateData.hint = hint;
    templateData.sideToShow = "answer";
  }

  res.render("card", templateData);
});

module.exports = router;
