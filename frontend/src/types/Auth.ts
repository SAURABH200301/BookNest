export interface SignUpUserPayload {
  name: string;
  mobileNumberOrEmail: string;
  password: string;
  country: string;
}

export interface LoginUserPayload{
    email:string,
    password:string
}

export interface LoginUserResponse{
  data: {
    success: boolean;
    user_id?: string;
    jwtToken?: string;
    error?: string;
  } | null;
  error: any;
}