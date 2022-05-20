import { Document, FromDocumentsSource, IDerivation, Register } from 'flow/acmeCo/word-counts';

import { PublicDocuments } from 'flow/acmeCo/documents';

// Implementation for derivation
// word-counts.flow.yaml#/collections/acmeCo~1word-counts/derivation.
export class Derivation implements IDerivation {
    fromDocumentsPublish(source: FromDocumentsSource, _register: Register, _previous: Register): Document[] {
        const out: Document[] = [];

        switch (source._meta.op) {
            case 'c':
                updates(source, 1, out);
                break;
            case 'u':
                updates(source, 1, out);
                updates(source._meta.before!, -1, out);
                break;
            case 'd':
                updates(source, -1, out);
                break;
        }
        return out;
    }
}

function updates(doc: FromDocumentsSource | PublicDocuments, delta: number, out: Document[]) {
    // A very basic tokenizer of the string, converting to lowercase words.
    const words = doc.body?.toLocaleLowerCase().match(/(\w+)/gu);

    // Emit an output for all words, updating its total count, and then for
    // _unique_ words, updating its document count. It might seem inefficient to
    // emit all of these little documents, but it's not: Flow eagerly combines
    // them on the collection key.
    words?.map((word: string) => out.push({ word: word, count: delta, doc_count: 0 }));
    [...new Set(words)].map((word) => out.push({ word: word, count: 0, doc_count: delta }));
}
