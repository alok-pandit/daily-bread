include .envrc

run-be:
	cd be && go vet && golangci-lint run src && tygo generate && cp ./../rn/src/codegen/index.ts ./../fe/src/codegen/ && air && rm -rf ./../types && cd ..
	
nodemon:
	cd be && go vet && golangci-lint run src && nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run main.go && cd ..

nodemon-race:
	cd be && go vet && golangci-lint run src && nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run -race main.go && cd ..

tidy:
	cd be && go mod tidy && cd ..

build-container:
	cd be && docker build . -t alokpandit/db && cd ..

run-container:
	cd be && docker run --rm -d --net=host --env-file ./../.envrc --init alokpandit/db && cd ..

container:
	make build-container && make run-container

deploy:
	cd be && make build-container && sudo docker push alokpandit/hcab && cd ..

migration-create:
	@read -p "Enter Migration Name (In Snake Case): " name; \
	migrate create -ext sql -dir be/src/db/migrations/ -seq $$name

migration-up:
	migrate -path be/src/db/migrations/ -database ${DB_MIGRATION_URL} -verbose up

migration-down:
	migrate -path be/src/db/migrations/ -database ${DB_MIGRATION_URL} -verbose down

migration-fix:
	@read -p "Enter Migration Version Number: " version; \
	migrate -path be/src/db/migrations/ -database ${DB_MIGRATION_URL} force $$version

sqlc-compile:
	cd be && sqlc compile && cd ..

sqlc-gen:
	cd be && sqlc generate && cd ..

swag-doc:
	cd be && swag init -g main.go --output src/docs && cd ..

rn-start:
	cd rn && pnpm start && cd ..

rn-android:
	cd rn && pnpm android && cd ..

tnl:
	ngrok http --domain=${NGROK_STATIC_URL} ${PORT}

start:
	docker compose up -d && ttab 'make run-be' && ttab 'make rn-start' && ttab 'make rn-android' && ttab 'make tnl'
