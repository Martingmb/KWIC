import { inputOutput } from './../interfaces/inputOutput';

export class circularShift {
    private objectData: inputOutput;

    constructor(data: inputOutput) {
        this.objectData = data;
    }

    /**
     *!Algoritmo de procesamiento de datos
     *?Usa el objecto: objectData que tiene la interface inputOutput
     **Procesa cada linea y hace shift hacia la derecha de 1 elemento
     **Obtiene el ultimo elemento y lo agrega al inicio de la lista
     * @memberof circularShift
     */
    circularShift() {
        this.objectData.input.forEach(line => {
            let words = line.split(" ");
            let length = words.length;

            for(let i = 0; i < length; i++) {
                let lineOutput: string;
                
                let temp: string = String(words.pop());
                words.unshift(temp);

                lineOutput = words.join(" ");
                this.objectData.output.push(lineOutput);
            }

        });
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