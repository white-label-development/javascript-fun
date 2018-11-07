
function greet(){
    console.log('hello world from greeter.ts');
}


export default greet; //export (default?) the named function.

// can also use a shorter format (except a module cannot have multiple default exports)
//export default function greetAgain(){ console.log('hello from greetAgain'); }