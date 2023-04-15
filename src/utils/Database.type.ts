export interface DB {
  accounts: Account[];
  details: Detail[];
}

export interface Account {
  id: string;
  accountName: string;
  cardColor: string;
}

export interface Detail {
  id: string;
  accountName: string;
  createdAt: string;
  updatedAt: string;
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
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  comments: null | string;
  amount: number;
}
