export const BASE_URL="http://164.92.114.212:8081";

export const LOGIN=`${BASE_URL}/api/auth/login`;
export const REGISTER=`${BASE_URL}/api/auth/register`;
export const CHECK=(email,code)=>`${BASE_URL}/api/auth/check-code?email=${email}&code=${code}`;