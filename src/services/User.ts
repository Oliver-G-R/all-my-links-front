import { linksApi } from '../axios/index'
import { Iuser } from '../models/Auth/User'

const getUserByNickName = async (nickName:string): Promise <Iuser> => {
    try {
        const reponse = await linksApi.get<Iuser>(`/user/get-by-nickName/${nickName}`)
        return reponse.data
    } catch (error) {
        return error.response.data
    }
}

export {
    getUserByNickName
}
