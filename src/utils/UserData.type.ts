export type BaseType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  comments: string;
  amount: number;
};

export type DB = {
  userData: [
    {
      id: string; // Account ID
      name: string;
      gradient: string;
      createdAt: string;
      updatedAt: string;
      data: {
        id: number; // Month (1-12)
        createdAt: string;
        updatedAt: string;
        income: BaseType[];
        expense: BaseType[];
        debt: BaseType[];
        investment: BaseType[];
      }[];
    }
  ];
};

export type AlternateDB = {
  userData: [
    {
      id: string; // Account ID
      name: string;
      gradient: string;
      createdAt: string;
      updatedAt: string;
      data: {
        id: number; // Month (1-12)
        createdAt: string;
        updatedAt: string;
        type: "income" | "expense" | "debt" | "investment";
        title: string;
        desc: string;
        amount: number;
      }[];
    }
  ];
};
