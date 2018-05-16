module.exports = function (req, resp, next) {
    resp.status(404).send({
        status : 404,
        message : 'Page Not Found'
    });
}
