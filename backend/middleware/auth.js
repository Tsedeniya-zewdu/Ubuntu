import 'dotenv/config'
import jwt from 'jsonwebtoken'
import multer from 'multer'

// for checking if current user is properly authenticated
export function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('Access denied. No token provided') // req has no token

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY) // check for valid token
        req.user = decoded // add decoded payload from jwt to req
        next() // pass control to next function
    } catch (err) {
        res.status(400).send('Invalid token.')
    }
}
