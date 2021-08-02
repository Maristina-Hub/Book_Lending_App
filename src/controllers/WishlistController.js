import { Wishlist } from '../models/wishlistModel.js';

const WishlistController = {

  addBookToWishlist: async (req, res) => {
    const user = req.user.id;
    const book = req.body.book; 
    
    if (!book) {
      return res.status(400)
        .json({ status: 'fail', message: 'select a book to add' });
    }

    try {
      const newWishlist = new Wishlist({ user, book });
      
      const wishlist = await newWishlist.save();
      
      if (!wishlist) {
        return res.status(400)
          .json({ status: 'fail', message: 'book not added to wishlist' });
      }
      
      return res.status(201)
          .json({ status: 'success', message: 'book added to wishlist', data: wishlist });
      
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'WISHLIST ADD: server err', err });
    }
  },

  getUserWishlist: async (req, res) => {
    const userId = req.user.id;
    try {
      const wislists = await Wishlist.find({ user: userId})
      .populate('book')
      .exec()
      ;
      return res.status(200)
        .json({ status: 'success', message: 'wishlists retrieved', data: wislists });

    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  removeBookFromWishlist: async (req, res) => { 
    const user = req.user.id;
    const book = req.body.book;
    try {
      const wishlist = await Wishlist.findOneAndDelete({user, book});

      if (wishlist) {
        return res.status(200).json({ 
            status: 'success',
            message: 'book removed from wishlist', 
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
          message: 'WISHLIST REMOVAL server err', 
          err 
        });
    }
  },

}

export default WishlistController;