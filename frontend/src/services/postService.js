import api from "./api";


export const getPost=async()=>{

try {
    const res= await api.get(`/post/`)
    return res
} catch (error) {
    console.log(error);
    
    throw error

}

}


export const getPostById= async(postId)=>{

try {

    const res= await api.get(`/post/${postId}`)
    return res

} catch (error) {
    console.log(error);
    throw error
    
}
}

export const createPost = async(data)=>{
    try {
        const res= await api.post(`/post`,data)
        return res
    } catch (error) {
        console.log(error);
        throw error
    }
}


export const updatePost = async(data,postId)=>{
try {

    const res = await api.put(`/post/${postId}`,data)
    return res
} catch (error) {
    console.log(error);
    throw error

}



}


export const deletePost=async(postId)=>{
    try {
        const res =await api.delete(`/post/${postId}`)
        return res
    } catch (error) {
     console.log(error);
     
        throw error
    }
}