import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'


export default function MaterialTableDemo() {
  const [columns, setColumns] = useState([
      { title: 'Nombre', field: 'nombre' },
      { title: 'Correo', field: 'correo' },
      { title: 'Numero', field: 'numero', type: 'numeric' },
      { title: 'Ficha Pagada', field: 'fichaPagada', type:'boolean'},
    ]);

    const [data, setData] = useState([
    ]);
    
    const actualizarData = async () =>{
      const result = await axios('http://localhost:4000/prospectos/Inscritos');
        setData(result.data);
    }

    useEffect(() => {
        const fetchData = async () => {
        const result = await axios('http://localhost:4000/prospectos/Inscritos');
        setData(result.data);
      };
      fetchData();
    }, []);
    
    const saveProspecto = async (dataNew) =>{
      dataNew["estado"]=4;
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
    
  return (
    <MaterialTable
      title="Prospectos Inscritos"
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