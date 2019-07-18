#!/bin/bash

echo "Getting the Bitcoin price using contracts on provable:starter container using docker compose"
docker-compose -f docker-compose.yml up --build

TR=$?
echo exitcode=${TR}

echo "removing................"
docker-compose -f docker-compose.yml rm -f
docker rmi provable:starter
docker rmi bridge:starter
docker rmi trufflesuite/ganache-cli:v6.1.0 -f

if [ ${TR} -eq 0 ]; then
    echo "Bitcoin price is successfully retrieved!"
    exit 0
else
    echo "Bitcoin price is not successfully retrieved!"
    exit 1
fi
