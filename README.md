# Flow Project Template (Word Count)

This repository is an example and template for new Flow projects.
Try it in your browser by selecting **<> Code > Codespaces > New codespace**,
  using [GitHub Codespaces](https://github.com/features/codespaces). 
  
Not part of an organization with access to Codespaces? No problem. Follow the instructions 
to [set up a local devcontainer](https://docs.estuary.dev/getting-started/installation#using-visual-studio-code-devcontainers) 
and proceed in the same manner. Note, however, that [Mac M1](https://support.apple.com/en-us/HT211814) is not currently supported for local development. 

Wondering what Flow is?
See 📖 [Documentation](https://docs.estuary.dev/)
or :octocat: [github.com/estuary/flow](https://github.com/estuary/flow).
**tl;dr**: it makes it easy to continuously move and transform your data
across all the places you want it.

Through the magic of
[VSCode devcontainers](https://code.visualstudio.com/docs/remote/containers) ✨,
this repository comes with a PostgreSQL
database that you interact with.

## Continuous Materializations in PostgreSQL

PostgreSQL is super great, and supports materialized views,
but it doesn't offer _continuous_ materialized views.
So... let's build one with Flow?

How many times have you managed text documents in PostgreSQL and thought to yourself:
> "Gee-whiz, self, I wish I had a table of word counts that was always up-to-date!"

... basically never, right? Well, let's do it anyway! This example composes:
* Change data capture (CDC) from a `documents` table.
* A derivation which computes word and document frequency updates.
* A materialization back into a `word_counts` table.

## 🧪 Verify Tests

All cutting-edge word count projects should have tests.
Let's make sure the words are, um, counted:
```console
$ flowctl test --source word-counts.flow.yaml
... snip ...
Running  1  tests...
✔️ word-counts.flow.yaml :: acmeCo/tests/word-counts-from-documents

Ran 1 tests, 1 passed, 0 failed
```

## 🚢 Run It Locally

Start a local, temporary Flow data plane:
```console
$ flowctl temp-data-plane 
export BROKER_ADDRESS=http://localhost:8080
export CONSUMER_ADDRESS=http://localhost:9000
```

A data plane is a long-lived, multi-tenant, scale-out component that
usually runs in a data center.
Fortunately it also shrinks down to your laptop.
Note the exported addresses above; you'll need those.

⚙️ Deploy the catalog to your data plane:
```console
$ export BROKER_ADDRESS=http://localhost:8080
$ export CONSUMER_ADDRESS=http://localhost:9000
$ flowctl deploy --wait-and-cleanup --source flow.yaml
... snip ...
Deployment done. Waiting for Ctrl-C to clean up and exit.
```

🔍 Flow is now watching the `documents` table, and materializing to `word_counts`:
```console
$ psql --host localhost
psql (13.5 (Debian 13.5-0+deb11u1), server 13.2 (Debian 13.2-1.pgdg100+1))
Type "help" for help.

flow=# insert into documents (body) values ('The cat in the hat.'), ('hat Cat CAT!');
INSERT 0 2
flow=# select word, count, doc_count from word_counts;
 word | count | doc_count
------+-------+-----------
 cat  |     3 |         2
 hat  |     2 |         2
 in   |     1 |         1
 the  |     2 |         1
(4 rows)
flow=# update documents set body = 'cat Cat CAT!' where id = 2;
UPDATE 1
flow=# select word, count, doc_count from word_counts order by word;
 word | count | doc_count
------+-------+-----------
 cat  |     4 |         2
 hat  |     1 |         1
 in   |     1 |         1
 the  |     2 |         1
(4 rows)
flow=# delete from documents ;
DELETE 2
flow=# select word, count, doc_count from word_counts order by word;
 word | count | doc_count
------+-------+-----------
 cat  |     0 |         0
 hat  |     0 |         0
 in   |     0 |         0
 the  |     0 |         0
(4 rows)
```
