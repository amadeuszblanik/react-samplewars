import { KIND, ResultListResponse, ResultListResponseSingle } from "../dto";

export const getDataOfKind = (data: ResultListResponse, kind: KIND): ResultListResponseSingle | undefined => {
  return data[kind!];
};
