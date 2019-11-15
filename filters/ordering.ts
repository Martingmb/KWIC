import { inputOutput } from './../interfaces/inputOutput';

export class ordering {
    private objectData: inputOutput;
    private orderType: number;

    constructor(data: inputOutput, orderType: number) {
        this.objectData = data;
        this.orderType = orderType;
    }

    /**
     *!Algoritmo de ordenamiento alfabetico de datos
     *?Procesara output de objectData
     * @memberof ordering
     */
    order() {
      if (this.orderType == 1) {
        this.objectData.output.sort();
      }
      else {
        this.objectData.output.sort((a, b) => (a > b ? -1 : 1));
      }
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
