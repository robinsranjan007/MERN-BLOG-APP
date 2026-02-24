import Post from "../model/Post.js";

const createPost = async (req, res) => {
  try {
    const { category, title, body } = req.body;

    if (!category || !title || !body) {
      return res.status(400).json({
        message: "please provide the missing details",
        success: false,
      });
    }

   const post=await Post.create({ title, body, category, createdBy: req.user.id });

    res.status(201).json({
      message: "post created successfully",
      success: true,
      post:  post
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
  }
};

const getAllPost = async (req, res) => {
  try {
    const post = await Post.find()
      .populate("category")
      .populate("createdBy", "name email");

    if (post.length === 0) {
      return res.status(404).json({
        message: "Not found",
        sucess: false,
      });
    }

    return res.status(200).json({
      success:true,
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId)
      .populate("createdBy", "name email")
      .populate("category");

    if (!post) {
      return res.status(404).json({
        message: "Not found",
        sucess: false,
      });
    }

    return res.status(200).json({
      success:true,
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, category } = req.body;

    let post = await Post.findByIdAndUpdate(
      id,
      {
        title: title,    
        body: body,
        category: category,
      },
      { new: true },
    );

    if(!post)
    {
         return res.status(400).json({
      message: "No post found",
      success: false
    });
    }

    return res.status(200).json({
        message:"Post updated Successfully",
        success:true,
        post
    })



  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
  }
};


const deletePost=async(req,res)=>{
try {
    const {id} = req.params

let post=await Post.findByIdAndDelete(id)

if(!post)
{
     return res.status(400).json({
      message: "Post not found",
      success: false,
    });
}

return res.status(200).json({
    message:"successfully deleted",
    sucess:true
})
} catch (error) {
     return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
}





}

export { createPost, getAllPost, getPostById, updatePost, deletePost }