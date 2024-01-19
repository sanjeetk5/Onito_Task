// // Step2Form.tsx

// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { setStep2Data, setStep, saveSubmittedUser } from './registrationSlice';
// import {
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   FormControl,
//   InputLabel,
// } from '@mui/material';
// import axios from 'axios'; // Make sure to install axios

// import RootState from './RootState';
// import { useNavigate } from 'react-router-dom';
// import store from './store';

// type CountryOptions = string[] | undefined;

// const schema = yup.object({
//     address: yup.string().optional(),
//     state: yup.string().optional(),
//     city: yup.string().optional(),
//     country: yup.string().required('Country is required'),
//     pincode: yup.string().optional().matches(/^[0-9]+$/, 'Pincode must be numeric'),
//   });

// const Step2Form = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate()
//   const step = useSelector((state: RootState) => state.registration.step);
//   const { control, handleSubmit, setValue, formState } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const countryOptions = useCountryOptions(); // Implement a hook to fetch country options

//   const onSubmit = (data: any) => {
//     dispatch(setStep2Data(data));
//     console.log('State after setStep1Data:', store.getState()); // Log the state
//     dispatch(setStep(step + 1));
//     console.log('State after setStep:', store.getState()); // Log the state
//     dispatch(saveSubmittedUser());
//     console.log('State after saveSubmittedUser:', store.getState());
//     navigate("/datatable")
//     // Move to the next step
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Controller
//         name="address"
//         control={control}
//         render={({ field }) => (
//           <TextField {...field} label="Address" />
//         )}
//       />
//       <Controller
//         name="state"
//         control={control}
//         render={({ field }) => (
//           <TextField {...field} label="State" />
//         )}
//       />
//       <Controller
//         name="city"
//         control={control}
//         render={({ field }) => (
//           <TextField {...field} label="City" />
//         )}
//       />
//       <Controller
//         name="country"
//         control={control}
//         render={({ field }) => (
//           <FormControl>
//             <InputLabel>Country</InputLabel>
//             <Select {...field} displayEmpty>
//               <MenuItem value="" disabled>
//                 Select
//               </MenuItem>
//               {countryOptions.map((country: string) => (
//                 <MenuItem key={country} value={country}>
//                   {country}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         )}
//       />
//       <Controller
//         name="pincode"
//         control={control}
//         render={({ field }) => (
//           <TextField {...field} label="Pincode" />
//         )}
//       />
//       <Button type="submit">Submit</Button>
//     </form>
//   );
// };

// // Implement a hook to fetch country options
// const useCountryOptions = () => {
//   const [countryOptions, setCountryOptions] = React.useState<string[]>([]);

//   React.useEffect(() => {
//     const fetchCountryOptions = async () => {
//       try {
//         const response = await axios.get('https://restcountries.com/v3.1/all');
//         const options = response.data.map((country: any) => country.name.common);
//         setCountryOptions(options);
//       } catch (error) {
//         console.error('Error fetching country options:', error);
//       }
//     };

//     fetchCountryOptions();
//   }, []);

//   return countryOptions;
// };

// export default Step2Form;

// Step2Form.tsx

// Step2Form.tsx

import React, { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Button,
  TextField,
  MenuItem,
  FormControl,
  styled,
} from "@mui/material";
import { useAsync } from "react-use";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface Step2FormProps {
  onSubmit: (data: Step2FormData) => void;
}

export type Step2FormData = {
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  pincode?: string;
};

const step2Schema = Yup.object().shape({
  address: Yup.string().optional(),
  state: Yup.string().optional(),
  city: Yup.string().optional(),
  country: Yup.string().required("Country is required"),
  pincode: Yup.string().optional().matches(/^\d*$/, "Pincode must be numeric"),
});

const StyledFormControl = styled(FormControl)`
  margin-bottom: 16px;
`;

const Step2Form: React.FC<Step2FormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step2Schema),
  });

  const [countryOptions, setCountryOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountryOptions = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const options = response.data.map((country: any) => country.name.common);
      setCountryOptions(options);
    };

    fetchCountryOptions();
  }, []);

  const handleCountryChange = (selectedCountry: string) => {
    setValue("country", selectedCountry);
    // Handle country change if needed
  };

  const handleFormSubmit: SubmitHandler<Step2FormData> = async (data) => {
    // Perform Yup validation or other custom validations if needed

    // Call the parent component's onSubmit to handle form submission
    onSubmit(data);
  };

  return (
    <>
    <h4>Address Details</h4>
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
      }}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <StyledFormControl>
        <Controller
          name="address"
          control={control}
          render={({ field }) => <TextField {...field} label="Address" />}
        />
      </StyledFormControl>
      <StyledFormControl>
        <Controller
          name="state"
          control={control}
          render={({ field }) => <TextField {...field} label="State" />}
        />
      </StyledFormControl>
      <StyledFormControl>
        <Controller
          name="city"
          control={control}
          render={({ field }) => <TextField {...field} label="City" />}
        />
      </StyledFormControl>
      <StyledFormControl>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Country"
              select
              onChange={(e) => handleCountryChange(e.target.value)}
              error={!!errors.country}
              helperText={errors.country?.message}
            >
              {countryOptions.map((country: string) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </StyledFormControl>
      <StyledFormControl>
        <Controller
          name="pincode"
          control={control}
          render={({ field }) => <TextField {...field} label="Pincode" />}
        />
      </StyledFormControl>
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
    </>
  );
};

export default Step2Form;
