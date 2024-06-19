include .envrc

run-be:
	cd be && go vet && golangci-lint run src && tygo generate && cp ./../rn/src/gen/index.ts ./../fe/src/gen/ && air && rm -rf ./../types && cd ..
	
nodemon:
	cd be && go vet && golangci-lint run src && nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run main.go && cd ..

nodemon-race:
	cd be && go vet && golangci-lint run src && nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run -race main.go && cd ..

tidy:
	cd be && go mod tidy && cd ..

env-creation:
	cd scripts/env && ./env && cd ..

build-container:
	cd be && docker build . -t alokpandit/db && cd ..

run-container: env-creation
	cd be && docker run --rm -d --net=host --env-file ./../scripts/env/.env --init alokpandit/db && cd ..

container: build-container
	make run-container

deploy:
	cd be && make build-container && docker push alokpandit/db && cd ..

migration-create:
	@read -p "Enter Migration Name (In Snake Case): " name; \
	migrate create -ext sql -dir be/src/db/migrations/ -seq $$name

migration-up:
	migrate -path be/src/db/migrations/ -database ${db_migration_url} -verbose up

migration-down:
	migrate -path be/src/db/migrations/ -database ${db_migration_url} -verbose down

migration-fix:
	@read -p "Enter Migration Version Number: " version; \
	migrate -path be/src/db/migrations/ -database ${db_migration_url} force $$version

sqlc-compile:
	cd be && sqlc compile && cd ..

sqlc-gen: sqlc-compile
	cd be && sqlc generate && cd ..

swag-doc:
	cd be && swag init -g main.go --output src/docs && cd ..

rn-start:
	cd rn && pnpm start && cd ..

rn-android:
	cd rn && pnpm android && cd ..

tnl:
	ngrok http --domain=${ngrok_static_url} ${port} --request-header-add='host: localhost:3000'

run-fe:
	cd fe && pnpm dev && cd ..

start:
	docker compose up -d && ttab 'make run-be' && ttab 'make rn-start' && ttab 'make rn-android' && ttab 'make tnl' && ttab 'make run-fe'

initial-setup: tidy
	cd rn && npm i && cd .. && sudo snap install sqlc && curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sudo sh -s -- -b $(go env GOPATH)/bin v1.57.2 && go install github.com/gzuidhof/tygo@latest && go install github.com/air-verse/air@latest && go install github.com/swaggo/swag/cmd/swag@latest && cd fe && pnpm i cd cd .. && npm i -g nodemon turbo
	