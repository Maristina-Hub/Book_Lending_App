import { Shelf } from '../models/shelfModel.js';
import { User } from '../models/userModel.js';
import { Book } from '../models/bookModel.js';
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
    const user = req.params.userId;
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
      /*
      // refactor to half userSubscriptionType available in header payload
      // instead of extra server request to get it.
      const thisUser = await User.findById(user).exec();
      const thisUserSubscriptionType = thisUser.subscriptionType;
      */
      const dateToReturn = ShelfController.dateOfReturn('premium');

      const newShelf = new Shelf({ user, book, dateToReturn});
      const shelf = await newShelf.save();

      // // -1 from book inventory count.
      // if (shelf) {
      //   // await ShelfController.updateBookInventoryCount('add');
      //   const addedBook = await Book.findById(book).exec();
      //   addedBook.inventoryCount -=1;
      //   await addedBook.save();
        
        return res.status(201)
          .json({ status: 'success', message: 'book was added to shelf', data: shelf });
      // }
      // else {
      //   return res
      //     .status(400)
      //     .json({ status: 'fail', message: 'book not added' });
      // }
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  updateBookInventoryCount: async (req, res) => {
    let { type } = req.params; 
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
        .json({ status: 'fail', message: 'UPADTE INVENTORY server err', err });
    }
  },

  getBooksFromShelf: async (req, res) => {
      const { userId } = req.params;
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
  returnBook: async (req, res) => { // deleteBookFromShelf
    const { userId } = req.params;
    const bookId = req.body.book;
    try {
      const shelf = await Shelf.findOneAndDelete({user: userId, book: bookId});

      // if (shelf) {
      //     const book = await Book.findById(bookId).exec();
      //     const user = await User.findById(userId).exec();

      //     // update book inventory count on bookModel
      //     book.inventoryCount +=1;
      //     await book.save();

      //     // update bookHistory on userModel
      //     user.bookHistory.push({
      //       book: book._id,
      //       borrowedDate: shelf.createdAt,
      //       returnedDate: Date.now()
      //     });
      //     await user.save();

          return res.status(200).json({ 
              status: 'success',
              message: 'book returned successfully.', 
            });
        // }
          

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