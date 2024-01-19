const initialState = {
    submittedUserData: [],
  };
  
 export  const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SUBMIT_USER_DATA':
        return {
          ...state,
          submittedUserData: [...state.submittedUserData, action.payload],
        };
      default:
        return state;
    }
  };
  
 