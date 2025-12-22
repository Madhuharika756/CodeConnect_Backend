const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).send("Please Login!");
        }

        const decodedMessage = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        const user = await User.findById(decodedMessage._id);

        if (!user) {
            return res.status(401).send("Unauthorized");
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
};

module.exports = { userAuth };
