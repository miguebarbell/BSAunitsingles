const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    // console.log(authHeader)
    // console.log(req.body)
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json("Token is not valid.")
            req.user = user;
            next()
        })
    } else {
        return res.status(401).json("You are not authenticated.")
    }
}

const verifyTokenAndAuth = (req, res, next) => {
    // console.log(req)
    verifyToken(req, res, () => {
        if(req.user.id === req.params.userId || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("Not Allowed.")
        }
    });
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("Not Allowed.")
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
