#!/usr/bin/env bash

lxc config set core.https_address 127.0.0.1
lxc config trust add $HOME/.config/lxc/client.crt

export NODE_ENV=development
export LXD_URI=https://127.0.0.1:8443/
export LXD_CERT=$HOME/.config/lxc/client.crt
export LXD_KEY=$HOME/.config/lxc/client.key

npm run start-dev-server

