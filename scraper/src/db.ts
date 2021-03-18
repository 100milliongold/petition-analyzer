import mongoose from "mongoose";

// Node.js의 native Promise 사용
const db = () => {
    mongoose.Promise = global.Promise;

    const url : string = process.env.MONGO_URI!
    const username : string = process.env.MONGO_USERNAME!
    const password : string = process.env.MONGO_PASSWORD!
    mongoose.connect(url , {  
        dbName: 'president',
        user: username,
        pass: password
        })
        .then(() => console.log('Successfully connected to mongodb'))
        .catch(e => console.error(e));
}


export default db;