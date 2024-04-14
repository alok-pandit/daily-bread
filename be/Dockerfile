FROM golang:latest AS builder

# Set necessary environment variables needed for our image
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Move to working directory /build
WORKDIR /build

# Copy and download dependency using go mod
COPY go.mod .
COPY go.sum .
# COPY .env .
RUN go mod download && go mod verify && go mod tidy

# Copy the code into the container
COPY . .

# Build the application
RUN go build -o main .

# Move to /dist directory as the place for resulting binary folder
WORKDIR /dist

# Copy binary from build to main folder
RUN cp /build/main .
# RUN cp /build/.env .

# Certs need to be added
FROM alpine:latest as certs
RUN apk --no-cache add ca-certificates

# Build a small image
FROM scratch

COPY --from=builder /dist/main /
# COPY --from=builder /dist/.env /
COPY --from=certs /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt

# Runs "/usr/bin/dumb-init -- /my/script --with --args"
# ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Command to run
CMD ["/main"]