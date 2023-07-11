//用户接口
export interface userInt {
  id: number;
  nickName: string;
  userName: string;
  role: userRoleInt[];
}

//用户的角色信息
export interface userRoleInt {
  role: number;
  roleName: string;
}

export interface roleListInt {
  roleName: string;
  roleId: number;
  authority: [];
}

export interface searchDataInt {
  role: number;
  nickName: string;
}

export interface activeInt {
  id: number;
  nickName: string;
  userName: string;
  role: number[];
}

export class InitData {
  usersList: userInt[] = [];
  rolesList: roleListInt[] = [];
  searchData: searchDataInt = {
    role: 0,
    nickName: "",
  };
  isShow = false;
  activeInfo: activeInt = {
    id: 0,
    nickName: "",
    userName: "",
    role: [],
  };
}
