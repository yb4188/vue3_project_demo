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
