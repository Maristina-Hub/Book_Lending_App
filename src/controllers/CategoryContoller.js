import { Category } from '../models/categoryModel.js';

const CategoryController = {
  createCategory: async (req, res) => {
    const { name, description } = req.body;
    const role = req.user.role

    try {
      if (!role || role !== 'admin') {
        return res.status(401).json({ status: 'fail', message: 'unauthorized' });
      }
      if (!name || !description) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'Please fill all fields' });
      }

      const newCategory = new Category(req.body);
      const category = await newCategory.save();
      if (!category) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'something went wrong' });
      }
      return res
        .status(201)
        .json({ status: 'success', message: 'successful', data: category });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.find({}).lean().exec();
      return res
        .status(200)
        .json({ status: 'success', message: 'successful', data: categories });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getCategoryById: async (req, res) => {
    const categoryId = req.params.id;

    try {
    const book = await Category.findById(categoryId);
    if (book) {
    return res
        .status(200)
        .json({ status: 'success', message: 'successful', data: book });
    }
    return res
        .status(404)
        .json({ status: 'fail', message: 'category not found' });
    
    } catch (err) {
    return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  editCategory: async (req, res) => {
    const categoryId = req.params.id;
    const { name, description } = req.body;

    // Check if there's at least one information to update
    if(![ name, description ].some(Boolean)) {
      return res.status(400).json({
        status: "Failed", message: "All fields cannot be blank to update category"
      })
    }

    try {
      const category = await Category.findByIdAndUpdate(
        categoryId,
        req.body,
        { new: true }
      );
      /*
      // Alt:
      const category = await Category.findById(categoryId).exec();
      category.name = name;
      category.description = description;
      await category.save();
      */
      
      // If server error occurs OR no matching id was found
      if(!category) {
        return res.status(404).json({ 
          status: "Failed", message: "Error updating category"
        });
      }

      return res.status(200).json({ 
        status: "Success", 
        message: "Category updated successfully", 
        data: category
      });

    } catch (error) {
      return res.status(500).json({
        status: 'Fail',
        message: error.message
      });
    }
  },

  deleteCategory: async(req,res)=>{
    const role = req.user.role
    const categoryId = req.params.id;

    if (!role || role !== 'admin') {
      return res.status(401).json({ status: 'fail', message: 'unauthorized' });
    }
      
    try {
      const deletedCategory = await Category.findByIdAndRemove(categoryId);

      if (deletedCategory) {
        return res
          .status(200)
          .json({
            status: "success", message: "Category deleted"
        });
      }

      return res
          .status(404)
          .json({ status: 'fail', message: 'category not found' });
        
    } catch (error) {
        res.status(400).send(error.reason={msg: "id not found"});
    }
  }
}

export default CategoryController;