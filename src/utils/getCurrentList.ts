import { KIND, ResultListResponse, ResultListResponseSingle } from "../dto";

export const getCurrentList = (data: ResultListResponse, kind: KIND) => {
  const dataKind: ResultListResponseSingle | undefined = data[kind!];
  return typeof dataKind !== "undefined" ? dataKind.list : [];
};
