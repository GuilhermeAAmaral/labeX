import React from 'react'
import styled from 'styled-components'
import {useHistory, useParams} from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from 'react'

const Titulo = styled.h1`
margin-top: 40px;
text-align: center;
color: #7D3996;
`
const Titulo2 = styled.h1`
margin-bottom: 15px;
text-align: center;
color: #EA744D;
`
const Card = styled.div `
margin: 10px auto;
width: 350px;
padding: 10px;
text-align: center;
`
const CardCandidatos = styled.div `
box-shadow: 0px 2px 5px 0px #F63E40;
border-radius: 8px;
margin: 70px auto;
width: 350px;
padding: 30px;
text-align: center;
`
const CardCandidatoss = styled.div `
box-shadow: 0px 2px 5px 0px green;
border-radius: 8px;
margin: 70px auto;
width: 350px;
padding: 30px;
text-align: center;
`
const TextosCard = styled.p `
padding: 10px;
font-size: large;
`
const TextossCard = styled.h1 `
padding: 10px;
font-size: 18px;
color: green;
`
const ContainerButtons = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
margin: 10px;
`
const Buttons = styled.button `
margin: 20px 20px ;
padding: 15px;
background-color: #EA744D;
color: white;
border: 1px solid #EA744D;
border-radius: 8px;
cursor: pointer;
width: 200px;
box-shadow: 0px 2px 5px 0px #7D3996;
`

function TripDetailsPage() {

    useEffect(() => {
        
        const token = localStorage.getItem('token')
    
        if (token === null) {
            console.log ('Não está logado!')
            history.push ('/login')
        }
    
    }, [])
    
    const [listaDetalhes, setlistaDetalhes] = useState ([])
    const [listaCandidatos, setListaCandidatos] = useState ([])
    const [listaDeAprovados, setListaDeAprovados] = useState ([])

    const history = useHistory()
    const params = useParams()
  
    const voltar = () => {
        history.goBack()
    }

    const getTripDetail = (id) => {
        
        const token = localStorage.getItem('token')
        axios.get (`https://us-central1-labenu-apis.cloudfunctions.net/labeX/guilherme-amaral-lovelace/trip/${params.id}`, {
        
    
        headers: {
    
            auth: token
        }

        })
    
        .then ((res) => {
          setlistaDetalhes (res.data.trip)
          setListaCandidatos (res.data.trip.candidates)
          setListaDeAprovados (res.data.trip.approved)
          
        })
    
        .catch ((err) => {
          console.log (err)
        })
    
    }

    useEffect(() => {

        getTripDetail()
    
    }, [])

    const aprovacaoCandidato = (id) => {

        const body = {

            approve: true
        }

        const token = localStorage.getItem('token')

        axios.put (`https://us-central1-labenu-apis.cloudfunctions.net/labeX/guilherme-amaral-lovelace/trips/${params.id}/candidates/${id}/decide`, body, {

        headers: {

            "Content-Type": "application/json",
            auth: token
        }

        })

        .then ((res) => {
            alert ('Aprovado')
            getTripDetail()
            
        })
        
        .catch((err) => {
            alert ('[ERRO], Tente novamente')
        })

    }

    const reprovaCandidato = (id) => {

        const body = {

            approve: false
        }

        const token = localStorage.getItem('token')

        axios.put (`https://us-central1-labenu-apis.cloudfunctions.net/labeX/guilherme-amaral-lovelace/trips/${params.id}/candidates/${id}/decide`, body, {

        headers: {

            "Content-Type": "application/json",
            auth: token
        }

        })

        .then ((res) => {
            alert ('Reprovado')
            getTripDetail()
            
        })
        .catch((err) => {
            console.log (err)
            alert ('[ERRO], Tente novamente')
        })

    }

    const listaCandidatosNaTela = listaCandidatos.map ((candidato) => {
        return <CardCandidatos key={candidato.id}>

        <TextosCard><strong>Nome:</strong> {candidato.name}</TextosCard>
        <TextosCard><strong>Profissão:</strong> {candidato.profession}</TextosCard>
        <TextosCard><strong>Idade:</strong> {candidato.age} </TextosCard>
        <TextosCard><strong>País:</strong> {candidato.country} </TextosCard>
        <TextosCard><strong>Texto de Candidatura:</strong> {candidato.applicationText}</TextosCard>

        <ContainerButtons>
            <Buttons onClick={() => aprovacaoCandidato (candidato.id)}>Aprovar</Buttons>
            <Buttons onClick={() => reprovaCandidato (candidato.id)}>Reprovar</Buttons>
        </ContainerButtons>

    </CardCandidatos>
    })

    const listaNaTelaAprovados = listaDeAprovados.map ((index) => {
        return <CardCandidatoss key={index.id}>
            <TextossCard>{index.name}</TextossCard>
        </CardCandidatoss>
    })


    return (

        <div>
            
        <Card>
            <Titulo2>{listaDetalhes.name}</Titulo2>
            <TextosCard>{listaDetalhes.description}</TextosCard>
            <TextosCard><strong>Planeta: </strong>{listaDetalhes.planet}</TextosCard>
            <TextosCard><strong>Duração: </strong>{listaDetalhes.durationInDays}</TextosCard>
            <TextosCard><strong>Date: </strong>{listaDetalhes.date}</TextosCard>
        </Card>

            <ContainerButtons>
                <Buttons onClick={voltar}>Voltar</Buttons>
            </ContainerButtons>

            
            <Titulo>Candidatos Pendentes</Titulo>
            {listaCandidatosNaTela}

            <Titulo>Candidatos Aprovados</Titulo>
            {listaNaTelaAprovados}
        
        </div>
    )
}

export default TripDetailsPage
