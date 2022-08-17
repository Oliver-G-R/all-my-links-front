import { catchError } from '../../helpers/errors'
import { IGenericResponse } from '../../models/Auth/User'
import { JWTResponse, IPayloadVerifyToken } from '../../models/payloadToken'
import { linksApi } from '../../axios/index'

const createUserAfterConfirm = async (token:string):Promise<IGenericResponse<JWTResponse>> => {
    try {
        const response = await linksApi.post<JWTResponse>(`/auth/create-user-after-confirmation/${token}`)
        return {
            data: response.data
        }
    } catch (e) {
        return {
            error: catchError(e)
        }
    }
}

const resendEmailWithToken = async (user:IPayloadVerifyToken):Promise<IGenericResponse<number>> => {
    try {
      const respone = await linksApi.post('/auth/confirm-email', {
        email: user.email,
        fullName: user.fullName,
        nickName: user.nickName,
        password: user.pass
      })
     return {
        data: respone.status
     }
    } catch (e) {
      return {
        error: catchError(e)
      }
    }
  }

export {
    createUserAfterConfirm,
    resendEmailWithToken
}
