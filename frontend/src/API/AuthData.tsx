import axios from "axios";
import { jsonParseSafe } from "../helpers/jsonParse";
import { LoginUserPayload, LoginUserResponse, SignUpUserPayload } from "../types/Auth";

const SIGNUP_URL = "http://localhost:3333/api/auth/createuser";
const LOGIN_URL = "http://localhost:3333/api/auth/login";

export async function signUpUser(payload: SignUpUserPayload): Promise<{
  data: { jwtToken: string; success: boolean; user_id: string } | null;
  error: any;
}> {
  try {
    const response = await axios.post(SIGNUP_URL, payload);
    return { data: jsonParseSafe(response.data, response.data), error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

export async function loginUser(payload: LoginUserPayload): Promise<LoginUserResponse> {
  try {
    const response = await axios.post(LOGIN_URL, payload);
    return { data: jsonParseSafe(response.data, response.data), error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}
