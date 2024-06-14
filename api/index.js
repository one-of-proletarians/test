// api/index.js

module.exports = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send("<h1>Hello from the server-side script!</h1>");
};
