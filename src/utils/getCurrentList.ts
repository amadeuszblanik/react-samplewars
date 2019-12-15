import { KIND, ResultListResponse } from "../dto";
import { getDataOfKind } from "./getDataOfKind";

export const getCurrentList = (data: ResultListResponse, kind: KIND) => {
  const dataKind = getDataOfKind(data, kind);
  return typeof dataKind !== "undefined" ? dataKind.list : [];
};
