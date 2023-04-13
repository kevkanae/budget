export interface DB {
  accounts: Account[];
  details: Detail[];
}

export interface Account {
  id: number;
  accountName: string;
  cardColor: string;
}

export interface Detail {
  id: number;
  accountName: string;
  createdAt: string;
  updatedAt: null | string;
  months: Month[];
}

export interface Month {
  monthID: number; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  income: BaseEntry[];
  expense: BaseEntry[];
  debt: BaseEntry[];
  investment: BaseEntry[];
}

export interface BaseEntry {
  createdAt: string;
  updatedAt: null | string;
  title: string;
  comments: null | string;
  amount: number;
}
