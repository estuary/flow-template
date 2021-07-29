FROM quay.io/estuary/flow:dev

# Switch to the root user to install packages and setup sudo access
USER root
RUN apt-get update -y \
    && apt-get install --no-install-recommends -y \
      postgresql-client \
      sqlite3 \
      pv \
      jq \
      sudo \
      git

RUN curl -L -o /usr/bin/websocat https://github.com/vi/websocat/releases/download/v1.6.0/websocat_amd64-linux \
		&& echo "cec0d7d05252dcadb09a5afb8851cf9f3a8997bba44334eee5f7db70ca72aa0b /usr/bin/websocat" | sha256sum -c - \
		&& chmod +x /usr/bin/websocat \
		&& websocat --version

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
