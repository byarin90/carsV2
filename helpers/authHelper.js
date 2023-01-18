import jwt from 'jsonwebtoken'

import { config } from 'dotenv'
config()

// user == {_id,role} - > from users object
export const createJWT = ({ _id, role }) => {
    // jwt.sign(payload,tokenSecretKey, { expiresIn: '20m'})
    const token = jwt.sign({ _id, role }, process.env.TOKEN_SECRET, { expiresIn: '20m' })
    return token;
}