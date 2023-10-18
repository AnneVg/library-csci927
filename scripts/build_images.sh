docker build --target base --tag base:latest -f ./docker/Dockerfile .
docker build --target library-prod-deps --tag library-prod-deps:latest -f ./docker/Dockerfile .
docker build --target library-build --tag library-build:latest -f ./docker/Dockerfile .