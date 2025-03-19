import { httpClient } from '../HttpClient';
import { BankAccountType } from './create';

type BankAccountsResponse = Array<{
  id: string;
  name: string;
  initialBalance: number;
  type: BankAccountType,
  color: string;
  currentBalance: number;
}>

export async function getAll() {
  const { data } = await httpClient.get<BankAccountsResponse>('/bank-accounts');

  return data;
}
