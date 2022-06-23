import { getAccessToken } from '../../helpers/validToken'
import { ILinksResponse, IStateFieldsLinks } from '../../models/Auth/User'
import { linksApi } from '../../axios/index'
import { catchError } from '../../helpers/errors'

const createNewLink = async (link:IStateFieldsLinks): Promise<ILinksResponse> => {
    try {
        const response = await linksApi.post('/links', link, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
        return response.data
    } catch (error) {
        return catchError(error)
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
        return catchError(error)
    }
}

const removeLink = async (id:string):Promise<{message: string}> => {
    try {
        const response = await linksApi.delete(`/links/${id}`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })

        return response.data
    } catch (error) {
        return catchError(error)
    }
}
export {
    createNewLink,
    updateLink,
    removeLink
}
