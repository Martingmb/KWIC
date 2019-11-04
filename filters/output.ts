import { inputOutput } from './../interfaces/inputOutput';


export class output {
    private objectData: inputOutput;

    constructor(data: inputOutput) {
        this.objectData = data;
    }


    /**
     *!Funcion que imprime las lineas que fueron procesadas y ordenadas
     *?Utiliza el output de objectData 
     * @memberof output
     */
    print() {
        this.objectData.output.forEach(element => {
            console.log(element)
        });
    }

}