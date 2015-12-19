#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

sudo apt-get install -y software-properties-common

sudo add-apt-repository -y ppa:ubuntu-lxc/lxd-stable
sudo add-apt-repository -y ppa:zfs-native/stable
sudo add-apt-repository -y ppa:nginx/stable

echo "Installing packages..."
sudo apt-get update -y
curl -sL https://deb.nodesource.com/setup_5.x | sudo bash -
sudo apt-get install -y lxd ubuntu-zfs nginx nodejs build-essential

sudo newgrp lxd
sudo modprobe zfs

echo "Setting up ZFS..."
sudo dd if=/dev/zero of=/root/zfsdisk1.img bs=1024 count=10485760 # 10gb
sudo zpool create lxc /root/zfsdisk1.img
sudo zpool set listsnapshots=on lxc

sudo lxc config set storage.zfs_pool_name lxc
sudo lxc config set core.https_address 127.0.0.1

# echo "Importing base image..."
# sudo lxd-images import ubuntu --alias ubuntu

# Create and start container
# sudo lxc launch ubuntu my-ubuntu

# Nested container support
# sudo lxc launch ubuntu lxd -c security.nesting=true -c security.privileged=true
