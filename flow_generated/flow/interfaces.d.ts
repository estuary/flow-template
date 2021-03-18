import * as collections from './collections';
import * as registers from './registers';
import * as transforms from './transforms';

// "Use" imported modules, even if they're empty, to satisfy compiler and linting.
export type __module = null;
export type __collections_module = collections.__module;
export type __registers_module = registers.__module;
export type __transforms_module = transforms.__module;

// Generated from derivation hello-world.flow.yaml#/collections/greetings/derivation.
// Required to be implemented by hello-world.flow.ts.
export interface Greetings {
    sayHelloPublish(
        source: collections.People,
        register: registers.Greetings,
        previous: registers.Greetings,
    ): collections.Greetings[];
}
