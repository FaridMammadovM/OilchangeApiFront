export interface IUser {
  id: string
  name: string
  surname: string
  username: string
}

export interface ITokens {
  accessToken: string | null
  refreshToken: string | null
  refreshTokenExpiryTime: string | null;
}

export interface IAuthResponse extends ITokens {
  requiresOtp: boolean
  message: string | null
}

export interface ILoginBody {
  phone: string
  password: string
}