import { Category } from '../../entities/Category';
import { httpClient } from '../HttpClient';

type CategoriesResponse = Category[];

export async function getAll() {
  const { data } = await httpClient.get<CategoriesResponse>('/categories');

  return data;
}
