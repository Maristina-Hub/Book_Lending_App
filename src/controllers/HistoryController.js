import { History } from '../models/historyModel.js';
import { User } from '../models/userModel.js';
import { Book } from '../models/bookModel.js';

const HistoryController = {

  addUserHistory: async (req, res) => {
    const user = req.params.userId;
    const book = req.body.book; 
    
    if (!book) {
      return res.status(400)
        .json({ status: 'fail', message: 'select a book to add' });
    }

    if (!user) {
      return res.status(400)
        .json({ status: 'fail', message: 'no user.' });
    }

    try {
      const borrowedBook = await Book.findById(book).exec();
      const borrowedDate = borrowedBook.createdAt;
      console.log(borrowedDate,req.body)

      const newHistory = new History({ user, book, borrowedDate});
      const history = await newHistory.save();
      
      if (!history) {
        return res.status(400)
          .json({ status: 'fail', message: 'history not created.' });
      }
      
      return res.status(201)
          .json({ status: 'success', message: 'book history created', data: history });
      
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getUserHistory: async (req, res) => {
      const { userId } = req.params;
    try {
      const histories = await History.find({ user: userId})
      .populate('book')
      .exec()
      ;
      return res.status(200)
        .json({ status: 'success', message: 'history retrieved.', data: histories });

    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

}

export default HistoryController;