import CreateUserDTO from "@/models/interfaces/CreateUserDTO";
import api from "./api";
import { HttpStatusCode } from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_SERVER_URL ?? "";
const LOCALE_URL_REGISTER = process.env.EXPO_PUBLIC_USER_REGISTER ?? "";
const LOCALE_URL_GETUSER = process.env.EXPO_PUBLIC_USER_GETUSER ?? "";

const UserService = {

    async createUser(userData: CreateUserDTO): Promise<any> {
        const retorno = await api.post(BASE_URL + LOCALE_URL_REGISTER, userData, {
            headers: {
                "Content-Type": "application/json",
            }
        }).catch(error => {
            console.log(error)
        })
        return retorno
    },
	
    async getUserByLogin(login: string): Promise<any> {
        const retorno = await api.get(BASE_URL + LOCALE_URL_GETUSER, {
            params: { login },
            headers: {
                "Content-Type": "application/json",
            }
        }).catch(error => {
            console.log(error)
        })
        return retorno
    }
}

export default UserService;