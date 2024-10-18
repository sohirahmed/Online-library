import express from 'express';
import * as SC from '../controllers/student.controller.js';

import { auth } from '../../middlewares/auth.js';


const studentRouter = express.Router();

studentRouter.get('/books', SC.getAllBooks);
studentRouter.post('/borrow', auth(), SC.borrowBook);
studentRouter.get('/dashboard', auth(), SC.studentDashboard);
studentRouter.post('/return', auth(), SC.returnBook);
studentRouter.put('/profile', auth(), SC.updateStudentProfile);


export default studentRouter;
