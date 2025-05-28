# Use Go image to build the application
FROM golang:1.21 AS builder

WORKDIR /app

# Copy Go source code
COPY ["server.go", "SeungJae_Baek_Resume.pdf", "./"]

# Download dependencies
RUN go mod init main && go mod tidy

# Build the Go binary
RUN go build -o /app/server -ldflags="-extldflags=-static"

# Use minimal Alpine image for final container
FROM alpine:latest
WORKDIR /app

# Install required dependencies for Go binaries
RUN apk add --no-cache libc6-compat  

# Copy the Go binary from the builder stage
COPY --from=builder /app/server /app/server

# Set executable permissions
RUN chmod +x /app/server  

# Copy Resume PDF
COPY SeungJae_Baek_Resume.pdf .

# Copy static files
COPY public ./public

# Expose port 8080
EXPOSE 8080

# Run the server
CMD ["./server"]
