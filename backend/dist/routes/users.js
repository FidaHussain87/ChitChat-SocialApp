"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _users = require("../controllers/users.js");
var _auth = require("../middleware/auth.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

/* READ */
router.get("/:id", _auth.verifyToken, _users.getUser);
router.get("/:id/friends", _auth.verifyToken, _users.getUserFriends);
router.patch("/:id/:friendId", _auth.verifyToken, _users.addRemoveFriend);
var _default = router;
exports["default"] = _default;