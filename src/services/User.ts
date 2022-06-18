import { linksApi } from '../axios/index'
import { getAccessToken } from '../helpers/validToken'
import { ILinksResponse, IstateLinks, Iuser } from '../models/Auth/User'

const getUserByNickName = async (nickName:string): Promise <Iuser> => {
    try {
        const reponse = await linksApi.get<Iuser>(`/user/get-by-nickName/${nickName}`)
        return reponse.data
    } catch (error) {
        return error.response.data.message
    }
}

const createNewLink = async (link:IstateLinks): Promise<ILinksResponse> => {
    try {
        const response = await linksApi.post('/links', link, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export {
    getUserByNickName,
    createNewLink
}
