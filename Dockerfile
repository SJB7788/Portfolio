# Use the official Go image as the base image
FROM golang:1.21 AS builder

# Set the working directory
WORKDIR /app

# Copy Go source code
COPY server.go .

# Download dependencies
RUN go mod init myproject && go mod tidy

# Build the Go application
RUN go build -o server

# Use a smaller base image for the final container
FROM alpine:latest

# Set working directory
WORKDIR /app

# Copy the built Go server binary
COPY --from=builder /app/server .

# Copy static files
COPY static ./static

# Expose port 8080
EXPOSE 8080

# Run the server
CMD ["./server"]
