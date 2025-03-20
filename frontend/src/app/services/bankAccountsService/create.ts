import { BankAccountType } from '../../entities/BankAccount';
import { httpClient } from '../HttpClient';

export interface CreateBankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: BankAccountType;
}

export async function create(params: CreateBankAccountParams) {
  const { data } = await httpClient.post('/bank-accounts', params);

  return data;
}
