
/**
 * Concats path segments with only "/" between them
 * @param s first path segment
 * @param segments other path segments
 * @returns concatenated path
 */
export const joinPath = (...[s, ...segments]: string[]) =>
  segments.reduce(concatPath, s);

const concatPath = (a: string, b: string) =>
  a.endsWith("/") && b.startsWith("/")
    ? `${a}${b.slice(1)}`
    : a.endsWith("/") || b.startsWith("/")
      ? a + b
      : `${a}/${b}`;
