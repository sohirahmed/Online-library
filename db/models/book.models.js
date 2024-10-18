import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    ISBN: { type: String, required: true },
    copiesAvailable: { type: Number, required: true }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
