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
    "target": "https://localhost:3000/photos",
    "secure": false,
    "pathRewrite": {
      "^/photos": "",
    },
    "logLevel": "debug",
  },
};
