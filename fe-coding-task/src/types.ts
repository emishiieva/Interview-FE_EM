export type QueryParams = {
  code: String;
  selection: {
    filter: String;
    values: String[];
  }
}

type ResponseFormat = {
  format: string;
}

export type Query = {
  query: QueryParams[];
  response: ResponseFormat;
}

export type FormInputProps = {
  name: string;
  control: any;
  label: string;
  defaultValue: string;
}

export type CharProperties = {
  xValues: string[];
  yValues: number[];
}

export interface IFormInput {
  propertyTypeValue: string;
  startYearValue: string;
  endYearValue: string;
}

export type DefaultValues = {
  propertyTypeValue: string;
  startYearValue: string
  endYearValue: string;
  range: string[];
  values: number[];
  query: string;
};
