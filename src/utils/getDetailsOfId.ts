import { getCurrentData } from "./getCurrentData";
import { KIND, ResultListResponse } from "../dto";

export const getDetailsOfId = (data: ResultListResponse, id: number, kind: KIND) => {
  const dataKind = getCurrentData(data, kind);

  if (dataKind === undefined) {
    return;
  }

  const dataOfId = dataKind.list[id];

  if (dataOfId === undefined) {
    return;
  }

  return dataOfId.data;
};
