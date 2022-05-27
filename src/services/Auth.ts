import { IResponseUser, ISignIn, ISignUp } from '../models/Auth/Auth'
import { axiosConfig } from '../axios/index'

const signUp = async ({ nickName, email, password }:ISignUp): Promise<IResponseUser> => {
    try {
        const response = await axiosConfig.post<IResponseUser>('/auth/signUp', {
            nickName,
            email,
            password
        })

        return response.data
    } catch (err) {
       return err.response.data
    }
}
const signIn = async ({ nickNameOrEmail, password }:ISignIn):Promise<IResponseUser> => {
    try {
        const response = await axiosConfig.post('/auth/signIn', {
            nickNameOrEmail,
            password
        })

        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

export default {
    signIn,
    signUp
}
