import { Shelf } from '../models/shelfModel.js';
import { User } from '../models/userModel.js';
import { Book } from '../models/bookModel.js';
import { History } from '../models/historyModel.js';
import { format, addDays, subDays } from 'date-fns';

const ShelfController = {

  dateOfReturn: subscriptionType => {
    const today = new Date().now;
    let returnDate;

    switch (subscriptionType) {
      case 'regular':
        returnDate = addDays(today, 7);
        break;
      case 'premium':
        returnDate = addDays(today, 14);
        break;
      case 'diamond':
        returnDate = addDays(today, 21);
        break;
      default:
        returnDate = addDays(today, 7);
        break;
    }

    // return format(returnDate, 'yyyy-MM-dd');
    return "2021-09-10T08:11:23.063+00:00";
  },

  addBookToShelf: async (req, res) => {
    const user = req.user.id;
    const book = req.body.book; 
    
    if (!book) {
      return res.status(400)
        .json({ status: 'fail', message: 'Please select a book to add.' });
    }

    if (!user) {
      return res.status(400)
        .json({ status: 'fail', message: 'ghosts can not borrow books.' });
    }

    try {
      const subscriptionType = req.user.subscription;
      const dateToReturn = ShelfController.dateOfReturn(subscriptionType);

      const newShelf = new Shelf({ user, book, dateToReturn});
      const shelf = await newShelf.save();

      // -1 from book inventory count.
      if (shelf) {
        // await ShelfController.updateBookInventoryCount('add');
        const addedBook = await Book.findById(book).exec();
        addedBook.inventoryCount -=1;
        await addedBook.save();
        
        return res.status(201)
          .json({ status: 'success', message: 'book was added to shelf', data: shelf });
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

  updateBookInventoryCount: async (req, res) => {
    let { type } = req.user.id; 
    const { book } = req.body; 

    if (!book) {
      return res.status(400)
        .json({ status: 'fail', message: 'select a book.' });
    }

    try {
      const addedBook = await Book.findById(book).exec();
      (type == 'add') ? addedBook.inventoryCount +=1 : addedBook.inventoryCount -=1;
      await addedBook.save();
        
      if(addedBook){
        return res.status(201)
        .json({ 
          status: 'success', 
          message: (type == 'add') ? 'book inventory +1' : 'book inventory -1', 
        });
      }
      else {
        return res
          .status(400)
          .json({ status: 'fail', message: 'inventory not updated' });
      }
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getBooksFromShelf: async (req, res) => {
    const userId = req.user.id;
    try {
      const shelves = await Shelf.find({ user: userId})
      .populate('book')
      .exec()
      ;
      return res.status(200)
        .json({ status: 'success', message: 'books retrieved.', data: shelves });

    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  // return a book and delete it from shelf entry
  returnBook: async (req, res) => { 
    const userId = req.user.id;
    const bookId = req.body.book;
    try {
      const book = await Shelf.findOneAndDelete({user: userId, book: bookId});

      if (book) {
        // update book inventory count on bookModel
        const returnedBook = await Book.findById(bookId).exec();
        returnedBook.inventoryCount +=1;
        await returnedBook.save();

        // add book history to History table
        const borrowedDate = book.createdAt; //"2021-09-10T08:11:23.063+00:00";//returnedBook.createdAt;
        const newHistory = new History({ user: userId, book: bookId, borrowedDate});
        const history = await newHistory.save();

        if (history) {
          return res.status(200).json({ 
              status: 'success',
              message: 'book returned successfully.', 
            });
        }
      } 
      else {
        return res.status(400).json({ 
            status: 'fail',
            message: 'book not found.', 
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