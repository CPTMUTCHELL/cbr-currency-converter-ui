#! /bin/sh
set -x
set -e
export EXTERNAL_IP=$echo$(curl ifconfig.me)
echo "ip: $EXTERNAL_IP"

