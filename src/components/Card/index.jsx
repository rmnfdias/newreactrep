import { translateEspecie, translateGenero, translateStatus } from '../../utils/translate';
import './styles.css';

export default function Card({ data: personagem }) {
    return (
        <div className="card card-1">
            <div className="top">
                <img src={personagem.image} alt={personagem.name} />
            </div>
            <div className="bottom">
                <h2 className="card-title">{personagem.name}</h2>
                <p><strong>Gênero:</strong> {translateGenero(personagem.gender)}</p>
                <p><strong>Localização:</strong> {personagem.location.name}</p>
                <p><strong>Origem:</strong> {personagem.origin.name}</p>
                <p><strong>Espécie:</strong> {translateEspecie(personagem.species)}</p>
                <p><strong>Status:</strong> {translateStatus(personagem.status)}</p>
                <p><strong>Tipo:</strong> {personagem.type || 'N/A'}</p>
                <p><strong>Episódios:</strong> {personagem.episode.map(ep => ep.split('/').pop()).join(", ")}</p>
            </div>
        </div>
    );
}
