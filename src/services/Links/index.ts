import { getAccessToken } from '../../helpers/validToken'
import { ILinksResponse, IStateFieldsLinks } from '../../models/Auth/User'
import { linksApi } from '../../axios/index'

const createNewLink = async (link:IStateFieldsLinks): Promise<ILinksResponse> => {
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

const updateLink = async (link: IStateFieldsLinks, id:string):Promise<ILinksResponse> => {
    try {
        const response = await linksApi.put(`/links/${id}`, link, {
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
    createNewLink,
    updateLink
}
