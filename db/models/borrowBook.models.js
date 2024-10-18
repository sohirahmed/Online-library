import mongoose from 'mongoose';

const borrowedBookSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    borrowedAt: { type: Date, default: Date.now },
    returnDueAt: { type: Date, required: true },
    status: { type: String, enum: ['borrowed', 'returned', 'overdue'], default: 'borrowed' }
});

const BorrowedBook = mongoose.model('BorrowedBook', borrowedBookSchema);

export default BorrowedBook;
