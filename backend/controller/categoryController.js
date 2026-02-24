import Category from "../model/Category.js";

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "please provide the category",
        success: false,
      });
    }

    const category = await Category.create({ name });

    return res.status(200).json({
        success:true,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();

    if (category.length === 0) {
      return res.status(400).json({
        message: "No category found",
        success: false,
      });
    }

    return res.status(200).json({
        sucess:true,
      category
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findByIdAndDelete({ categoryId });
    if (!category) {
      return res.status(400).json({
        message: "No category found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "successfully deleted",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
  }
};


export {deleteCategory,getAllCategory,createCategory} 