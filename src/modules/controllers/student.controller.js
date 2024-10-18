
import Book from "../../../db/models/book.models.js";
import BorrowedBook from "../../../db/models/borrowBook.models.js";
import Student from "../../../db/models/student.model.js";
import { asyncHandler } from "../../utils/globalErrorHandling.js";



//========================================getAllBooks============================================

export const getAllBooks = asyncHandler(async (req, res , next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error fetching books", error });
    }
});

// //=====================================borrowBook===============================

export const borrowBook = asyncHandler(async (req, res , next) => {
    try {
        const { bookId } = req.body;
        const book = await Book.findById(bookId);
        if (!book || book.copiesAvailable <= 0) {
            return res.status(400).json({ msg: "Book not available" });
        }

        const borrowedBook = await BorrowedBook.create({
            bookId,
            studentId: req.user._id,
            returnDueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
        });

        book.copiesAvailable -= 1;
        await book.save();

        res.status(201).json({ msg: "Book borrowed successfully", borrowedBook });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error borrowing book", error });
    }
});

//========================================studentDashboard============================================
export const studentDashboard = asyncHandler(async (req, res , next) => {
    try {
        const borrowedBooks = await BorrowedBook.find({ studentId: req.user._id }).populate('bookId');
        res.status(200).json({ borrowedBooks });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error fetching student dashboard", error });
    }
});

//========================================returnBook============================================

export const returnBook = asyncHandler(async (req, res , next) => {
    const { borrowedBookId } = req.body;
    const borrowedBook = await BorrowedBook.findById(borrowedBookId);
    if (!borrowedBook) return res.status(404).json({ message: "Borrowed book not found" });

    borrowedBook.status = 'returned';
    await borrowedBook.save();

    const book = await Book.findById(borrowedBook.bookId);
    book.copiesAvailable += 1;
    await book.save();

    res.json({ message: "Book returned successfully" });
});


//===========================Update Student Profile===========================
export const updateStudentProfile = asyncHandler(async (req, res , next) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.user._id, req.body, { new: true });
        res.status(200).json({ msg: "Profile updated successfully"});
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error updating profile", error });
    }
});