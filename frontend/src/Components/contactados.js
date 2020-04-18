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
        actionsColumnIndex: -1
      }}
      components={{
        Action: props => (
          <Button
          //onClick={(event) => props.action.onClick(event, props.data)}
          color="primary"
          variant="contained"
          style={{textTransform: 'none'}}
          size="small"
        >
          My Button
        </Button>
        ),
      }}
    />
  )
}
