    import { Category } from '../models/categoryModel.js';
    import Book from '../models/bookModel.js';

    export const BookController = {
    createBook: async (req, res) => {
        const { title, description, access } = req.body;
        if (!access || access !== 'admin') {
        return res.status(401).json({ status: 'fail', message: 'unauthorized' });
        }
        if (!title || !description) {
        return res
            .status(400)
            .json({ status: 'fail', message: 'Please fill all fields' });
        }

        try {
        const newCategory = new Category(req.body);
        const category = await newCategory.save();
        if (!category) {
            return res
            .status(400)
            .json({ status: 'fail', message: 'something went wrong' });
        }
        return res
            .status(201)
            .json({ status: 'success', message: 'successful', data: category });
        } catch (err) {
        return res
            .status(500)
            .json({ status: 'fail', message: 'server err', err });
        }
    },

    getCategory: async (req, res) => {
        try {
        const categories = await Category.find({}).lean().exec();
        return res
            .status(201)
            .json({ status: 'success', message: 'successful', data: categories });
        } catch (err) {
        return res
            .status(500)
            .json({ status: 'fail', message: 'server err', err });
        }
    },

    editCategory: async (req, res) => {
        // Extract catgeory id passed
        const { id: _id } = req.params;

        // Check if there's at least one information to update
        if(![ req.body.title, req.body.description ].some(Boolean)) {
        return res.status(400).json({
            status: "Failed", message: "All fields cannot be blank to update category"
        })
        }

        try {
        // Update category details in db
        const updatedCategory = await Category.findByIdAndUpdate(
            { _id },
            req.body,
            { new: true }
        );
        
        // If server error occurs OR no matching id was found
        if(!updatedCategory.length || !updatedCategory) return res.status(404).json({ 
            status: "Failed", message: "Oops! Error updating category"
        });

        return res.status(200).json({ 
            status: "Success", 
            message: "Category updated successfully", 
            data: updatedCategory
        });

        } catch (error) {
        return res.status(500).json({
            status: 'Fail',
            message: error.message
        });
        }
    },

    createBook: async (req, res) => {
        const { title, author, category, description, year, imageUrl, access } =
        req.body;
        if (!access || access !== 'admin') {
        return res.status(401).json({ status: 'fail', message: 'unauthorized' });
        }
        if (!name || !description || !price || !category) {
        return res
            .status(400)
            .json({ status: 'fail', message: 'Please fill all fields' });
        }

        try {
        const newBook = new Book(req.body);
        const book = await newBook.save();
        if (!book) {
            return res
            .status(400)
            .json({ status: 'fail', message: 'something went wrong' });
        }
        return res
            .status(201)
            .json({ status: 'success', message: 'successful', data: book });
        } catch (err) {
        return res
            .status(500)
            .json({ status: 'fail', message: 'server err', err });
        }
    },

    getBook: async (req, res) => {
        const PAGE_SIZE = 20;
        let page = 1;
        let skip;

        if (req.query.page) {
        page = Number(req.query.page);
        skip = (page - 1) * PAGE_SIZE;
        }

        try {
        const book = await Book.find({}).populate().lean().exec();
        const docCount = await Book.find({}).countDocuments();
        return res.status(201).json({
            status: 'success',
            message: 'successful',
            data: book,
            documentCount: docCount,
            totalPages: Math.ceil(docCount / PAGE_SIZE),
            nextPage:
            Math.ceil(docCount / PAGE_SIZE) > page ? `/${page + 1}` : null,
        });
        } catch (err) {
        return res
            .status(500)
            .json({ status: 'fail', message: 'server err', err });
        }
    },

    getBookById: async (req, res) => {
        const { bookId } = req.params;
        try {
        const book = await Book.findOne({_id: bookId})
            .lean()
            .exec();
        return res
            .status(201)
            .json({ status: 'success', message: 'successful', data: book });
        } catch (err) {
        return res
            .status(500)
            .json({ status: 'fail', message: 'server err', err });
        }
    },
    
    Wishlist: async (req, res) => {

    const { userId, title, bill } = req.body;
    if (!userId || !items || !bill ) {
        return res
        .status(400)
        .json({ status: 'fail', message: 'Please the Product Wislist is empty' });
    }

    try {
        const newWishlist = new Wishlist(req.body);
        const wishList = await newWishlist.save();
        if (!wishList) {
        return res
            .status(400)
            .json({ status: 'fail', message: 'something went wrong' });
        }
        return res
        .status(201)
        .json({ status: 'success', message: 'successful', data: wishList });
    } catch (err) {
        return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
    }
}
