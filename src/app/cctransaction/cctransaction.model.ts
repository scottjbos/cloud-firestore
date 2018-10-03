export interface Transaction {
    id: string,
    amount: number;
    description: string;
    postDate: Date;
    transDate: Date;
    completed: boolean;
    type: string;
  }