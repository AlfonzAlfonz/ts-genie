export const fetcher = <T>(
  path: string,
  query: Record<string, string>
): Promise<T> =>
  fetch(path + "?" + new URLSearchParams(query).toString()).then((r) =>
    r.json()
  );
