
import api from "./api";


export const createCategories=async(data)=>{

try {
const res =await api.post(`/categories`,data)
return res


} catch (error) {

console.log(error);
    throw error
}

}


export const getAllCategory=async()=>{

try {
const res = await api.get(`categories`)

return res
    
} catch (error) {
    console.log(error);
    throw error
}

}

export const deleteCategory= async(categoryId)=>{
   try {
      const res= await api.delete(`/categories/${categoryId}`)
        return res
   } catch (error) {
       console.log(error);
     throw error
   }
}