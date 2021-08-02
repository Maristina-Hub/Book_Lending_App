import { Category } from '../models/categoryModel.js';

const CategoryController = {
  createCategory: async (req, res) => {
    const { name, description, role } = req.body;
    if (!role || role !== 'admin') {
      return res.status(401).json({ status: 'fail', message: 'unauthorized' });
    }
    if (!name || !description) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Please fill all fields' });
    }

    try {
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

  getCategory: async (req, res) => {
    try {
      const categories = await Category.find({}).lean().exec();
      return res
        .status(201)
        .json({ status: 'success', message: 'successful', data: categories });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  editCategory: async (req, res) => {
    // Extract catgeory id passed
    const { id } = req.params;
    const { name, description } = req.body;

    // Check if there's at least one information to update
    if(![ name, description ].some(Boolean)) {
      return res.status(400).json({
        status: "Failed", message: "All fields cannot be blank to update category"
      })
    }

    try {
      const category = await Category.findById(id).exec();
      category.name = name;
      category.description = description;
      await category.save();
      
      // If server error occurs OR no matching id was found
      if(!category) return res.status(404).json({ 
        status: "Failed", message: "Oops! Error updating category"
      });

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
}

export default CategoryController;