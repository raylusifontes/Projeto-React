import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './crud.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashAlt, faUser, faEnvelope, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';

const CrudTable = () => {
  
  const [contactos, setContactos] = useState([]);

  function TableContato() {
    fetch('http://localhost:3004/contatos')
    .then((r) => r.json())
    .then((data) => setContactos(data));
  }
  useEffect(() => {
    TableContato()
  },[] )

  const handleDelete = async (contactosId) => {
    const response = await fetch(`http://localhost:3004/contatos/${contactosId}`,
      { method: 'DELETE'});
  
      if (response.ok) {
        alert('Deseja apagar contato?')
        TableContato();
      }   
      else
        console.log('ERRO');     
      } 

  return(
  <div className='container-table'>
    <h3>Contatos</h3>
    <table className='tabla'>
      <thead>
        <tr>
          <td className='negrita'>Nro.</td>
          <td className='negrita'><FontAwesomeIcon icon={faUser}/>Nome</td>
          <td className='negrita'><FontAwesomeIcon icon={faEnvelope}/>Email</td>
          <td className='negrita'><FontAwesomeIcon icon={faPhoneVolume}/>Telefone</td>
          <td className='negrita'>Opções</td>
        </tr>
      </thead>
      <tbody>
        {contactos.map((contactos,id) => {
            return (
              <tr key={id}>
                <td>{id+1}</td>
                <td>{contactos.nome}</td>
                <td>{contactos.email}</td>
                <td>{contactos.telefone}</td>
                <td className='opcoes'>
                  <Link to={`/CrudUpdate/${contactos.id}`} className='link'><FontAwesomeIcon icon={faPen}/>Atualizar</Link>
                  <button className='op2' onClick={()=> handleDelete(contactos.id)}><FontAwesomeIcon icon={faTrashAlt}/>Eliminar</button>
                </td>
              </tr>
            )
          }) 
        }
      </tbody>        
    </table>
  </div>)
}

export {CrudTable};