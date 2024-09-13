import { useEffect, useState } from 'react'
import './styles.css'
import Card from '../../components/Card'


export default function ApiRickMorty() {
    const [conteudo, setConteudo] = useState(<>Carregando....</>)
    const [pagina, setPagina] = useState(1);
    const [maxPaginas, setMaxPaginas] = useState(1);

    async function getCharacter(page = 1) {
        const reqOptions = {
            method: "GET",
            redirect: "follow"
        }

        const responde = await fetch(
            `https://rickandmortyapi.com/api/character?page=${page}`,
            reqOptions
        )

        if (!responde.ok) {
            throw new Error("HTTP Error")
        }

        const apiResponse = await responde.json()

        setMaxPaginas(apiResponse.info.pages);

        console.log(apiResponse);

        return apiResponse
    }

    async function buildCards(page = 1) {

        const consulta = await getCharacter(page)

        return consulta.results.map(personagem => <Card data={personagem} key={personagem.id} />)


    }

    function goToPage(page) {
        async function getConteudo() {
            setConteudo(await buildCards(page))
            setPagina(page);
        }
        getConteudo()
    }

    function buildPagination(ativa = 1, paginas = 1) {
        const pgs = [];
        const maxPagesToShow = 8; // Always show 8 elements

        // Helper function to handle page clicks
        const handleClick = (page) => {
            if (page !== ativa) goToPage(page);
        };

        // Always show the first page
        pgs.push(
            <p
                className={ativa === 1 ? 'active' : ''}
                key={1}
                onClick={() => handleClick(1)}
            >
                1
            </p>
        );

        // Calculate the number of pages to show before and after the active page
        let pagesBefore = Math.max(ativa - 1, 1);
        let pagesAfter = Math.min(paginas - ativa, paginas - 1);

        // Determine how many pages we need to show before and after the active page
        if (pagesBefore < 3) {
            pagesAfter = Math.min(pagesAfter + (3 - pagesBefore), paginas - 1);
            pagesBefore = 3;
        } else if (pagesAfter < 3) {
            pagesBefore = Math.max(pagesBefore + (3 - pagesAfter), 1);
            pagesAfter = 3;
        }

        // Determine range of pages around the active page
        let start = Math.max(2, ativa - 2);
        let end = Math.min(paginas - 1, ativa + 2);

        // Adjust if near the start or end
        if (ativa <= 4) {
            start = 2;
            end = 7;
        } else if (ativa >= paginas - 3) {
            start = paginas - 6;
            end = paginas - 1;
        }

        // Show ellipses if necessary
        if (start > 2) {
            pgs.push(<p key="start-ellipsis">...</p>);
        }

        // Add the middle range of pages
        for (let i = start; i <= end; i++) {
            pgs.push(
                <p
                    className={i === ativa ? 'active' : ''}
                    key={i}
                    onClick={() => handleClick(i)}
                >
                    {i}
                </p>
            );
        }

        // Show ellipses before the last page if necessary
        if (end < paginas - 1) {
            pgs.push(<p key="end-ellipsis">...</p>);
        }

        // Always show the last page
        if (paginas > 1) {
            pgs.push(
                <p
                    className={ativa === paginas ? 'active' : ''}
                    key={paginas}
                    onClick={() => handleClick(paginas)}
                >
                    {paginas}
                </p>
            );
        }

        // Return the built pagination
        return pgs;
    }



    useEffect(() => {

        async function getConteudo() {
            setConteudo(await buildCards())
        }
        getConteudo()
    }, [])

    return (
        <div>
            <div className='list-api'>
                {conteudo}
            </div>

            <div className='paginator'>
                {buildPagination(pagina, maxPaginas)}
            </div>
        </div>

    )



}