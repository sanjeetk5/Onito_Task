// import React from "react";
// import { useSelector } from "react-redux";
// import RootState from "./RootState";

// const Datatable = () => {
//   const submittedUsers = useSelector(
//     (state: RootState) => state.registration.submittedUsers
//   );
//   console.log(submittedUsers);
//   return (
//     <div>
//       <h2>Submitted Users</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Sex</th>
//             <th>Mobile</th>
//             <th>Govt ID Type</th>
//             <th>Govt ID</th>
//             <th>Address</th>
//             <th>State</th>
//             <th>City</th>
//             <th>Country</th>
//             <th>Pincode</th>
//           </tr>
//         </thead>
//         <tbody>
//           {submittedUsers.map((user, index) => (
//             <tr key={index}>
//               <td>{user.name}</td>
//               <td>{user.age}</td>
//               <td>{user.sex}</td>
//               <td>{user.mobile}</td>
//               <td>{user.govtIdType}</td>
//               <td>{user.govtId}</td>
//               <td>{user.address}</td>
//               <td>{user.state}</td>
//               <td>{user.city}</td>
//               <td>{user.country}</td>
//               <td>{user.pincode}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Datatable;

import React, { useEffect, useRef } from 'react';
import 'datatables.net';
import { useSelector } from 'react-redux';

const Datatable: React.FC = () => {
  const tableRef = useRef(null);

  const submittedUsers = useSelector((state: any) => state.userReducer.submittedUserData);

  useEffect(() => {
    // Check if the tableRef is defined
    if (tableRef.current) {
      // Initialize Datatables.net on the table
      $(tableRef.current).DataTable();
    }
  }, [submittedUsers]); // Reinitialize Datatables.net when submittedUsers changes

  return (
    <div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {submittedUsers.map((user: any, index: number) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              {/* Add more cells based on your user data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;

