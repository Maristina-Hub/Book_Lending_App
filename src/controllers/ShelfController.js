import { Shelf } from '../model/shelfModel.js';
import { User } from '../model/userModel.js';
import { Book } from '../model/bookModel.js';

const ShelfController = {
  addBookToShelf: async (req, res) => {
    let { userId, bookId } = req.body; // being a subscription model, add a book at a time.
    
    // Simulate shelf books
    userId = '60e974c3906dbf25dc92b7a9';
    bookId = '60e974c3906dbf25dc92ghah';
    if (!userId || !bookId) {
      return res.status(400)
        .json({ status: 'fail', message: 'Please select a book to add.' });
    }

    try {
      const newShelf = new Shelf(req.body);

      const shelf = await newShelf.save();

      // -1 from book inventory count.
      if (shelf) {
        const bookId = shelf.book._id;
        const book = await Book.findById(bookId).exec();

        book.inventoryCount -=1;
        await book.save();
      }
      else {
        return res
          .status(400)
          .json({ status: 'fail', message: 'book not added' });
      }
      return res.status(201)
        .json({ status: 'success', message: 'successful', data: shelf });
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getBooksFromShelf: async (req, res) => {
      const { userId } = req.params;
    try {
      const shelves = await Shelf.find({ userId: userId})
      .populate('book') // add as appropriate ('book', 'title', 'authour') later.
      .exec()
      ; // where userId = req.params.userId
      return res.status(200)
        .json({ status: 'success', message: 'successful', data: shelves });

    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  // return a book and delete it from shelf entry
  // update Book History
  // +1 to book inventory count.
  returnBook: async (req, res) => { // deleteBookFromShelf
    const { id } = req.params;
    // const bookId = req.body.bookId;

    try {
      const shelf = await Shelf.findById(id);
      

    if (shelf.deleteOne()) {
        // shelf is still in memory
        const bookId = shelf.book._id;
        const userId = shelf.user._id;
        const book = await Book.findById(bookId).exec();
        const user = await User.findById(userId).exec();

        // update book inventory count.
        book.inventoryCount +=1;
        await book.save();

        // update bookHistory
        user.bookHistory.push();
        await user.save();
      }

      return res.status(200).json({ 
          status: 'success',
          message: 'book returned successfully.', 
        });
          

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