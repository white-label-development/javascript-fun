
import theDefaultCanHaveAnyName from "./greeter";
import {sayHello, sayGoodbye} from "./greeter";


sayHello();
sayGoodbye();
theDefaultCanHaveAnyName();

var greet = function(){
    console.log("Yo (from module-resolution.ts)");
}
greet();

 


