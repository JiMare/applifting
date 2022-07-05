export const getRequestHeaders = () => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("X-API-KEY", process.env.REACT_APP_API_KEY!);
  return requestHeaders;
};
