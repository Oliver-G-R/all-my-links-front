import jwtDecode from 'jwt-decode'
import { TOKEN_USER } from '../constants/auth'
import { IPayloadToken, IPayloadVerifyToken } from '../models/payloadToken'
import { useCookies } from 'vue3-cookies'

const getAccessToken = (): string | null => {
  const { cookies } = useCookies()
  const userToken = cookies.get(TOKEN_USER)
  if (!userToken) {
    return null
  }
  return expiredToke(userToken as string) ? null : userToken as string
}

const expiredToke = (token: string):boolean => {
  const dataToken = jwtDecode<IPayloadToken>(token)
  const { exp } = dataToken
  const currentDate = (Date.now() + 60) / 1000
  return exp < currentDate
}

const getIDFromToken = (token:string):string => {
  const dataToken = jwtDecode<IPayloadToken>(token)
  return dataToken.id
}

const getDataFromToken = (token:string):IPayloadVerifyToken => {
  const dataToken = jwtDecode<IPayloadVerifyToken>(token)
  return dataToken
}

const logout = () => {
  const { cookies } = useCookies()
  cookies.remove(TOKEN_USER)
}

export {
  getAccessToken,
  getIDFromToken,
  getDataFromToken,
  expiredToke,
  logout
}
