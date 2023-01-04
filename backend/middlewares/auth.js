const expressJWT = require('express-jwt')
// verifie si token existe
exports.requireSignin = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth'
})
//verifie si user est autorisé
exports.isAuth = (req, res, next) => {
    let user = req.auth && (req.auth._id == "63b551c52cc9464cc3d868e2")
    if(!user)
        return res.status(403).json({
            error: 'Access denied'
        })
    next()
}