import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

export default function MaterialTableDemo() {
  const [columns, setColumns] = useState([
   
      { title: 'Nombre', field: 'nombre' },
      { title: 'Correo', field: 'correo' },
      { title: 'Numero', field: 'numero', type: 'numeric' },
      { title: 'Cita', field: 'fechaCita' },
    ]);

    const [data, setData] = useState([
    ]);
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios('http://localhost:4000/prospectos/Contactados');
        console.log(result)
        setData(result.data);
      };
      fetchData();
    }, []);
  

  return (
    <MaterialTable
      title="Action Overriding Preview"
      columns={columns}
      data={data}
      actions={[
        {
          icon: 'save',
          tooltip: 'Save User',
          onClick: (event, rowData) => alert("You saved " + rowData.name)
        },
        {
          icon: 'delete',
          tooltip: 'Delete User',
          onClick: (event, rowData) => alert("You want to delete " + rowData.name)
        }
      ]}
      components={{
        Action: props => (
          <Checkbox
            //checked={state.checkedB}
            //onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        ),
      }}
    />
  )
}
