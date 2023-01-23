"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _posts = require("../controllers/posts.js");
var _auth = require("../middleware/auth.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

/*READ */

router.get("/", _auth.verifyToken, _posts.getFeedPosts);
router.get("/:userId/posts", _auth.verifyToken, _posts.getUserPosts);

/*UPDATE */
router.patch("/:id/like", _auth.verifyToken, _posts.likePost);
var _default = router;
exports["default"] = _default;