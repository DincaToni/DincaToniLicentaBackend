const router = require("express").Router();
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");

router.route("/auth").post(authUser);
router.route("/register").post(registerUser);
router.route("/logout").post(logoutUser);
router
  .route("/userProfile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
