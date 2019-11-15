import { inputOutput } from './../interfaces/inputOutput';
import * as Inquirer from "inquirer";
import * as fs from "fs";
import * as rd from 'readline';

export class input {

    private objectData: inputOutput;
    private numberOfLines: number;

    constructor() {
        this.objectData = {
            input: [],
            output: []
        }
        this.numberOfLines = 0;
    }

    async askForLines() {
        return Inquirer.prompt({
            name: 'lines',
            message: '¿Cuantas lineas escribira?',
            default: '¡Se necesita un valor!',
            type: 'number'
        }).then(answers => {
            this.numberOfLines = answers.lines;
            return answers;
        });
    }

    async askForType() {
        return Inquirer.prompt({
            type: 'list',
            name: 'type',
            message: '¿Escribira las lineas o las leera de un archivo?',
            choices: ["Escribirlas", "Leer un archivo"]
        })
    }

    async askForLine() {
        return Inquirer.prompt({
            type: 'input',
            name: 'line',
            message: 'Escribe la linea'
        })
    }

    async askForFile() {
        return Inquirer.prompt({
            type: 'input',
            name: 'fileName',
            message: 'Escribe el nombre del archivo'
        })
    }

    async askForRemoveEntryLines() {
        return Inquirer.prompt({
            type: 'checkbox',
            name: 'lines',
            message: 'Quieres quitar las lineas entrada?',
            choices: [
                'Si', 'No'
            ]
        })
    }

    async askForLinesToRemove() {
        return Inquirer.prompt({
            type: 'input',
            name: 'lines',
            message: 'Cuales lineas quieres quitar?'
        })
    }

    async readFile(fileName: string) {
        let reader = rd.createInterface(fs.createReadStream(`./${fileName}`));
        let lineas: Array<string> = [];

        for await(const line of reader) {
            lineas.push(line);
        }

        return lineas;
    }

    async input() {
        let type = await this.askForType();
        if(type.type == 'Escribirlas') {
            await this.askForLines();

            for (let index = 0; index < this.numberOfLines; index++) {
                let line = await this.askForLine();
                this.objectData.input.push(line.line);
            }

        } else {
            let fileName = await this.askForFile();
            this.objectData.input = await this.readFile(fileName.fileName);

            for (let index = 0; index < this.objectData.input.length; index++) {
                console.log(index + 1, this.objectData.input[index]);
                
            }

            let choice = await this.askForRemoveEntryLines()

            if(choice.lines == 'Si') {
                let linesToRemove = await this.askForLinesToRemove();

                let linesIndex = linesToRemove.lines.split(' ').map(function(item: any) {
                    return parseInt(item, 10);
                });

                for (let index = 0; index < linesIndex.length; index++) {
                    this.objectData.input.splice(linesIndex[index] - 1, 1);
                }

            }

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