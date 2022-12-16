import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './crud.css'

function ContactoUpdate() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const navigator = useNavigate()
    const {id}= useParams()
    const datos= {
        nome: nome,
        email: email,
        telefone: telefone,
    }

    useEffect (() =>
    {
        axios.get(`http://localhost:3004/contatos/${id}`)
               .then((r) => { 
                 setNome(r.data.nome);
                 setTelefone(r.data.telefone);
                 setEmail(r.data.email);
                }) 
    }, [id]);

    function Update(e){
        e.preventDefault();
        axios.put(`http://localhost:3004/contatos/${id}`, datos)
        .then(navigator('/'))

    }

    return (
    <form>
        <div className="container-fluid formulario">
            <div className="row">
                <div className=" col p-3">
                    <div className="row justify-content-center"> 
                        <div className="col-10 col-sm-8 col-md-6 col-lg-4">                            
                            <label className='form-label' htmlFor="nome">Nome:</label>
                            <input className='form-control' type="text" name="nome" onChange={(e)=>setNome(e.target.value)} value={nome}/>
                            <label className='form-label' htmlFor="email">Email:</label>
                            <input className='form-control' type="email" name="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                            <label className='form-label' htmlFor="telefone">Telefone:</label>
                            <input className='form-control' type="text" name="telefone" onChange={(e)=>setTelefone(e.target.value)} value={telefone}/>
                            <button className='botao' onClick={Update}>Atualizar</button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>) 
    }
export {ContactoUpdate}