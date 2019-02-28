export  function sayHello(){
    console.log("Hello from the greeter module");
}

export function sayGoodbye(){
    console.log("Goodbye from the greeter module");
}

export default function() {
    console.log("A message rom the default module");
}