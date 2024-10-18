import express from 'express';
import userRouter from './src/modules/routes/user.routes.js';
import studentRouter from './src/modules/routes/student.routes.js';
import adminRouter from './src/modules/routes/admin.routes.js';
import dotenv from 'dotenv';
import cors from "cors";

import connectionDB from './db/connectionDB.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;


connectionDB();

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/student', studentRouter);

app.get('/' , (req , res , next) => {
    res.status(200).json({msg:"hello on my project "})
})
app.get('*', (req, res , next) => res.send('page not found'))

app.listen(3000, () => {
    console.log(`Server running on port ${port}`);
});
