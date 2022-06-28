import { getAccessToken } from '../../helpers/validToken'
import { ILinksResponse, IStateFieldsLinks } from '../../models/Auth/User'
import { linksApi } from '../../axios/index'
import { catchError } from '../../helpers/errors'
import { IResponseError } from '../../models/Auth/Auth'

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

const createPrincipalAccount = async (idLink:string):Promise<ILinksResponse> => {
    try {
        const response = await linksApi.post(`/user/set-principal-account/${idLink}`, undefined, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })

        return response.data
    } catch (error) {
        console.log(error)
        return catchError(error)
    }
}

const deletePrincipalAccount = async (idLink:string):Promise<IResponseError> => {
    try {
        const response = await linksApi.delete(`/user/remove-principal-account/${idLink}`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })

        return response.data
    } catch (error) {
        console.log(error)
        return catchError(error)
    }
}
export {
    createNewLink,
    updateLink,
    removeLink,
    createPrincipalAccount,
    deletePrincipalAccount
}
