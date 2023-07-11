interface DataInt {
  roleName: string;
  roleId: number;
  authority: number[];
}

export class RolesData {
  rolesList: DataInt[] = [];
}
