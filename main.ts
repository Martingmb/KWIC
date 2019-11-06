import { ordering } from './filters/ordering';
import { circularShift } from './filters/circularShift';
import { input } from "./filters/input";


let inputFilter: input = new input();
let algorithmFilter: circularShift;
let order: ordering;

let lineas = ["Clouds are white.", "Pittsburgh is beautiful."];

// Input filter
inputFilter.setLines(lineas);

// Algorithm filter
let inputFilterDara = inputFilter.getData();
algorithmFilter = new circularShift(inputFilterDara);
algorithmFilter.circularShift();

// Order
let algorithmFilterData = algorithmFilter.getData();
order = new ordering(algorithmFilterData);
order.order();

// Final result
let orderData = order.getData();
console.log(orderData);
