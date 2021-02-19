import ajax from "./ajax";

//注册接口
export const reqRegister = (user) => ajax("/register", "POST", user);
//登录接口
export const reqLogin = (user) => ajax("/login", "POST", user);
//更新接口
export const reqUpdate = (user) => ajax("/update", "POST", user);
//获取用户信息
export const reqUser = () => ajax("/user", "GET");