// // store.ts
// import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

// // Define the initial state
// interface Step1FormData {
//   name: string;
//   age: number;
//   sex: string;
//   mobile: string;
//   govtIdType: string;
//   govtId: string;
// }

// interface Step2FormData {
//   address: string;
//   state: string;
//   city: string;
//   country: string;
//   pincode: string;
// }

// interface FormData {
//   step1: Step1FormData;
//   step2: Step2FormData;
//   submittedData: Array<Step1FormData & Step2FormData>; // Combine step1 and step2 types
// }

// const initialState: FormData = {
//   step1: {
//     name: "",
//     age: 0,
//     sex: "",
//     mobile: "",
//     govtIdType: "",
//     govtId: "",
//   },
//   step2: {
//     address: "",
//     state: "",
//     city: "",
//     country: "",
//     pincode: "",
//   },
//   submittedData: [],
// };

// // Create a Redux slice for form data
// const formSlice = createSlice({
//   name: "formData",
//   initialState,
//   reducers: {
//     submitFormData: (state, action: PayloadAction<FormData | undefined>) => {
//       // Combine step-1 and step-2 data
//       if (action.payload) {
//         // Combine step-1 and step-2 data
//         const combinedData: Step1FormData & Step2FormData = {
//           ...action.payload.step1,
//           ...action.payload.step2,
//         };

//         // Update the submittedData array with the new combined data
//         state.submittedData.push(combinedData);
//         console.log(combinedData);
//         // Reset step-1 and step-2 data to their initial state
//         state.step1 = initialState.step1;
//         state.step2 = initialState.step2;
//       }
//     },
//     // Define additional actions if needed
//   },
// });

// export const { submitFormData } = formSlice.actions;

// // Create a Redux store
// export const store = configureStore({
//   reducer: {
//     formData: formSlice.reducer,
//   },
// });

// // Define RootState type
// export type RootState = ReturnType<typeof store.getState>;

import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { userReducer as formReducer } from "./Reducer/reducer";


const rootReducer = combineReducers({
  formReducer,
});
export const store = legacy_createStore(rootReducer);
