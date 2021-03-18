import * as anchors from './anchors';

// "Use" imported modules, even if they're empty, to satisfy compiler and linting.
export type __module = null;
export type __anchors_module = anchors.__module;

// Generated from hello-world.flow.yaml?ptr=/collections/greetings/schema.
// Referenced as schema of hello-world.flow.yaml#/collections/greetings.
export type Greetings = {
    message: string;
};

// Generated from hello-world.flow.yaml?ptr=/collections/people/schema.
// Referenced as schema of hello-world.flow.yaml#/collections/people.
export type People = {
    name: string;
};
