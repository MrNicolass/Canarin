import CreateUserDTO from "@/models/interfaces/CreateUserDTO";
import api from "./api";
import { HttpStatusCode } from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_SERVER_URL ?? "";
const LOCALE_URL = process.env.EXPO_PUBLIC_USER_REGISTER ?? "";

const UserService = {

    async createUser(userData: CreateUserDTO): Promise<any> {
        const teste = await api.post(BASE_URL + LOCALE_URL, userData, {
            headers: {
                "Content-Type": "application/json",
            }
        }).catch(error => {
            console.log(error)
        })
        return teste
    }
	
}

export default UserService;