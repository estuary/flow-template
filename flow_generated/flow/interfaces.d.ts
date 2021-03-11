import * as collections from './collections';
import * as registers from './registers';
import * as transforms from './transforms';

// "Use" imported modules, even if they're empty, to satisfy compiler and linting.
export type __module = null;
export type __collections_module = collections.__module;
export type __registers_module = registers.__module;
export type __transforms_module = transforms.__module;

// Generated from derivation flow.yaml#/collections/hello~1greetings/derivation.
// Required to be implemented by flow.ts.
export interface HelloGreetings {
    sayHelloPublish(
        source: collections.HelloPeople,
        register: registers.HelloGreetings,
        previous: registers.HelloGreetings,
    ): collections.HelloGreetings[];
}
