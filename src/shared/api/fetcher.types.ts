export interface FetchError extends Error {
  info?: unknown;
  status?: number;
}
