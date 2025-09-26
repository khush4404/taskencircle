import express from 'express';

const router = express.Router();

router.get('/login',(req,res)=>{
    const {email, password} = req.body;
    
})