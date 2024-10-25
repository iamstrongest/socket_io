import service from "./index";

export function getNotifiy(params) {
    const method = "get";
    const url = "/notify";
    return service({
      url,
      method,
      params,
    });
}
export function confirmNotifiy(data) {
  const method = "put";
  const url = "/notify";
  return service({
    url,
    method,
    data,
  });
}