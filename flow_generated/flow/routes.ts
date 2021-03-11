import * as interfaces from './interfaces';

// Document is a relaxed signature for a Flow document of any kind.
export type Document = unknown;
// Lambda is a relaxed signature implemented by all Flow transformation lambdas.
export type Lambda = (source: Document, register?: Document, previous?: Document) => Document[];

// "Use" imported modules, even if they're empty, to satisfy compiler and linting.
export type __interfaces_module = interfaces.__module;
// Import derivation classes from their implementation modules.
import { HelloGreetings } from '../../flow';

// Build instances of each class, which will be bound to this module's router.
const __HelloGreetings: interfaces.HelloGreetings = new HelloGreetings();

// Now build the router that's used for transformation lambda dispatch.
const routes: { [path: string]: Lambda | undefined } = {
    '/derive/hello/greetings/sayHello/Publish': __HelloGreetings.sayHelloPublish.bind(__HelloGreetings) as Lambda,
};

export { routes };
