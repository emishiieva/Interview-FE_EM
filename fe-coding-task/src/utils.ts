export const transformQuery = (query: string) => {
  return `curl -X POST --location "https://data.ssb.no/api/v0/no/table/07241" \
  -H "Content-Type: application/json" \
  -d '${query}'`
}

export const getValue = (value: string | null, defaultValue: string | string[]) => {
  return value ? JSON.parse(value) : defaultValue;
};
