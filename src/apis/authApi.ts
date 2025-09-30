// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { appInfo } from "../constants/appInfos";
import axiosClient from "./axiosClient";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class AuthAPI{
    HandleAuthentication = async(
        url:string,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data?: any,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        method?: 'get'|'post'|'put'|'delete',
    )=>{
        return await axiosClient(`${appInfo.BASE_URL}/auth${url}`, {
            method:method??'get',
            data,
        });
    };
}
const authencationAPI = new AuthAPI();
export default authencationAPI;