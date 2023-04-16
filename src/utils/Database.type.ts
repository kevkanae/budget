export interface OkaneDB {
  userData: AccountData[];
}

export interface AccountData {
  id: string;
  name: string;
  gradient: string;
  createdAt: string;
  updatedAt: string;
  data: Entry[];
}

export interface Entry {
  id: string;
  month: number; // Month ID (1-12)
  createdAt: string;
  updatedAt: string;
  type: string;
  title: string;
  desc: string;
  amount: number;
}
