export function addAndRemoveClasses(add, remove, elements){
    let argumentsArray = Array.prototype.slice.call(arguments);
    for(let i = 0; i < argumentsArray.length; i++){
        let arg = argumentsArray[i];
        if(!arg) continue;
        if(!Array.isArray(arg) && typeof arg !== 'string' && !(arg instanceof Element)){
            throw 'Elements is not an array, string or DOM element.';
        }
        if(!Array.isArray(arg)) argumentsArray[i] = [arg];
    }
    const [addArr, removeArr, elementsArr] = argumentsArray;
    elementsArr.forEach(element => {
        if(!(element instanceof Element)) throw 'Not using DOM elements';
        if(addArr){
            addArr.forEach(add => {
                element.classList.add(add);
            });
        }
        if(removeArr){
            removeArr.forEach(remove => {
                element.classList.remove(remove);
            });
        }
    });
};