import ajax from "./ajax";

//注册接口
export const reqRegister = (user) => ajax("/register", "POST", user);
//登录接口
export const reqLogin = (user) => ajax("/login", "POST", user);