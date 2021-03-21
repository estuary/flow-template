import { collections, interfaces, registers } from 'flow/modules';

// Implementation for derivation flow.yaml#/collections/greetings/derivation.
export class Greetings implements interfaces.Greetings {
    sayHelloPublish(
        source: collections.People,
        _register: registers.Greetings,
        _previous: registers.Greetings,
    ): collections.Greetings[] {
        return [{ id: source.id, greeting: `Hello ${source.name}!` }];
    }
}
