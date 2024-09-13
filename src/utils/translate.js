const translations = {
    genero: {
        "Male": "Masculino",
        "Female": "Feminino",
        "unknown": "Desconhecido",
        "Genderless": "Sem Gênero Definido"
    },
    status: {
        "Alive": "Vivo",
        "Dead": "Morto",
        "unknown": "Desconhecido"
    },
    especie: {
        "Alien": "Alienígena",
        "Human": "Humano",
        "Robot": "Robô",
        "Disease": "Doença",
        "Humanoid": "Humanoide",
        "Mythological Creature": "Criatura Mitológica",
        "unknown": "Desconhecido"
    }
};

export function translateGenero(genero) {
    return translations.genero[genero] || genero;
}

export function translateStatus(status) {
    return translations.status[status] || status;
}

export function translateEspecie(especie) {
    return translations.especie[especie] || especie;
}