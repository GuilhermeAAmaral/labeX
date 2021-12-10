import React from 'react'
import logo from '../img/logo.png'
import styled from 'styled-components'
import {useHistory} from "react-router-dom"

const Logo = styled.img `
height: 300px;
width: 500px;
`
const Titulo = styled.h1`
text-align: center;
color: #7D3996;
padding: 10px;
`
const ContainerLogo = styled.div `
display: flex;
align-items: center;
justify-content: center;
margin-top: 100px;
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
border-radius: 8px;
background-color: #EA744D;
color: white;
border: 1px solid #EA744D;
cursor: pointer;
width: 200px;
box-shadow: 0px 2px 5px 0px #7D3996;
`

function HomePage() {

    const history = useHistory()

    const irParaViagens = () => {
        history.push('/trips/list')
    }

    const irParaAreaDeAdministrador = () => {
        history.push('/login')
    }


    return (

        <div>
            <ContainerLogo>
            <Logo src={logo} />
            </ContainerLogo>

            <Titulo> A Sua Viagem de primeira classe!!</Titulo>

            <ContainerButtons>
                <Buttons onClick={irParaViagens}>Ver Viagens</Buttons>
                <Buttons onClick={irParaAreaDeAdministrador}>Area de Administrador</Buttons>
            </ContainerButtons>
        </div>

    )
}

export default HomePage