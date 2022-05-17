
import { getDbConnecion } from "../db";
import bcrypt from bcrypt;
import jwt from 'jsonwebtoken';


const logInROute = {
    path: '/api/login',
    mehtod: 'post',
    handler: async (req, res) => {
        const {email, password} = req.body;
        const db = getDbConnecion('Todo-app');
        const user = db.collection('users').findOne({email});

        if (!user) {
            return res.status(401).send('Please sign in. You dont have any account yet')    
        }

        const {id, passwordHash, isVerified ,todos} = user;

        const isCorrect = await bcrypt.compare(password, passwordHash);
        if (isCorrect){
            jwt.sign({
                email,
                todos,
                isVerified,
                id,
            },
            process.env.JWT_SECRET),
            {
                expiresIn: '2d'
            },
            (err, token)=> {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).json({token});
            }
        }
    }
}