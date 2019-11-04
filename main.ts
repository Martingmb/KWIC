import { ordering } from './filters/ordering';
import { circularShift } from './filters/circularShift';
import { input } from "./filters/input";


let inputFilter: input = new input();
let algorithmFilter: circularShift;
let order: ordering;

let lineas = ["Clouds are white", "Pittsburgh is beautiful."];

inputFilter.setLines(lineas);

algorithmFilter = new circularShift(inputFilter.getData());

algorithmFilter.circularShift();

console.log(algorithmFilter.getData());