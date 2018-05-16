const users = require('../authentication');

module.exports = {
    authorization : function (req, resp, next) {
        const authorization = req.body.autherization;
        const deviceToken = req.body.deviceToken;
        const fingerPrint = req.body.fingerPrint;

        if(authorization && deviceToken && fingerPrint){
            users.forEach(user => {
                if(user.authorization == authorization && user.deviceToken == deviceToken && user.fingerPrint == fingerPrint){
                    req.body.user = user.name;
                    req.body.userId = user.userID;
                }
            });
        }

        if(req.body.user){
            next();
        }
        else{
            resp.send({
                status : 403,
                message : "Not Authorized"
            });
        }
    },
}
