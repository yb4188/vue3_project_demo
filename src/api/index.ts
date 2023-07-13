import service from "@/untils/request";

//设置登录的接口类型
interface loginData {
  username: string;
  password: string;
}
//登录 接口
export function login(data: loginData) {
  return service({
    url: "/login",
    method: "POST",
    data,
  });
}

//获取 商品 接口
export function getShopList() {
  return service({
    url: "/getGoodsList",
    method: "GET",
  });
}

//获取用户接口
export function getUsersList() {
  return service({
    url: "/getUserList",
    method: "get",
  });
}

//获取角色接口
export function getRolesList() {
  return service({
    url: "/getRoleList",
    method: "get",
  });
}

//获取权限接口
export function getAuthList() {
  return service({
    url: "/getAuthorityList",
    method: "get",
  });
}
