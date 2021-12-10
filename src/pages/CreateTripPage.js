import React from 'react'
import styled from 'styled-components'
import {useHistory} from "react-router-dom"
import { useEffect } from 'react'
import useForm from '../hooks/useForm'
import axios from 'axios'

const Titulo = styled.h1`
margin: 40px;
text-align: center;
color: #7D3996;
`
const ContainerButtons = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`
const Buttons = styled.button `
margin: 20px 20px ;
padding: 15px;
background-color: #EA744D;
color: white;
border: 1px solid #EA744D;
border-radius: 8px;
cursor: pointer;
width: 190px;
box-shadow: 0px 2px 5px 0px #7D3996;
`
const CardCandidatura = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const Inputs = styled.input `
padding: 10px;
margin: 15px;
width: 400px;
border: solid 1px #7D3996;
border-radius: 5px;
`
const Select = styled.select`
padding: 10px;
margin: 15px;
width: 420px;
border: solid 1px #7D3996;
border-radius: 5px;
`

function CreateTripPage(props) {

       useEffect(() => {
        const token = localStorage.getItem('token')
    
        if (token === null) {
            console.log ('Não está logado!')
            history.push ('/login')
        }
    
    }, [])

    const history = useHistory()

    const voltar = () => {
        history.goBack()
    }

    const {form, onChange, cleanFields} = useForm ({

        name: "", 
        planet: "", 
        date: "", 
        description: "", 
        durationInDays: ""
    })

    const cadastrarViagem = (event) => {

        const body = {

            name: form.name, 
            planet: form.planet, 
            date: form.date, 
            description: form.description, 
            durationInDays: form.durationInDays

        }

        const token = localStorage.getItem('token')
        axios.post ('https://us-central1-labenu-apis.cloudfunctions.net/labeX/guilherme-amaral-lovelace/trips', body, {

        
        headers: {

            "Content-Type": "application/json",
            auth: token
        }

        })

        .then ((res) => {
            alert ('Viagem cadastrada')
            props.getTrips()
            
        })

        .catch((err) => {
            console.log (err)
            alert ('[ERRO], Tente novamente')
        })

        event.preventDefault()
        cleanFields()
    }


    return (

        <div>

        <Titulo>Criar Viagem</Titulo>

        <CardCandidatura onSubmit={cadastrarViagem}>

            <Inputs 
            name={"name"}
            onChange={onChange}
            value={form.name}
            type="text" 
            placeholder="Nome"
            required
            pattern={"^.{5,}"}
            title={"O nome deve ter no mínimo 5 letras"}
            />

            <Select 
            name={"planet"}
            onChange={onChange}
            value={form.planet}
            required>
                <option>Escolha um planeta</option>
                <option>Mercúrio</option>
                <option>Vênus</option>
                <option>Terra</option>
                <option>Marte</option>
                <option>Jupter</option>
                <option>Saturno</option>
                <option>Urano</option>
                <option>Netuno</option>
                <option>Plutão</option>
            </Select>

            <Inputs 
            name={"date"}
            onChange={onChange}
            value={form.date}
            required
            type="date" />

            <Inputs 
            name={"description"}
            onChange={onChange}
            value={form.description}
            required
            type="text" 
            placeholder="Descrição"
            pattern={"^.{30,}"}
            title={"Preencha no mínimo 30 caracteres"}
            />

            <Inputs 
            name={"durationInDays"}
            onChange={onChange}
            value={form.durationInDays}
            required
            type="number"
            placeholder="Duração em dia"
            min={50}
            />

            <Buttons>Criar</Buttons>
           
        </CardCandidatura>

        <ContainerButtons>
            <Buttons onClick={voltar}>Voltar</Buttons>
        </ContainerButtons>
        
        </div>
    )
}

export default CreateTripPage