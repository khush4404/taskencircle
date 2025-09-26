import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

db().then(()=>{
    app.listen(PORT, ()=>{
        console.log('server run on PORT 5000');
    })
}).catch((err)=>{
    console.log('err in server connection : ',err)
})