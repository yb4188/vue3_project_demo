// export interface listInt {
//   userId: number;
//   title: string;
//   introduce: string;
// }

// interface searchData {
//   title: string;
//   introduce: string;
//   page: number;
//   count: number;
//   pagesize: number;
// }

// export class shopList {
//   searchData: searchData = {
//     title: "",
//     introduce: "",
//     page: 1,
//     count: 0,
//     pagesize: 10,
//   };
//   list: listInt[] = [];
// }

export interface listInt {
  userId: number;
  title: string;
  introduce: string;
}

interface searchDataInt {
  title: string;
  introduce: string;
  page: number;
  count: number;
  pagesize: number;
}

export class shopList {
  searchData: searchDataInt = {
    title: "",
    introduce: "",
    page: 1,
    count: 0,
    pagesize: 5,
  };
  list: listInt[] = [];
}
