import axios from "axios";
import { jsonParseSafe } from "../helpers/jsonParse";
import { UserInterface } from "../types/User";

const USER_URL = "http://localhost:3333/api/user/";

export async function getUserByIdHelper(
  userId: string
): Promise<{ data: UserInterface | null; error: any }> {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { data: null, error: "Please LogIn" };
    }
    const response = await axios.get(USER_URL + userId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: jsonParseSafe(response.data, response.data), error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}
