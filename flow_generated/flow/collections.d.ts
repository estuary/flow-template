import * as anchors from './anchors';

// "Use" imported modules, even if they're empty, to satisfy compiler and linting.
export type __module = null;
export type __anchors_module = anchors.__module;

// Generated from flow.yaml?ptr=/collections/hello~1greetings/schema.
// Referenced as schema of flow.yaml#/collections/hello~1greetings.
export type HelloGreetings = {
    message: string;
};

// Generated from flow.yaml?ptr=/collections/hello~1people/schema.
// Referenced as schema of flow.yaml#/collections/hello~1people.
export type HelloPeople = {
    name: string;
};
