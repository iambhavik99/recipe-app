const jsonwebtoken = require('jsonwebtoken');
const Users = require('../models/user.model');

const secret = "ReC!Pe@pp$ECrEt@!!#";

const verifyUser = async (decodedToken, next) => {
    try {
        const user = await Users.findById(decodedToken.id)
        if (!!user && user.email === decodedToken.email) {
            if (decodedToken.role !== 'admin') {
                throw { message: 'User have not access to this endpoint.' };
            }
            else {
                next();
            }
        }
        else {
            throw { message: 'Unauthorized user!' };
        }
    }
    catch (ex) {
        throw ex
    }
}


module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!!token?.trim()) {
            const decodedToken = jsonwebtoken.verify(token, secret);
            await verifyUser(decodedToken, next);
        }
        else {
            throw { message: 'Unauthorized user!' }
        }
    } catch (ex) {
        res.status(401).json({
            error: ex.message
        });
    }
};