FROM ghcr.io/estuary/flow:dev

# Switch to the root user to install packages and setup sudo access
USER root

RUN apt-get update -y \
    && apt-get install --no-install-recommends -y \
      ca-certificates \
      git \
      gnupg \
      jq \
      postgresql-client \
      procps \
      pv \
      sqlite3 \
      sudo \
      vim-tiny

# Enable the google-cloud-sdk repository.
# Users may want to run `gcloud auth application-default login` to enable key management with the `sops` tool
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list \
    && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - \
    && apt-get update -y \
    && apt-get install google-cloud-sdk --no-install-recommends -y

# Allow users to use sudo inside the dev container. This allows people to install their own
# software in the container without modifying this Dockerfile.
RUN echo flow ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/flow \
    && chmod 0440 /etc/sudoers.d/flow

# Generate Flow catalog JSON-Schema for integration with VSCode.
RUN flowctl json-schema > /usr/local/etc/flow.schema.json

# Adapted from: https://github.com/microsoft/vscode-dev-containers/tree/main/containers/docker-from-docker#adding-the-user-to-a-docker-group
COPY library-scripts/docker-debian.sh /tmp/library-scripts/
RUN bash /tmp/library-scripts/docker-debian.sh true /var/run/docker-host.sock /var/run/docker.sock flow false

# VS Code overrides ENTRYPOINT and CMD when executing `docker run` by default.
# Setting the ENTRYPOINT to docker-init.sh will configure non-root access to
# the Docker socket if "overrideCommand": false is set in devcontainer.json.
# The script will also execute CMD if you need to alter startup behaviors.
ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]

USER flow
