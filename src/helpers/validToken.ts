import jwtDecode, { JwtPayload } from 'jwt-decode'
import { TOKEN_USER } from '../constants/auth'

const getAccessToken = () => {
  const userToken = window.localStorage.getItem(TOKEN_USER)
  if (!userToken) {
    return null
  }
  return expiredToke(userToken as string) ? null : userToken as string
}

const expiredToke = (token: string):boolean => {
  const dataToken = jwtDecode(token)
  const { exp } = dataToken as JwtPayload
  const currentDate = (Date.now() + 60) / 1000
  return exp as number < currentDate
}

const logout = () => {
  window.localStorage.removeItem(TOKEN_USER)
}

export {
  getAccessToken,
  logout
}
