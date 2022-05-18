import { getDbConnecion } from "../db";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const logInROute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const {email, password} = req.body;
        const db = getDbConnecion('Todo-app');
        const user = await db.collection('users').findOne({email});
        

        if (!user) {
            return res.status(401).send('Please sign in. You dont have any account yet')    
        }

        const {_id: id, passwordHash, isVerified ,todos} = user;


        const isCorrect = await bcrypt.compare(password, passwordHash);
        console.log(isCorrect)
        
        if (isCorrect){
            jwt.sign({
                email,
                todos,
                isVerified,
                id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '2d'
            },
            (err, token)=> {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.status(200).json({token});
            })
        }
        console.log("Done sending the response")
    }
}

export default logInROute;