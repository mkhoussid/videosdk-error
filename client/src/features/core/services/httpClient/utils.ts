import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

export const createPostBody = (data: AxiosRequestConfig['data']): string => JSON.stringify(data);

export type TCreateformData = {
	field: string;
};

export const getCancelToken = (): CancelTokenSource => axios.CancelToken.source();
