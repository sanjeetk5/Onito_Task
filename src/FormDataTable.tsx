import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
// import 'datatables.net-dt/css/jquery.dataTables.css'
import { useSelector } from 'react-redux';

const FormDataTable: React.FC = () => {
  const tableRef = useRef(null);

  const submittedUsers = useSelector((store: any) => store.formReducer.submittedUserData);
  console.log(submittedUsers)

  useEffect(() => {
    // Check if the tableRef is defined
    if (tableRef.current) {
      // Initialize Datatables.net on the table
      $(tableRef.current).DataTable();
    }
  }, [submittedUsers]); // Reinitialize Datatables.net when submittedUsers changes

  return (
    <div className="table-responsive">
      <table ref={tableRef} className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Mobile</th>
            <th>ID Type</th>
            <th>GovtID</th>
            <th>Address</th>
            <th>State</th>
            <th>City</th>
            <th>Country</th>
            <th>Pincode</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {submittedUsers?.map((user: any, index: number) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.sex}</td>
              <td>{user.mobile}</td>
              <td>{user.govtIdType}</td>
              <td>{user.govtId}</td>
              <td>{user.address}</td>
              <td>{user.state}</td>
              <td>{user.city}</td>
              <td>{user.country}</td>
              <td>{user.pincode}</td>
              {/* Add more cells based on your user data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormDataTable;
