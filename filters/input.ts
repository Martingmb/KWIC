import { inputOutput } from './../interfaces/inputOutput';

export class input {

    private objectData: inputOutput;

    constructor() {
        this.objectData = {
            input: [],
            output: []
        }
    }

    /**
     *!Setter del input
     * @param {Array<string>} lines
     * @memberof input
     */
    setLines(lines: Array<string>): void {
        this.objectData.input = lines;
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