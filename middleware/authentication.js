import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export const authUser = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({
                error: `Unauthorized, You don't have a token for this end-point`
            });
        }
        // jwt.verify(token, secretKey)
        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET)
        if (decodeToken._id) {
            // (req) from middleware to route
            req.tokenData = decodeToken;
            next();
        }

    } catch (error) {
        return res.status(403).json({ err_msg: 'invalid decoding', error })
    }
}
export const authAdmin = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({
                error: `Unauthorized, You don't have a token for this end-point`
            });
        }
        // jwt.verify(token, secretKey)
        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET)

        if (decodeToken.role !== 'admin') {
            return res.status(401).json({
                error: `Unauthorized, You don't have a token for this end-point you must be an admin`
            });
        }

        if (decodeToken._id) {
            // (req) from middleware to route
            req.tokenData = decodeToken;
            next();
        }

    } catch (error) {
        return res.status(403).json({ err_msg: 'invalid decoding', error })
    }
}