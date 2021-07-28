    import { response } from 'express';
    import {Wish} from '../models/wishListModel.js';

    // const newWish = new Wish(req.body)
      

    const WishController ={
        postWish: async(req, res) =>{

            // const { wishlist, role } = req.body;
            // if (!role || role !== 'normal') {
            // return res.status(401).json({ status: 'fail', message: 'unauthorized' });
            // }
            
        
            try{
                const newWish = new Wish(req.body);
                const response = await newWish.save();
                if(response){
                    return res
                    .status(201)
                    .json({ status: 'success', message: 'successful', data: response });

                    
                }
    
                return res.status(400).json({
                    status: 'failed',
                    message: 'oops something went wrong',
                    
                });
            
            } catch(err){
                res.status(400).json('server error');
            }
    
        },
    
        getWish: async(req, res) => {
    
            // const PAGE_SIZE = 20;
            //         let page = 1;
            //         let skip;
            //         if (req.query.page) {
            //         page = Number(req.query.page);
            //         skip = (page - 1) * PAGE_SIZE;
            //         }
               
                try {
                  const newWish = new Wish(req.body);
                  const wishes = await Wish.find(); 
                  return res
                  .status(201)
                  .json({ status: 'success', message: 'successful', data: wishes });
    
                  console.log(wishes);
                  return wishes;
                //   const docCount = await Book.find({}).countDocuments();
                //           return res.status(201).json({
                //               status: 'success',
                //               message: 'successful',
                //               data: wishes,
                //               documentCount: docCount,
                //               totalPages: Math.ceil(docCount / PAGE_SIZE),
                //               nextPage:
                //               Math.ceil(docCount / PAGE_SIZE) > page ? `/${page + 1}` : null,
                //           });
                
                } catch(e) {
                    return res.status(500).json('server error');
                }
        },
    
        deleteWish: async(req, res) => {
            const {id}= req.params;
            try{
            // console.log(req.params.id)
                const DeleteRequest = await newWish.findByIdAndDelete(id);
                res.json(DeleteRequest);
            } catch(e) {
                res.status(500).send("Couldn't delete your wishlist :(");
            }
        },
    
        deleteAllWish: async(req, res) => {
        
            try{
                // console.log(req.params.id)
                const newWish = new Wish(req.body);
                const DeleteRequest = await Wish.deleteMany();
                res.json(DeleteRequest);
            } catch(e) {
                res.status(500).send("Couldn't delete all your wishlist :(");
            }
        }
    }

export default WishController;






