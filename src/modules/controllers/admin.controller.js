import Admin from "../../../db/models/admin.model.js";
import Book from "../../../db/models/book.models.js";
import BorrowedBook from "../../../db/models/borrowBook.models.js";
import Student from "../../../db/models/student.model.js";
import { asyncHandler } from "../../utils/globalErrorHandling.js";



//========================== getAllStudents============================================
export const getAllStudents = async (req, res , next) => {
    try {    
        if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }
    const students = await Student.find({});
    res.status(200).json({ msg: 'All students fetched successfully', students });
    } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error fetching students', error });
    }
};

//========================== Dashboard Operations ==========================
export const dashboard = asyncHandler(async (req, res,next) => {
    try {
        const borrowedBooks = await BorrowedBook.find().populate('bookId studentId');
        const allBooks = await Book.find();
        const allUsers = await Student.find();
        res.status(200).json({ borrowedBooks, allBooks, allUsers });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error fetching dashboard data", error });
    }
});

//========================== Add Book =======================================
export const addBook =asyncHandler(async (req, res, next) => {
    try {
        const { title, author, ISBN, copiesAvailable } = req.body;
        const book = await Book.create({ title, author, ISBN, copiesAvailable });
        res.status(201).json({ msg: "Book added successfully", book });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error adding book", error });
    }
});

//========================== Search student by ID =====================================
export const searchStudent = asyncHandler(async (req, res , next) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error fetching student details", error });
    }
});

//========================== Update Book =====================================
export const updateBook = asyncHandler(async (req, res,next) => {
    try {
        const { bookId } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
        res.status(200).json({ msg: "Book updated successfully", updatedBook });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error updating book", error });
    }
});

//========================== Delete Book =====================================
export const deleteBook = asyncHandler(async (req, res ,next) => {
    try {
        const { bookId } = req.params;
        await Book.findByIdAndDelete(bookId);
        res.status(200).json({ msg: "Book deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error deleting book", error });
    }
});

//================================== View student details===================================
// export const viewStudentDetails = asyncHandler(async (req, res , next) => {
//     const { studentId } = req.params;
//     const student = await Student.findById(studentId);
//     if (!student) return res.status(404).json({ message: "Student not found" });
//     res.json(student);
// });

//===========================Update Admin Profile===========================
export const updateAdminProfile =asyncHandler( async (req, res , next) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.user._id, req.body, { new: true });
        res.status(200).json({ msg: "Profile updated successfully", updatedAdmin });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error updating profile", error });
    }
});

