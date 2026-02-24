import Comment from "../model/Comment.js";

const createCommnet = async (req, res) => {
  try {
    const { text } = req.body;
    const  userId  = req.user.id;
    const { postId } = req.params;


if(!text)
{
     return res.status(400).json({
        message:"No text found",
        success:false
    })
}

  const comments=  await Comment.create({ text, post:postId, commentedBy:userId });

    res.status(200).json({
      message: "successfully create commnets",
      success: true,
      comments: comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
  }
};



const deleteComment = async (req,res)=>{
try {
    
const {id}=req.params


const  comment= await Comment.findByIdAndDelete(id)
if(!comment)
{
      return res.status(404).json({
        message:"No commnet found",
        success:false
    })
}

return res.status(200).json({
    message:"commnet deleted successfully",
    success:true
})



} catch (error) {
    
  return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
    

}
}



const getCommentsByPost=async(req,res)=>{

 try {
    
   const {postId} = req.params

   const comment=await Comment.find({post:postId}).populate('commentedBy','name email')
if(comment.length===0)
{
      return res.status(404).json({
        message:"No commnets found",
        success:false
    })
}


res.status(200).json({
   success:true,
    comment
})

 } catch (error) {
      return res.status(500).json({
      message: "Server Error",
      success: false,
      error: error.message,
    });
    
 }

}

export { createCommnet, deleteComment, getCommentsByPost }