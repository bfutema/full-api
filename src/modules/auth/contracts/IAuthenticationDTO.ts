/**
 * Method: POST
 * Description: Creation of login and JWT token
 */
export interface ILoginJWTTokenRequest {
  email: string;
  password: string;
  client_key: string;
}

export interface ILoginJWTTokenResponse {
  token: string;
  refresh_token: string;
}

/**
 * Method: DELETE
 * Description: Logout of user
 */
export interface ILogoutRequest {
  user_id: number;
}

/**
 * Create User Token
 */
export interface ICreateUserToken {
  client_key: string;
  user_id: number;
  expires_date: Date;
  refresh_token: string;
}

/**
 * Validate JWT token
 */
export interface IValidateJWTTokenRequest {
  token: string;
}

export interface IValidateJWTTokenResponse {
  payload: ITokenPayload;
  isValid: boolean;
  code: string;
}

/**
 * Token Payload
 */
export interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  id: number;
  email: string;
  name: string;
  // claims: IUsersClaims[];
}
