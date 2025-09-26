import mongoose from 'mongoose';

const db = async () => {
    try{
        mongoose.connect('mongodb+srv://vagadiyakhush:Kmv4404@mernauth.xbznb9z.mongodb.net/task');
        console.log('mongo connectd');
    }catch{
        console.log('error in mongodb connection')
    }
}

export default db;