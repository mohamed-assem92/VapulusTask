module.exports = {
  headers: function(req, resp, next) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "Content-Type");
    resp.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
    next();
  }
}
