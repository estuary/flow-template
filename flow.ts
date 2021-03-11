import { collections, interfaces, registers } from 'flow/modules';

// Implementation for derivation flow.yaml#/collections/hello~1greetings/derivation.
export class HelloGreetings implements interfaces.HelloGreetings {
    sayHelloPublish(
        source: collections.HelloPeople,
        _register: registers.HelloGreetings,
        _previous: registers.HelloGreetings,
    ): collections.HelloGreetings[] {
        return [{ message: `Hello ${source.name}!` }];
    }
}
