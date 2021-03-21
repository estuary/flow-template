FROM quay.io/estuary/flow:dev

# Switch to the root user to install packages and setup sudo access
USER root
RUN apt-get update -y \
    && apt-get install --no-install-recommends -y \
      postgresql-client \
      pv \
      sudo \
    && rm -rf /var/lib/apt/lists/*

# Allow users to use sudo inside the dev container. This allows people to install their own
# software in the container without modifying this Dockerfile.
RUN echo flow ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/flow \
    && chmod 0440 /etc/sudoers.d/flow

# Generate Flow catalog JSON-Schema for integration with VSCode.
RUN flowctl json-schema > /usr/local/etc/flow.schema.json

USER flow
