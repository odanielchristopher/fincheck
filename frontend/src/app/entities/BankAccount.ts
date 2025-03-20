export interface BankAccount {
  id: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
  currentBalance: number;
}

export type BankAccountType = 'INVESTMENT' | 'CHECKING' | 'CASH';
