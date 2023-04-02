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
  income: Income[];
  expense: Expense[];
  debt: Debt[];
  investment: Investment[];
}

export interface Income {
  createdAt: number;
  updatedAt: null | number;
  title: string;
  comments: null | string;
  amount: string;
}

export interface Expense {
  createdAt: number;
  updatedAt: null | number;
  title: string;
  comments: null | string;
  amount: string;
}

export interface Debt {
  createdAt: number;
  updatedAt: null | number;
  title: string;
  comments: null | string;
  amount: string;
}

export interface Investment {
  createdAt: number;
  updatedAt: null | number;
  title: string;
  comments: null | string;
  amount: string;
}
