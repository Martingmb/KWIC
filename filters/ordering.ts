import { inputOutput } from './../interfaces/inputOutput';

export class ordering {
    private objectData: inputOutput;

    constructor(data: inputOutput) {
        this.objectData = data;
    }

    /**
     *!Algoritmo de ordenamiento alfabetico de datos
     *?Procesara output de objectData
     * @memberof ordering
     */
    order() {
      this.objectData.output.sort();
    }

    /**
     *!Funcion que regresa el inputOutput
     *
     * @returns {inputOutput}
     * @memberof input
     */
    getData(): inputOutput {
        return this.objectData;
    }
}
