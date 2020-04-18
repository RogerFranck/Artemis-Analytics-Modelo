import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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
        const result = await axios('http://localhost:4000/prospectos/Interesados');
        console.log(result)
        setData(result.data);
      };
      fetchData();
    }, []);
  

  return (
    <MaterialTable
      title="Editable Preview"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                const data = this.state.data;
                data.push(newData);
                this.setState({ data }, () => resolve());
              }
              resolve()
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                const data = this.state.data;
                const index = data.indexOf(oldData);
                data[index] = newData;
                this.setState({ data }, () => resolve());
              }
              resolve()
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                let data = this.state.data;
                const index = data.indexOf(oldData);
                data.splice(index, 1);
                this.setState({ data }, () => resolve());
              }
              resolve()
            }, 1000)
          }),
      }}
      options={{
        actionsColumnIndex: -1,
        selection: true,
        selectionProps: rowData => ({
          //disabled: date <= Date.prototype.getDate(),
          color: 'primary'
        })
      }}
      onSelectionChange={(rows) => alert('Pasar' + rows.length + ' prospectos a contactados')}
    />
  )
}