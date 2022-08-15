import { getAccessToken } from '../../helpers/validToken'
import { IGenericResponse, Ilink, IStateFieldsLinks } from '../../models/Auth/User'
import { linksApi } from '../../axios/index'
import { catchError } from '../../helpers/errors'

const createNewLink = async (link:IStateFieldsLinks): Promise<IGenericResponse<Ilink>> => {
    try {
        const response = await linksApi.post('/links', link, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
        return {
            data: response.data
        }
    } catch (error) {
        return {
            error: catchError(error)
        }
    }
}

const updateLink = async (link: IStateFieldsLinks, id:string):Promise<IGenericResponse<Ilink>> => {
    try {
        const response = await linksApi.put(`/links/${id}`, link, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
        return {
            data: response.data
        }
    } catch (error) {
        return {
            error: catchError(error)
        }
    }
}

const removeLink = async (id:string):Promise<IGenericResponse<number>> => {
    try {
        const response = await linksApi.delete(`/links/${id}`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })

        return {
            data: response.data
        }
    } catch (error) {
        return {
            error: catchError(error)
        }
    }
}

const createPrincipalAccount = async (idLink:string):Promise<IGenericResponse<Ilink>> => {
    try {
        const response = await linksApi.post(`/user/set-principal-account/${idLink}`, undefined, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })

        return {
            data: response.data
        }
    } catch (error) {
        return {
            error: catchError(error)
        }
    }
}

const deletePrincipalAccount = async (idLink:string):Promise<IGenericResponse<number>> => {
    try {
        const response = await linksApi.delete(`/user/remove-principal-account/${idLink}`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })

        return {
            data: response.status
        }
    } catch (error) {
        return {
            error: catchError(error)
        }
    }
}
export {
    createNewLink,
    updateLink,
    removeLink,
    createPrincipalAccount,
    deletePrincipalAccount
}
