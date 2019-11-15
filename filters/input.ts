import { inputOutput } from './../interfaces/inputOutput';
import * as Inquirer from "inquirer";
import * as fs from "fs";
import * as rd from 'readline';

export class input {

    private objectData: inputOutput;
    private orderType: number;
    private numberOfLines: number;
    private blacklistWords: Array<any>;

    constructor() {
        this.objectData = {
            input: [],
            output: []
        }
        this.orderType = 0;
        this.numberOfLines = 0;
        this.blacklistWords = [];
        this.readBlackWord();
    }

    async readBlackWord() {
        let reader = rd.createInterface(fs.createReadStream('./KWIC2_stop.txt'));
        for await(const line of reader) {
            this.blacklistWords.push(line);
        }
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

    async askForRemoveStopWords() {
        return Inquirer.prompt({
            type: 'checkbox',
            name: 'result',
            message: 'Quieres quitar las stop words?',
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

    async askForOrderType() {
      return Inquirer.prompt({
            type: 'list',
            name: 'orderType',
            message: 'Escoge un orden',
            choices: ["Ascendente", "Descendente"]
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

    checkBlacklist(word: string) {
        this.blacklistWords.forEach(bword => {
            if(bword == word) {
                return false;
            }
        })

        return true;
    }

    async input() {
        // Ask for order type
        let orderType = await this.askForOrderType();
        if(orderType.orderType == "Ascendente") {
          this.orderType = 1;
        } else {
          this.orderType = 2;
        }
        if(orderType.orderType != 0) {
          // Ask for type
          let type = await this.askForType();
          if(type.type == 'Escribirlas') {
              // Ask for lines
              await this.askForLines();

              for (let index = 0; index < this.numberOfLines; index++) {
                  let line = await this.askForLine();
                  this.objectData.input.push(line.line);
              }
          } else {
              // Ask for file name
              let fileName = await this.askForFile();
              this.objectData.input = await this.readFile(fileName.fileName);

              let choice = await this.askForRemoveEntryLines()

                if(choice.lines == 'Si') {
                    this.objectData.input.forEach((line, index) => {
                        console.log(index + 1, line)
                    })

                    let linesToRemove = await this.askForLinesToRemove();

                    let linesIndex = linesToRemove.lines.split(' ').map(function(item: any) {
                        return parseInt(item, 10);
                    }).sort((a:any, b:any) => (a > b ? -1 : 1));

                    if(linesIndex[0] - 1 >= this.objectData.input.length || linesIndex[linesIndex.length] <= 0) {
                        throw Error('Fuera de Rango');
                    }

                    for (let index = 0; index < linesIndex.length; index++) {
                            this.objectData.input.splice(linesIndex[index] - 1, 1);
                    }

                    

                }

                let stopWords = await this.askForRemoveStopWords();

                    if(stopWords.result == 'Si') {
                        for (let index = 0; index < this.objectData.input.length; index++) {
                            let line = this.objectData.input[index].split(" ");
                            let arrTemp: any = [];
                            line.forEach(word => {
                                if(this.checkBlacklist(word)) {
                                    arrTemp.push(word);
                                }
                            })

                            this.objectData.input[index] = arrTemp.join(" ");
                        }
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

    /**
     *!Funcion que regresa el orderType
     *
     * @returns {orderType}
     * @memberof input
     */
    getOrderType(): number {
      return this.orderType;
    }
}
