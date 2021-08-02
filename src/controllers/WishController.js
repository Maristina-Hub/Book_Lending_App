    import { response } from 'express';
    import {Wishlist} from '../models/wishListModel.js';

    // const newWish = new Wish(req.body)
      

    const WishController ={
         postWish: async(req, res) =>{
        //  const book = req.body.book;
        //   console.log(req.body);
          const user = req.user.id;
          const book = req.body.book; 
          
          if (!book) {
            return res.status(400)
              .json({ status: 'fail', message: 'select a book to add' });
          }
            try{
                const newWish = new Wishlist({user, book});
                
                const wishlist = await newWish.save();
                if(!wishlist){
                    return res
                    .status(400)
                    .json({ status: 'fail', message: 'book not added to wishlist', data: wishlist });

                    
                }
    
                return res.status(201).json({
                    status: 'success',
                    message: 'book added to wishlist',
                    data: wishlist
                    
                });
            
            } catch(err){
                res.status(500).json('server error');
            }
    
        },
    
       
        getUserWishlist: async (req, res) => {
            const userId = req.user.id;
            try {
              const wishlists = await Wishlist.find({ user: userId})
              .populate('book')
              .exec()
              ;
              return res.status(200)
                .json({ status: 'success', message: 'wishlists retrieved', data: wishlists });
        
            } catch (err) {
              return res.status(500)
                .json({ status: 'fail', message: 'server err', err });
            }
          },
        
        deleteWishlist: async (req, res) => { 
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
    
        deleteAllWish: async(req, res) => {
            const user = req.user.id;
            const book = req.body.book;
        
            try{

                // console.log(req.params.id)
                // const newWish = new Wish(req.body);
                const DeleteRequest = await Wishlist.deleteMany();
                res.json(DeleteRequest);
            } catch(e) {
                res.status(500).send("Couldn't delete all your wishlist :(");
            }
        }
    }

export default WishController;






