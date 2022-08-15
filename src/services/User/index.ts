import { linksApi } from '../../axios/index'
import { catchError } from '../../helpers/errors'
import { getAccessToken } from '../../helpers/validToken'
import { IGenericResponse, IStateFieldsUser, Iuser } from '../../models/Auth/User'

const getUserByNickName = async (nickName:string): Promise <IGenericResponse<Iuser>> => {
    try {
        const response = await linksApi.get<Iuser>(`/user/get-by-nickName/${nickName}`)

        return {
            data: response.data
        }
    } catch (error) {
        return {
            error: catchError(error)
        }
    }
}

const updateProfile = async (user:IStateFieldsUser):Promise<IGenericResponse<Iuser>> => {
    try {
        const response = await linksApi.put('/user/update-profile', user, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
        return response.data
    } catch (error) {
        return {
            error: catchError(error)
        }
    }
}

const uploadAvatar = async (img:FormData):Promise<IGenericResponse<{avatar_url:string}>> => {
    try {
        const response = await linksApi.post<{avatar_url:string}>('/user/upload-avatar', img, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-Type': 'multipart/form-data'
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

export {
    getUserByNickName,
    updateProfile,
    uploadAvatar
}
