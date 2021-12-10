import React from 'react'
import styled from 'styled-components'
import {useHistory} from "react-router-dom"


const Titulo = styled.h1`
margin: 40px;
text-align: center;
color: #7D3996;
`
const CardViagens = styled.div `
box-shadow: 0px 2px 5px 0px #7D3996;
border-radius: 8px;
margin: 70px auto;
width: 250px;
padding: 30px;
`

const TextosCard = styled.p `
padding: 8px;
font-size: 15px;
text-align: center;
`
const TituloViagem = styled.p `
padding: 10px;
font-weight: bold;
font-size: 20px;
text-align: center;
margin-bottom: 10px;
color: #EA744D;
`

const ContainerButtons = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
margin: 10px;
`

const Buttons = styled.button `
margin: 40px 20px ;
padding: 15px;
background-color: #EA744D;
color: white;
border: 1px solid #EA744D;
border-radius: 8px;
cursor: pointer;
width: 190px;
box-shadow: 0px 2px 5px 0px #7D3996;
`
const Cont = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
justify-content: center;
`

function ListTripsPage(props) {

    const history = useHistory()

    const voltar = () => {
        history.goBack()
    }

    const irParaPaginaDeInscricao = () => {
        history.push('/trips/application')
    }

    
    const viagensNaTela = props.viagens.map ((index) => {
        return <CardViagens key={index.id}>
        <TituloViagem>{index.name}</TituloViagem>
        <TextosCard> {index.description}</TextosCard>
        <TextosCard><strong>Planeta:</strong> {index.planet}</TextosCard>
        <TextosCard><strong>Duração:</strong> {index.durationInDays}</TextosCard>
        <TextosCard><strong>Data:</strong> {index.date}</TextosCard>
        </CardViagens>
    })

    return (
        <div>
            
            <Titulo>Lista de Viagens</Titulo>
            <Cont>
            {viagensNaTela}
            </Cont>

            <ContainerButtons>
                <Buttons onClick={voltar}>Voltar</Buttons>
                <Buttons onClick={irParaPaginaDeInscricao}>Inscrever-se</Buttons>
            </ContainerButtons>

        </div>
    )
}

export default ListTripsPage