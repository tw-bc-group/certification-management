module.exports = {
  "/api": {
    "target": "https://api.remove.bg/",
    "secure": false,
    "pathRewrite": {
      "^/api": "",
    },
    "logLevel": "debug",
  },
  "/photos": {
    "target": "http://localhost:3000/",
    "secure": false,
    "pathRewrite": {
      "^/photos": "",
    },
    "logLevel": "debug",
  },
};
