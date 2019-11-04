import { inputOutput } from './../interfaces/inputOutput';

export class circularShift {
    private objectData: inputOutput;

    constructor(data: inputOutput) {
        this.objectData = data;
    }

    /**
     *!Algoritmo de procesamiento de datos
     *?Usa el objecto: objectData que tiene la interface inputOutput
     * @memberof circularShift
     */
    circularShift() {

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