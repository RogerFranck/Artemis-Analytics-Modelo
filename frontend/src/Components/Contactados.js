import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'


export default function MaterialTableDemo() {
  const [columns, setColumns] = useState([
      { title: 'Nombre', field: 'nombre' },
      { title: 'Correo', field: 'correo' },
      { title: 'Numero', field: 'numero', type: 'numeric' },
      { title: 'Exani', field: 'completadoExani', type: 'boolean'},
      { title: 'Ficha', field: 'fichaGenerada', type:'boolean'},
    ]);

    const [data, setData] = useState([
    ]);
    
    const actualizarData = async () =>{
      const result = await axios('http://localhost:4000/prospectos/Contactados');
        setData(result.data);
    }

    useEffect(() => {
        const fetchData = async () => {
        const result = await axios('http://localhost:4000/prospectos/Contactados');
        setData(result.data);
      };
      fetchData();
    }, []);
    
    const saveProspecto = async (dataNew) =>{
      await axios.post('http://localhost:4000/prospectos', dataNew);
      actualizarData();
    }
    const deleteProspecto = async (dataOld) =>{
      await axios.delete('http://localhost:4000/prospectos/' + dataOld._id);
      actualizarData();
    }
    const updateProspecto = async (dataUpdate) =>{
      await axios.put('http://localhost:4000/prospectos/' +dataUpdate._id, dataUpdate)
      actualizarData();
    }
    const moverProspecto = async (dataUpdate) => {
      if (window.confirm('¿Desea mover el prospecto al apartado de "Semi-Inscrito"?')) {
        const temp = {
          estado: 3
        }
        await axios.put('http://localhost:4000/prospectos/' + dataUpdate, temp)
        console.log(dataUpdate)
        actualizarData();
      }
    }

  return (
    <MaterialTable
      title="Prospectos Contactados"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                saveProspecto(newData);
              }
              resolve()
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                updateProspecto(newData);
              }
              resolve()
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
               deleteProspecto(oldData); 
              }
              resolve()
            }, 1000)
          }),
      }}
      actions={[
        {
          icon: 'check',
          tooltip: 'Confirmar',
          onClick: (event, rowData) => moverProspecto(rowData._id)
        } 
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
      localization={{
        body: {
            editRow: {
              deleteText: "¿Estás seguro de querer borrarlo?",
            }
        }
    }}
     
    />
  )
}

