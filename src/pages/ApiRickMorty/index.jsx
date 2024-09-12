import { useEffect, useState } from 'react'
import './styles.css'
import Card from '../../components/Card'

    
export default function ApiRickMorty (){
    const [conteudo, setConteudo] = useState(<>Carregando....</>)  
    
   async function getCharacter( ) {
        const reqOptions = {

            method:"GET",
            redirect: "follow"
        }

        const responde = await fetch(
            "https://rickandmortyapi.com/api/character", 
            reqOptions
        )

        if(!responde.ok){
            throw new Error("HTTP Error")
        }

        const apiResponse = await responde.json()
        
        return apiResponse
    }

    async function buildCards() {

        const consulta = await getCharacter()

        return consulta.results.map (personagem => <Card data={personagem}/>)

       
    }

    useEffect(() => {

        async function getConteudo(){
           setConteudo( await buildCards())
        }
        getConteudo()
    }, [])

    return(
        <div className='list-api'>
            { conteudo }
        </div>
    )



}