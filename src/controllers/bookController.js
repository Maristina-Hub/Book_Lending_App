import { Book } from '../models/bookModel.js';
import pagination from '../utilities/pagination.js';

export const BookController = {
    createBook: async (req, res) => {
    const { title, author, category, description, year } = req.body;
    const role = req.user.role

    try {
        if (!role || role !== 'admin') {
        return res.status(401).json({ status: 'fail', message: 'unauthorized' });
        }
        if (!title || !description || !author || !category || !year) {
        return res
            .status(400)
            .json({ status: 'fail', message: 'Please fill all fields' });
        }

        const newBook = new Book(req.body);
        const book = await newBook.save();
        if (!book) {
            return res
            .status(400)
            .json({ status: 'fail', message: 'something went wrong' });
        }
        return res
            .status(200)
            .json({ 
                status: 'success', message: 'successful', data: book
                // { title, author, category, description, year } 
        });
        } catch (err) {
        return res
            .status(500)
            .json({ status: 'fail', message: 'server err', err });
        }
    },

    getBook: async (req, res) => {
        try {
        const book = await Book.find({})
            .populate('category', 'name')
            .lean().exec();
        const pgn = await pagination(req, 20, Book);
        
        return res.status(201).json({
            status: 'success',
            message: 'successful',
            data: book,

            // pagination
            documentCount: pgn.documentCount,
            totalPages: pgn.totalPages,
            nextPage: pgn.nextPage,
        });
        } catch (err) {
        return res
            .status(500)
            .json({ status: 'fail', message: 'server err', err });
        }
    },

    getBookById: async (req, res) => {
        const { id } = req.params;
        try {
        const book = await Book.findById(id)
            .populate('category')
            .exec()
        return res
            .status(200)
            .json({ status: 'success', message: 'successful', data: book });
        } catch (err) {
        return res
            .status(500)
            .json({ status: 'fail', message: 'server err', err });
        }
    },

    editBookById: async(req, res) => {
        const { id: _id } = req.params;
        const role = req.user.role

        if (!role || role !== 'admin') {
        return res.status(401).json({ status: 'fail', message: 'unauthorized' });
        }

        // Check if there's at least one information to update
        if(![ req.body.title, req.body.author, req.body.category, req.body.description, req.body.year ].some(Boolean)) {
        return res.status(400).json({
            status: "Failed", message: "All fields cannot be blank to update book"
        })
        }

        try {
        // Update category details in db
        const updatedBook = await Book.findByIdAndUpdate(
            { _id },
            req.body,
            { new: true }
        );

        return res.status(200).json({ 
            status: "Success", 
            message: "Book updated successfully", 
            data: updatedBook
        });

        } catch (error) {
        return res.status(500).json({
            status: 'Fail',
            message: error.message
        });
        }
    },

    deleteBook: async(req,res)=>{
        const bookId = req.params.id;
        // const { bookId: _id } = req.params;
        const role = req.user.role

        if (!role || role !== 'admin') {
        return res.status(401).json({ status: 'fail', message: 'unauthorized' });
        }
        
        try {
            // const savedBook = await Book.findByIdAndRemove(id);
            // res.json({msg: "Book deleted"})

            const deletedBook = await Book.findByIdAndRemove(bookId);
    
            if (deletedBook) {
            return res
                .status(200)
                .json({
                status: "success", message: "Book deleted"
            });
            }
    
            return res
                .status(404)
                .json({ status: 'fail', message: 'book not found' });
                
        } catch (error) {
            res.status(400).send(error.reason={msg: "id not found"});
        }
    }
}




