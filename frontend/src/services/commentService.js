import api from "./api";


export const createCommnet = async(postId,data)=>{
try {
    const res= await api.post(`/comments/${postId}`,data)

    return res


} catch (error) {
    
    console.log(error);
    
    throw error
}
}


export const getComment= async(postId)=>{

    try {
        const res= await api.get(`comments/${postId}`)
        return res
    } catch (error) {
        console.log(error);
        throw error
        
    }

}

export const deleteComment= async(commentId)=>{

try {
     const res= await api.delete(`comments/${commentId}`)
    return res
} catch (error) {
 
    console.log(error);
    
    throw error
}


}