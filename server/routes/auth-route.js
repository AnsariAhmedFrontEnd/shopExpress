const express = require("express");
const {
  signup,
  login,
  logout,
  authMiddleWare,
} = require("../controllers/auth/auth-contoller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", authMiddleWare, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user",
    user,
  });
});

module.exports = router;
