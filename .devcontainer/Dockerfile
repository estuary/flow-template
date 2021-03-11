# Update the VARIANT arg in docker-compose.yml to pick a Node version: 10, 12, 14
ARG VARIANT=12

FROM quay.io/estuary/flow:v0.1.0-227-g917df3d-dirty
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

RUN apt-key adv --refresh-keys --keyserver keyserver.ubuntu.com \
    && apt-get update -y \
    && apt-get install --no-install-recommends -y \
      ca-certificates \
      curl \
      liblz4-1 \
      libreadline7 \
      libsnappy1v5 \
      libzstd1 \
      postgresql-client \
      pv \
    && rm -rf /var/lib/apt/lists/*

# Copy in Estuary Flow release binaries.
COPY --from=0 /usr/local/bin/* /usr/local/bin/
COPY --from=0 /usr/local/lib/librocksdb.* /usr/local/lib/
RUN ldconfig
# Generate Flow catalog JSON-Schema for integration with VSCode.
RUN flowctl json-schema > /usr/local/etc/flow.schema.json

RUN mkdir -p /var/lib/flow
ENV FLOW_NODEJS_DIR=/var/lib/flow/nodejs

