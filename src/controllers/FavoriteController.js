import { Favorite } from '../models/favoriteModel.js';

const FavoriteController = {

  addBookToFavorites: async (req, res) => {
    const user = req.user.id;
    const book = req.body.book; 
    
    if (!book) {
      return res.status(400)
        .json({ status: 'fail', message: 'select a book to add' });
    }

    try {
      const newFavorite = new Favorite({ user, book });
      
      const favorite = await newFavorite.save();
      
      if (!favorite) {
        return res.status(400)
          .json({ status: 'fail', message: 'book not added to favorites' });
      }
      
      return res.status(201)
          .json({ status: 'success', message: 'book added to favorite', data: favorite });
      
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getUserFavorites: async (req, res) => {
    const userId = req.user.id;
    try {
      const wislists = await Favorite.find({ user: userId})
      .populate('book')
      .exec()
      ;
      return res.status(200)
        .json({ status: 'success', message: 'favorites retrieved', data: wislists });

    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  removeBookFromFavorites: async (req, res) => { 
    const user = req.user.id;
    const book = req.body.book;
    try {
      const favorite = await Favorite.findOneAndDelete({user, book});

      if (favorite) {
        return res.status(200).json({ 
            status: 'success',
            message: 'book removed from favorite', 
          });
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

export default FavoriteController;