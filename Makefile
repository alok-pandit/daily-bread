nodemon:
	cd be && go vet && golangci-lint run src && nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run main.go && cd ..

nodemon-race:
	cd be && go vet && golangci-lint run src && nodemon --watch './**/*.go' --signal SIGTERM --exec 'go' run -race main.go && cd ..

tidy:
	cd be && go mod tidy && cd ..

build-container:
	cd be && sudo docker build . -t alokpandit/hcab && cd ..

run-container:
	cd be && sudo docker run --rm -it -p 5000:5000 alokpandit/hcab && cd ..

container:
	cd be && make build-container && make run-container && cd ..

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