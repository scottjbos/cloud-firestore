export interface Transaction {
    id?: string,
    amount: number;
    description: string;
    postDate: Date;
    transDate: Date;
    type: string;
  }