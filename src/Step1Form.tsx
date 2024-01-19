// Install necessary packages:
// npm install react react-dom redux react-redux @types/react @types/react-dom @types/redux @types/react-redux
// npm install @material-ui/core react-hook-form @hookform/resolvers yup @types/react-hook-form @types/yup

import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler, SubmitErrorHandler, } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from './store'; // Assuming you have a Redux store
// import { nextPage, submitStep1 } from './actions'; // Create these actions and action creators in your Redux setup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, styled } from '@mui/material';
import FormDataTable from './FormDataTable';

interface Step1FormProps {
  onNext: ( data: Step1FormData) => void;
}

// Define Yup schema for Step-1 form validation
const step1Schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  age: yup
    .number()
    .positive("Age must be a positive number")
    .required("Age is required"),
  sex: yup
    .string()
    .required("Sex is required")
    .oneOf(["Male", "Female"], "Invalid Sex"),
  mobile: yup
    .string()
    .matches(
      /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
      "Invalid Indian Mobile Number"
    ),
  govtIdType: yup
    .string()
    .required("ID Type is required")
    .oneOf(["Aadhar", "PAN"], "Invalid ID Type"),
  govtId: yup.string().when("govtIdType", {
    is: (govtIdType: string) => govtIdType === "Aadhar",
    then: (govtIdSchema) =>
      govtIdSchema.matches(/^[2-9]\d{11}$/, "Invalid Aadhar Number"),
    otherwise: (govtIdSchema) =>
      govtIdSchema.matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN Number"),
  }),
});

// Define types for form data
export type Step1FormData = {
  name: string;
  age: number;
  sex: string;
  mobile?: string;
  govtIdType: string;
  govtId?: string;
};

const StyledFormControl = styled(FormControl)`
  margin-bottom: 16px;
`;




const Step1Form: React.FC<Step1FormProps> = ({ onNext }) => {
  const dispatch = useDispatch();
  // const formData = useSelector((state) => state.formData); // Assuming you have a Redux slice for form data
  const [submitted, setSubmitted] = useState(false);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Step1FormData>({
    resolver: yupResolver(step1Schema),
  });

  // useEffect(() => {
  //   // Set default values after component mounts
  //   setValue('name', formData.step1.name);
  //   setValue('age', formData.step1.age);
  //   setValue('sex', formData.step1.sex);
  //   setValue('mobile', formData.step1.mobile);
  //   setValue('govtIdType', formData.step1.govtIdType);
  //   setValue('govtId', formData.step1.govtId);
  // }, [formData.step1, setValue]);
  

  const onSubmit:SubmitHandler<Step1FormData>=(data: Step1FormData) => {
    // dispatch(submitStep1(data));
    // // dispatch(nextPage());
    // console.log(data)
    // setSubmitted(true)
    onNext(data);
  };

  // const onError: SubmitErrorHandler<Step1FormData> = (errors, options) => {
  //   console.log(errors);
  // };

  return (
    <>
    <h4>Personal Details</h4>
    <form style={{display:"flex" , flexDirection:"column" , maxWidth:"400px" , margin:"auto", padding:"20px" }} onSubmit={handleSubmit(onSubmit)}>
    <StyledFormControl>
    <Controller
        
        name="name"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Name" error={!!errors.name} helperText={errors.name?.message} />
        )}
      />
    </StyledFormControl>
    <StyledFormControl>
    <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <TextField {...field} type="number" label="Age" error={!!errors.age} helperText={errors.age?.message} />
        )}
      />
    </StyledFormControl>
    <StyledFormControl>
    <Controller
        name="sex"
        control={control}
        render={({ field }) => (
          <FormControl error={!!errors.sex}>
            <InputLabel>Sex</InputLabel>
            <Select {...field}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            <FormHelperText>{errors.sex?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </StyledFormControl>
     <StyledFormControl>
     <Controller
        name="mobile"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Mobile" error={!!errors.mobile} helperText={errors.mobile?.message} />
        )}
      />
     </StyledFormControl>
   <StyledFormControl>
   <Controller
        name="govtIdType"
        control={control}
        render={({ field }) => (
          <FormControl error={!!errors.govtIdType}>
            <InputLabel>Govt Issued ID Type</InputLabel>
            <Select  {...field}>
              <MenuItem value="Aadhar">Aadhar</MenuItem>
              <MenuItem value="PAN">PAN</MenuItem>
            </Select>
            <FormHelperText>{errors.govtIdType?.message}</FormHelperText>
          </FormControl>
        )}
      />
   </StyledFormControl>
     <StyledFormControl>
     <Controller
        name="govtId"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Govt Issued ID" error={!!errors.govtId} helperText={errors.govtId?.message} />
        )}
      />
     </StyledFormControl>
      <Button type="submit" variant="contained" color="primary">Next</Button>

      {/* {submitted && <FormDataTable formData={formData.step1} />} */}
    </form>
    </>
  );
};

export default Step1Form;
