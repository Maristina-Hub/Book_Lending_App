import { History } from '../models/historyModel.js';
import { Shelf } from '../models/shelfModel.js';

const HistoryController = {

  addUserHistory: async (req, res) => {
    const user = req.user.id;
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
      const borrowedBook = await Shelf.findOne({user, book}).exec();
      const borrowedDate = borrowedBook.createdAt;

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
    const userId = req.user.id;

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