

import {Favourite} from '../models/favouriteModel.js'


 export const FavouritesController = {
    createFavourite: async (req, res) => {
    
     let { UserId, items } = req.body;
      
     if (!UserId || !items) {
        return res.status(400)
          .json({ status: 'fail', message: 'Please like some books to add to favourite' });
      }
     try { 
          newFav.UserId = UserId;
        newFav.items = items.populate('items');
        const newFav = new Favourite({UserId, items});
        
   
   
        const fav = await newFav.save();
        if (!fav) {
            return res
            .status(400)
            .json({ status: 'fail', message: 'something went wrong' });
        }
        return res
            .status(201)
            .json({ status: 'success', message: 'favourite book added successfully', items: book._id, data:{firstname: savedUser.firstname,
                lastname: savedUser.lastname,fav} });
        } catch (err) {
        return res
            .status(500)
            .json({ status: 'fail', message: 'err', err });
        }
    },
   
 
    getFavourite : async(req, res) =>{
       

        const PAGE_SIZE = 20;
        let page = 1;
        let skip;

        if (req.query.page) {
        page = Number(req.query.page);
        skip = (page - 1) * PAGE_SIZE;
        }

        try {
        const fav = await Favourite.find({}).populate().lean().exec();
        const docCount = await Favourite.find({}).countDocuments();
        return res.status(201).json({
            status: 'success',
            message: 'successful',
            items: 'book._id',
            data: fav,
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
    



//   getFavouritesByUserId: async (req, res) => {
//     const { UserId } = req.params;
//     try {
//     const fav = await Favourite.findByUserId(UserId)
//     return res
//         .status(201)
//         .json({ status: 'success', message: 'successful', items: 'book', data: fav });
//     } catch (err) {
//     return res
//         .status(500)
//         .json({ status: 'fail', message: 'server err', err });
//     }
// },

getFavouritesById: async (req, res) => {
    const { Id } = req.params;
    try {
    const fav = await Favourite.findById(Id)
    return res
        .status(201)
        .json({ status: 'success', message: 'successful', items: 'book', data: fav });
    } catch (err) {
    return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
},


    deleteAllFavourite: async (req, res) => {
        const { id } = req.params;
        try {
          const removedFav = await Favourite.deleteMany;
          removedFav.deleteAll();
        
          return res.status(200).json({ 
              status: 'success',
              message: 'Book removed from favourites successfully', data:removedFav
            });
        } catch (err) {
            return res.status(500).json({ 
                status: 'fail', 
                message: 'server err', 
                err 
              });
          }
        },
      


        deleteFavourite: async (req, res) => {
            const { id } = req.params;
            try {
              const removedFav = await Favourite.findById(id);
              removedFav.deleteOne();
            
              return res.status(200).json({ 
                  status: 'success',
                  message: 'All Books removed from favourites successfully', data:removedFav
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
    
