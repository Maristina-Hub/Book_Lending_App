

import {Favourite} from '../models/favouriteModel.js'



 export const FavouritesController = {
    createFavourite: async (req, res) => {
      let { userId, items, AuthValidator} = req.body;
      if (!role || role !== 'user') {
        return res.status(401).json({ status: 'fail', message: 'Only registered user can add book to favourite' });
        }
      try {
      userId = new User({firstname: 'Aaron'})
      items = new Book ({})

   
        const newFav = new Favourite(req.body);
        const fav = await newFav.save();
        if (!fav) {
            return res
            .status(400)
            .json({ status: 'fail', message: 'something went wrong' });
        }
        return res
            .status(201)
            .json({ status: 'success', message: 'favourite book added successfully', items: book._id, data: book});
        } catch (err) {
        return res
            .status(500)
            .json({ status: 'fail', message: 'server err', err });
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
    



getFavouriteById: async (req, res) => {
    const { id } = req.params;
    try {
    const fav = await Favourite.findById(id)
    return res
        .status(201)
        .json({ status: 'success', message: 'successful', items: 'book', data: fav });
    } catch (err) {
    return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
},

    deleteFavourite: async (req, res) => {
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
      


        deleteAllFavourite: async (req, res) => {
            const { id } = req.params;
            try {
              const removedFav = await Favourite.findById(id);
              removedFav.deleteAll();
            
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
    
