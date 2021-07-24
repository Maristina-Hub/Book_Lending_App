import { Shelf } from '../models/shelfModel.js';
import { User } from '../models/userModel.js';
import { Book } from '../models/bookModel.js';

const ShelfController = {
  addBookToShelf: async (req, res) => {
    const user = req.params.userId;
    const book = req.body.book; // being a subscription model, add a book at a time.
    
    if (!user || !book) {
      return res.status(400)
        .json({ status: 'fail', message: 'Please select a book to add.' });
    }

    try {
      const newShelf = new Shelf({ user, book });
      const shelf = await newShelf.save();

      // -1 from book inventory count.
      if (shelf) {
        const addedBook = await Book.findById(book).exec();
        addedBook.inventoryCount -=1;
        await addedBook.save();
        
        return res.status(201)
          .json({ status: 'success', message: 'successful', data: shelf });
      }
      else {
        return res
          .status(400)
          .json({ status: 'fail', message: 'book not added' });
      }
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getBooksFromShelf: async (req, res) => {
      const { userId } = req.params;
    try {
      const shelves = await Shelf.find({ user: userId})
      .populate('book') // add as appropriate ('book', 'title', 'authour') later.
      .exec()
      ;
      return res.status(200)
        .json({ status: 'success', message: 'books retrieved successfully', data: shelves });

    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  // return a book and delete it from shelf entry
  // update Book History
  // +1 to book inventory count.
  returnBook: async (req, res) => { // deleteBookFromShelf
    const { userId } = req.params;
    const bookId = req.body.book;
    try {
      const shelf = await Shelf.findOneAndDelete({user: userId, book: bookId});

      if (shelf) {
          const book = await Book.findById(bookId).exec();
          const user = await User.findById(userId).exec();

          // update book inventory count.
          book.inventoryCount +=1;
          await book.save();

          // update bookHistory
          user.bookHistory.push(book);
          await user.save();

          return res.status(200).json({ 
              status: 'success',
              message: 'book returned successfully.', 
            });
        }
          

    } catch (err) {
      return res.status(500).json({ 
          status: 'fail', 
          message: 'server err', 
          err 
        });
    }
  },

}


export default ShelfController;