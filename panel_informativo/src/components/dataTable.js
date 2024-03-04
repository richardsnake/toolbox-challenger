import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { fetchData } from '../actions/dataActions';
import '../css/appStyles.css';
import '../App.css';
const DataTable = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <h3>React Test App</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {items.map((file) =>
            file.lines.map((line, index) => (
              <tr key={`${file.file}_${index}`}>
                <td>{file.file}</td>
                <td>{line.text}</td>
                <td>{line.number}</td>
                <td>{line.hex}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
