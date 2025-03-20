import { httpClient } from '../HttpClient';

export async function remove(transaction: string) {
  const { data } = await httpClient.delete(`/transactions/${transaction}`);

  return data;
}
