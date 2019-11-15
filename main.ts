import { ordering } from './filters/ordering';
import { circularShift } from './filters/circularShift';
import { input } from "./filters/input";


let inputFilter: input = new input();
let algorithmFilter: circularShift;
let order: ordering;

async function main() {

    await inputFilter.input();

    // Algorithm filter
    let inputFilterData = inputFilter.getData();
    algorithmFilter = new circularShift(inputFilterData);
    algorithmFilter.circularShift();

    // Order
    let algorithmFilterData = algorithmFilter.getData();
    let orderType = inputFilter.getOrderType();
    order = new ordering(algorithmFilterData, orderType);
    order.order();

    // Final result
    let orderData = order.getData();

    for (let index = 0; index < orderData.output.length; index++) {
        console.log(index + 1, orderData.output[index]);
    }
}

main();
