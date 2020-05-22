const { Router } = require("express");
const { ParseIntMiddleware, AuthMiddleware } = require("../middlewares");

module.exports = function ({ IdeaController }) {
  const router = Router();

  router.get("/:ideaId", IdeaController.get);
  router.get("/", IdeaController.getAll);
  router.get("/:userId/:all", [AuthMiddleware], IdeaController.getUserIdea);
  router.post("/", [AuthMiddleware], IdeaController.create);
  router.patch("/:ideaId", [AuthMiddleware], IdeaController.update);
  router.delete("/:ideaId", [AuthMiddleware], IdeaController.delete);
  router.post("/:ideaId/upvote", [AuthMiddleware], IdeaController.upvoteIdea);
  router.post(
    "/:ideaId/downvote",
    [AuthMiddleware],
    IdeaController.downvoteIdea
  );

  return router;
};
