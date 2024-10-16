import { Category } from "./category";

export interface Transaction {
    id?: number;
    type: string;
    amount: number;
    beneficiary: string;
    date: Date;
    category: keyof Category;
}
