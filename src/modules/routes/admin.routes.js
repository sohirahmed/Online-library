import express from 'express';
import * as AC from '../controllers/admin.controller.js';
import { auth } from '../../middlewares/auth.js';
const adminRouter = express.Router();


adminRouter.get('/students', auth(),AC.getAllStudents);
adminRouter.get('/dashboard', auth(), AC.dashboard);
adminRouter.post('/books', auth(), AC.addBook);
adminRouter.put('/books/:bookId', auth(), AC.updateBook);
adminRouter.delete('/books/:bookId', auth(), AC.deleteBook);
adminRouter.get('/students/:studentId', auth(), AC.searchStudent);
// adminRouter.get('/students/details/:studentId', AC.viewStudentDetails);
adminRouter.put('/profile', auth(), AC.updateAdminProfile);


export default adminRouter;
