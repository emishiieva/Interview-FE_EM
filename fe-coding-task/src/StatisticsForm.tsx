import React from "react";
import axios from "axios";
import { Button, Paper, Typography, Alert} from "@mui/material";
import { BASIC_QUERY, URL } from "./constants";
import ChartComponent from "./ChartComponent";
import { useForm } from "react-hook-form";
import FormInputPropertyTypeDropdown from "./form-components/FormInputPropertyTypeDropdown";
import FormInputYearDropdown from "./form-components/FormInputYearDropdown";
import { FormInputText } from "./form-components/FormInputText";
import { getValue, transformQuery } from "./utils";
import { IFormInput, DefaultValues } from "./types";

const defaultValues: DefaultValues = {
  propertyTypeValue: getValue(localStorage.getItem("propertyTypeValue"), "00"),
  startYearValue: getValue(localStorage.getItem("startYearValue"), "2009"),
  endYearValue: getValue(localStorage.getItem("endYearValue"), "2021"),
  range: getValue(localStorage.getItem("range"), []),
  values: getValue(localStorage.getItem("values"), []),
  query: getValue(localStorage.getItem("query"), ""),
};

export const StatisticsForm = () => {
  const methods = useForm<IFormInput>({ defaultValues: defaultValues });
  const { handleSubmit, control } = methods;
  const [validationError, setValidationError] = React.useState<string>("");
  const [values, setValues] = React.useState<number[]>(defaultValues.values);
  const [requestError, setRequestError] = React.useState<string>("");
  const [range, setRange] = React.useState<string[]>(defaultValues.range);
  const [query, setQuery] = React.useState<string>(defaultValues.query);

  const handleValidation = (startDate: string, endDate: string) => {
    if (startDate > endDate) {
      setValidationError("Start year date should be lower than end year date");
    };
  }

  const onSubmit = (data: IFormInput) => {
    setValidationError("");
    handleValidation(data.startYearValue, data.endYearValue);
    if (!validationError) {
      Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value))
      });
    
      const range: string[] = getDateRange(data.startYearValue, data.endYearValue);
      setRange(range);
      localStorage.setItem("range", JSON.stringify(range));
      handleGetData(data.propertyTypeValue, range);
    }
  }

  const getDateRange = (startYear: string, endYear: string): string[] => {
    let dateRangeArray: string[] = [];
    let start = +startYear;
    const end = +endYear;
    while (start <= end) {
      for (let i = 1; i <= 4; i++) {
        dateRangeArray.push(start + "K" + i)
      }
      start++;
    }
    return dateRangeArray;
  }

  const handleGetData = (propertyTypeValue: string, range: string[]) => {    
    BASIC_QUERY.query = [{
      code: "Boligtype",
      selection: {
          filter: "item",
          values: [
              propertyTypeValue
          ]
      }
    },  
    {
      code: "Tid",
      selection: {
        filter: "item",
        values: range
      }
    },
    {
      code: "ContentsCode",
      selection: {
      filter: "item",
        values: [
            "KvPris"
        ]
      }
    },
  ];

  axios.post(URL, BASIC_QUERY)
    .then((res: any) => {
      const valuseFromRequest = res.data.value as number[]
      setValues(valuseFromRequest);
      localStorage.setItem("values", JSON.stringify(valuseFromRequest));
      setRequestError("");
      const newQuery = transformQuery(JSON.stringify(BASIC_QUERY));
      localStorage.setItem("query", JSON.stringify(newQuery));
      setQuery(newQuery);
    })
    .catch(() => {
      setRequestError("Ooops, request data failed")});
  }
  
  return ( 
    <Paper
      style={{
        display: "grid",
        gridRowGap: "20px",
        padding: "20px",
        margin: "10px 300px",
      }}
    >
      <Typography variant="h6">The Norway statistics on the average price per square meter</Typography>
      <FormInputPropertyTypeDropdown
        name="propertyTypeValue"
        control={control}
        label="Property Type Input"
        defaultValue={defaultValues.propertyTypeValue}
      />
      <FormInputYearDropdown
        name="startYearValue"
        control={control}
        label="Start Year Input"
        defaultValue={defaultValues.startYearValue}
      />
      <FormInputYearDropdown
        name="endYearValue"
        control={control}
        label="End Year Input"
        defaultValue={defaultValues.endYearValue}
      />
      <FormInputText 
        name="link"  
        control={control}
        label="Link"
        defaultValue={query || defaultValues.query}
      />
      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        {" "}
        Submit{" "}
      </Button>
      {validationError && <Alert severity="error">{validationError}</Alert>}
      {requestError ? 
        <Alert severity="error">{requestError}</Alert>
        : <ChartComponent xValues={range} yValues={values} />}
    </Paper> );
}
 
export default StatisticsForm;