#!/bin/bash

docker build -f Dockerfile.dev -t train-ticket-machine-frontend:dev .

docker run --rm -it -p 5173:5173 -v "$(pwd)":/app -v /app/node_modules train-ticket-machine-frontend:dev