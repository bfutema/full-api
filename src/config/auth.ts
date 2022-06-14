interface IAuthConfig {
  jwt: {
    secret_token: string;
    expires_in_secret_token: string;
    secret_refresh_token: string;
    expires_in_secret_refresh_token: string;
  };
}

const authConfig: IAuthConfig = {
  jwt: {
    secret_token: process.env.JWT_EXPIRES_IN_TOKEN,
    expires_in_secret_token: process.env.JWT_EXPIRES_IN_TOKEN,
    secret_refresh_token: process.env.JWT_SECRET_REFRESH_TOKEN,
    expires_in_secret_refresh_token: process.env.JWT_EXPIRES_IN_REFRESH_TOKEN,
  },
};

export { authConfig };
