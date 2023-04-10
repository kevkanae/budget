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
  createdAt: number;
  updatedAt: null | number;
  months: Month[];
}

export interface Month {
  month: string;
  income: BaseEntry[];
  expense: BaseEntry[];
  debt: BaseEntry[];
  investment: BaseEntry[];
}

interface BaseEntry {
  createdAt: number;
  updatedAt: null | number;
  title: string;
  comments: null | string;
  amount: string;
}
