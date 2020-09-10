
export type Location = {
  start: number;
  end: number;
  startToken: LocationToken;
  endToken: LocationToken;
  source: LocationSource;
}

type LocationOffset = {
  line: number;
  column: number;
}

type LocationToken = {
  kind: string;
  start: number;
  end: number;
  value: string | undefined;
  prev: LocationToken;
  next: LocationToken;
} & LocationOffset;

type LocationSource = {
  body: string;
  name: string;
  locationOffset: LocationOffset;
}
