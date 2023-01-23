"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _helmet = _interopRequireDefault(require("helmet"));
var _multer = _interopRequireDefault(require("multer"));
var _morgan = _interopRequireDefault(require("morgan"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _auth = _interopRequireDefault(require("./routes/auth.js"));
var _users = _interopRequireDefault(require("./routes/users.js"));
var _posts = _interopRequireDefault(require("./routes/posts.js"));
var _auth2 = require("./controllers/auth.js");
var _posts2 = require("./controllers/posts.js");
var _auth3 = require("./middleware/auth.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* Configuration */

var _filename = (0, _url.fileURLToPath)(import.meta.url);
var _dirname = _path["default"].dirname(_filename);
_dotenv["default"].config();
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use((0, _helmet["default"])());
app.use(_helmet["default"].crossOriginResourcePolicy({
  policy: "cross-origin"
}));
app.use((0, _morgan["default"])("common"));
app.use(_bodyParser["default"].json({
  limit: "30mb",
  extended: true
}));
app.use(_bodyParser["default"].urlencoded({
  limit: "30mb",
  extended: true
}));
app.use("/assets", _express["default"]["static"](_path["default"].join(_dirname, "public/assets")));

/* File Storage */
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = (0, _multer["default"])({
  storage: storage
});

/* Routes with files */
app.post("/auth/register", upload.single("picture"), _auth2.register);
app.post("/posts", _auth3.verifyToken, upload.single("picture"), _posts2.createPost);

/* Remaining Routes */

app.use("/auth", _auth["default"]);
app.use("/users", _users["default"]);
app.use("/posts", _posts["default"]);

/* MONGOOSE SETUP*/
var PORT = process.env.PORT || 8001;
_mongoose["default"].set("strictQuery", false);
_mongoose["default"].connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
  });
})["catch"](function (error) {
  console.log("".concat(error, " did not connect"));
});