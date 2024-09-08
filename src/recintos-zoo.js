class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: { MACACO: 3 } },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: {} },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: { GAZELA: 1 } },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: {} },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: { LEAO: 1 } },
        ];
        this.animaisInfo = {
            'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    // Verifica animal carnivoro
    contemCarnivoros(animaisNoRecinto) {
        return Object.keys(animaisNoRecinto).some(animal => this.animaisInfo[animal].carnivoro);
    }
    analisaRecintos(tipoAnimal, quantidade) {
        if (!this.animaisInfo[tipoAnimal]) {
            return { erro: 'Animal inválido' };
        }
        if (quantidade < 1) {
            return { erro: 'Quantidade inválida' };
        }
        const recintosViaveis = [];
        const tamanhoAnimal = this.animaisInfo[tipoAnimal].tamanho;
        const biomasAdequados = this.animaisInfo[tipoAnimal].biomas;
        const espacoNecessario = tamanhoAnimal * quantidade;
        const ehCarnivoro = this.animaisInfo[tipoAnimal].carnivoro;

        for (const recinto of this.recintos) {
            // Calcula o espaco ocupado no recinto
            const espacoOcupado = Object.entries(recinto.animais)
                .reduce((acc, [animal, qnt]) => acc + (this.animaisInfo[animal].tamanho * qnt), 0);

            // Calcula o espaço livre no recinto
            let espacoLivre = recinto.tamanho - espacoOcupado;

            // Verifica o bioma adequado
            const biomaAdequado = biomasAdequados.includes(recinto.bioma) ||
                recinto.bioma.split(' e ').some(bioma => biomasAdequados.includes(bioma));

            // Se o animal for carnivoro ele nao compartilhar o recinto
            if (ehCarnivoro && Object.keys(recinto.animais).length > 0 && !(tipoAnimal in recinto.animais)) {
                continue;
            }

            // Se o recinto tiver carnivoros nao podem ser colocados
            if (!ehCarnivoro && this.contemCarnivoros(recinto.animais)) {
                continue;
            }

            if (Object.keys(recinto.animais).length > 0 && !(tipoAnimal in recinto.animais)) {
                espacoLivre -= 1;
            }

            // Se o bioma for adequado e houver espaço suficiente adiciona o recinto
            if (biomaAdequado && espacoLivre >= espacoNecessario) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario} total: ${recinto.tamanho})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
