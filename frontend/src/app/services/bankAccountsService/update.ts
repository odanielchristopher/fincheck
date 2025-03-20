import { BankAccountType } from '../../entities/BankAccount';
import { httpClient } from '../HttpClient';

export interface UpdateBankAccountParams {
  id: string;
  name: string;
  initialBalance: number;
  color: string;
  type: BankAccountType;
}

export async function update({ id, ...params }: UpdateBankAccountParams) {
  const { data } = await httpClient.put(`/bank-accounts/${id}`, params);

  return data;
}
