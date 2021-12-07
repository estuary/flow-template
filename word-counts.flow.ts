import { collections, interfaces, registers, anchors } from 'flow/modules';

// Implementation for derivation word-counts.flow.yaml#/collections/acmeCo~1word-counts/derivation.
export class AcmeCoWordCounts implements interfaces.AcmeCoWordCounts {
    fromDocumentsPublish(
        source: collections.AcmeCoDocuments,
        _register: registers.AcmeCoWordCounts,
        _previous: registers.AcmeCoWordCounts,
    ): collections.AcmeCoWordCounts[] {
        const out: collections.AcmeCoWordCounts[] = [];

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

function updates(doc: anchors.PublicDocuments, delta: number, out: collections.AcmeCoWordCounts[]) {
    // A very basic tokenizer of the string, converting to lowercase words.
    const words = doc.body?.toLocaleLowerCase().match(/(\w+)/gu);

    // Emit an output for all words, updating its total count, and then for _unique_ words,
    // updating its document count. It might seem inefficient to emit all of these little
    // documents, but it's not: Flow eagerly combines them on the collection key.
    words?.map((word) => out.push({ word: word, count: delta, doc_count: 0 }));
    [...new Set(words)].map((word) => out.push({ word: word, count: 0, doc_count: delta }));
}
