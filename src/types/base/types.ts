export type Result<T, V = any> = {
  data?: T //指定类型
  code: number,
  msg: string
  rows?: Array<V>;
  total?: number;
}
export type PrimaryKey = {
  id: string | number
}

export type Pagination = {
  pageSize: number,
  pageNum: number,
  orderByColumn?: string,
  isAsc?: 'desc' | 'asc',
}
export type dictionaryResponse = Array<{
  dictValue: string
  dictType: string
  dictLabel: string
}>
