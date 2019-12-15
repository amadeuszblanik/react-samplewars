import { KIND, ResultListResponse, ResultListResponseSingle } from "../dto";

export const getCurrentData = (data: ResultListResponse, kind: KIND): ResultListResponseSingle | undefined => {
  return data[kind!];
};
