import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'


export default function MaterialTableDemo() {
  const [columns] = useState([
    { title: 'Nombre', field: 'nombre' },
    { title: 'Correo', field: 'correo' },
    { title: 'Numero', field: 'numero', type: 'numeric' },
    { title: 'Cita', field: 'fechaCita', type: 'date'},
  ]);

  const [data, setData] = useState([
  ]);

  const [carrera, setCarrera] = useState();

  const actualizarData = async () => {    
    const result = await axios('http://localhost:4000/prospectos/Interesados/' + carrera);
    setData(result.data);
  }

  useEffect(() => {
    const fetchData = async () => {
      const jwt = localStorage.getItem('JWT-COOL');
      if (jwt) {
        const user = await axios.get('http://localhost:4000/login/validar', {
          headers: {
            "x-jwt": jwt
          }
        })
        await setCarrera(user.data.carrera)
        const prospectos = await axios.get('http://localhost:4000/prospectos/Interesados/' + user.data.carrera)        
        setData(prospectos.data) 
      }
    };
    fetchData();
  }, []);

  const saveProspecto = async (dataNew) => {
    dataNew["estado"]=1;
    await axios.post('http://localhost:4000/prospectos', dataNew);
    actualizarData();
  }
  const deleteProspecto = async (dataOld) => {
    await axios.delete('http://localhost:4000/prospectos/' + dataOld._id);
    actualizarData();
  }
  const updateProspecto = async (dataUpdate) => {
    await axios.put('http://localhost:4000/prospectos/' + dataUpdate._id, dataUpdate)
    actualizarData();
  }
  const moverProspecto = async (dataUpdate) => {
    if (window.confirm('¿Desea mover el prospecto al apartado de "Contactados"?')) {
      const temp = {
        estado: 2
      }
      await axios.put('http://localhost:4000/prospectos/' + dataUpdate, temp)
      actualizarData();
    }
  }


  return (
    <MaterialTable
      title="Prospectos Interesados"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              saveProspecto(newData);
              resolve()
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updateProspecto(newData);
              resolve()
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              deleteProspecto(oldData);
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