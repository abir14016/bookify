import jwt_decode from "jwt-decode";

export const parseAccessToken = (accessToken: string) => {
  try {
    const decoded = jwt_decode(accessToken);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};
