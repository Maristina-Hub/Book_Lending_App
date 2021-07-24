import { userId } from '../models/userModel.js';
import {Favourites} from '../models/favouriteModel'

const FavouritesController = {
    createFavourite: async (req, res) => {
      let { userId, items, dateAdded } = req.body;
    },
 

    deleteFavourite: async (req, res) => {
        const { id } = req.params;
        try {
          const favourite = await Favourites.findById(id);
          favourite.deleteOne();
        
          return res.status(200).json({ 
              status: 'success',
              message: 'Book removed from favourites successfully', 
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
    
    export default FavouritesController