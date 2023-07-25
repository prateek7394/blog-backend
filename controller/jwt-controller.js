
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();


export const authenticateToken = (request, response, next) =>{
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) {
        return response.status(401).json({msg: 'Token is missing'});
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if(error){
            return response.status(403).json({msg: 'Invalid Access Token'})
        }

        request.user = user;
        next(); // Forwards the execution to the next function after middleware
    })
}