export interface BookQueryParams {
    _start: number;
    _end: number;
    name_like: string;
    categoryId: string[]
}