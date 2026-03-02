 
import api from "./api";



 export const register=async(data)=>{

      try {
        const res= await api.post(`/auth/register`,data)
        return res
      } catch (error) {
        console.log(error);
        throw error
      }

 }


export const login=async(data)=>{

    try{
        const res= await api.post(`/auth/login`,data)
        return res
    }
    catch(error)
    {
        console.log(error);
        throw error
    }

}


export const logout=async()=>{
try {
    const res= await api.post(`/auth/logout`)
return res

} catch (error) {
console.log(error);
    throw error
}
}

export const getMe = async () => {
    const res = await api.get('/auth/me')
    return res
}