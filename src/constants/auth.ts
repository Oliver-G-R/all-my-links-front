import { CookiesConfig } from '../models/Auth/Auth'

export const TOKEN_USER = 'TOKEN_USER'

export const cookiesDev: CookiesConfig = {
  expireTimes: '2d',
  path: '/',
  domain: '',
  secure: false,
  sameSite: 'None'
}

export const cookiesProd: CookiesConfig = {
  expireTimes: '2d',
  path: '/',
  domain: 'https://all-my-links-front.vercel.app',
  secure: true,
  sameSite: 'None'
}
