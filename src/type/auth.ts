export class initData {
  id: number;
  auth: number[];
  list: authInt[] = [];
  treeRef: any;
  constructor(id: number, auth: number[]) {
    this.id = id;
    this.auth = auth;
  }
}

interface authInt {
  name: string;
  roleId: number;
  viewRole?: string;
  roleList?: authInt[];
}
