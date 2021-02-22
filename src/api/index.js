import ajax from "./ajax";

//注册接口
export const reqRegister = (user) => ajax("/register", "POST", user);
//登录接口
export const reqLogin = (user) => ajax("/login", "POST", user);
//更新接口
export const reqUpdate = (user) => ajax("/update", "POST", user);
//获取用户信息
export const reqUser = () => ajax("/user", "GET");
//获取用户列表
export const reqUserList = (type) => ajax("/userlist", "GET", {type});
//获取当前用户的聊天消息列表
export const reqChatMsgList = () => ajax("/msglist", "GET");
//修改指定消息为已读
export const reqReadMsg = (from) => ajax("/readmsg", "POST", {from});