import { getDbConnecion } from "../db";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const {firstName, lastName, email, password} = req.body;
        const db = getDbConnecion('Todo-app');
        const user = db.collection('users').findOne({email});


        if (user) {
            res.status(409).send('User already signed up');
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const result = await db.collection('users').insertOne({
            firstName,
            lastName,
            email,
            passwordHash,
            isVerified: false,
            todos: [],
        })


        const {insertId} = result;
        
        jwt.sign({
            id: insertId,
            email,
            todos: [],
            isVerified: false,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2d',
        }, (err, token) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({token});
        })
        
    }
}

export default signUpRoute;