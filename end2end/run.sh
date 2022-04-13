#!/bin/bash
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$ROOT" || exit
set -ev

docker build -t tests .
docker tag tests re.srg-it.ru/srg/tests:latest

mkdir -p .reports

docker run --rm -i \
  -e "ENVIRONMENT=$ENVIRONMENT" \
  -v "$PWD/.reports:/usr/src/app/.reports" \
  "$@" \
  tests


