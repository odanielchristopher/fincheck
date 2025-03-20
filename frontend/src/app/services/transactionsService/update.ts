import { Transaction } from '../../entities/Transaction';
import { httpClient } from '../HttpClient';

export interface UpdateTransactionParams {
  id: string;
  name: string;
  value: number;
  date: string;
  bankAccountId: string;
  categoryId: string;
  type: Transaction['type'];
}

export async function update({ id, ...params }: UpdateTransactionParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, params);

  return data;
}
