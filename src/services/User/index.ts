import { linksApi } from '../../axios/index'
import { catchError } from '../../helpers/errors'
import { getAccessToken } from '../../helpers/validToken'
import { IAvatarResponse, IStateFieldsUser, IUserResponse } from '../../models/Auth/User'

const getUserByNickName = async (nickName:string): Promise <IUserResponse> => {
    try {
        const reponse = await linksApi.get(`/user/get-by-nickName/${nickName}`)
        return reponse.data
    } catch (error) {
        return catchError(error)
    }
}

const updateProfile = async (user:IStateFieldsUser):Promise<IUserResponse> => {
    try {
        const response = await linksApi.put('/user/update-profile', user, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
        return response.data
    } catch (error) {
        return catchError(error)
    }
}

const uploadAvatar = async (img:FormData):Promise<IAvatarResponse> => {
    try {
        const response = await linksApi.post('/user/upload-avatar', img, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        return catchError(error)
    }
}

export {
    getUserByNickName,
    updateProfile,
    uploadAvatar
}
