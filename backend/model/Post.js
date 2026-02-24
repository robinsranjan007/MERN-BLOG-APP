import mongoose from "mongoose";
 

const PostSchema = new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    isPublished:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Post = mongoose.model("Post",PostSchema)
export default Post