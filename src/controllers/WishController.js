import { response } from 'express';
import {Wish} from '../model/wishListModel.js';

// const newWish = new Wish(req.body)

export const postWishController = async(req, res) =>{

    const newWish = new Wish(req.body)

    try{
        const response = await newWish.save();
           if(response){
             return res.status(201).json("Wish Added to Wishlist!");
            
         }

         return res.status(400).json({
            status: 'failed',
            message: 'oops something went wrong',
            
        });
      
    } catch(err){
        res.status(400).json('bad request');
    }

}

export const getWishController = async(req, res) => {

   
        try {
            
                const Wishes = await newWish.find();
                res.json(Wishes);
            
           
        } catch(e) {
            return res.status(500).json('bad request')
        }
    


}


// export const updateWishController = async(req, res) =>{
//     try {
//         const _id = req.params.id
//         const UpdateRequest = await newWish.findByIdAndUpdate(_id, req.body)
//         res.json(UpdateRequest);
//     } catch(e) {
//         res.status(404).send("Couldn't update your wish :(");
//     }
// }

export const deleteWishController = async(req, res) => {
    try{
        console.log(req.params.id)
        const DeleteRequest = await newWish.findByIdAndDelete(req.params.id);
        res.json(DeleteRequest);
    } catch(e) {
        res.status(500).send("Couldn't delete your wish :(");
    }
}




