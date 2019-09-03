declare module 'youtube-url' {
  export function extractId(url: string): string | false;
  export function valid(url: string): boolean;
}
