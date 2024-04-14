package main

import (
	"bufio"
	"bytes"
	"fmt"
	"os"
	"strings"
)

func main() {

	// Path to your .envrc file (replace with your actual path)
	envrcPath := "./../../.envrc"

	// Read the .envrc file content
	data, err := os.ReadFile(envrcPath)

	if err != nil {
		fmt.Printf("Error reading .envrc file: %v\n", err)
		return
	}

	// Create an empty string slice to store keys
	var keys []string

	// Read line by line using a scanner
	scanner := bufio.NewScanner(bytes.NewReader(data))

	for scanner.Scan() {

		line := scanner.Text()

		// Skip empty lines and comments
		if strings.TrimSpace(line) == "" || strings.HasPrefix(line, "#") {
			continue
		}

		// Extract the key (assuming key=value format)
		parts := strings.SplitN(line, " ", 2)

		if len(parts) != 2 {
			fmt.Printf("Invalid line format in .envrc: %s\n", line)
			continue
		}

		key := strings.TrimSpace(parts[1])

		// Append the key to the slice
		keys = append(keys, key)

	}

	if err := scanner.Err(); err != nil {
		fmt.Printf("Error scanning .envrc file: %v\n", err)
		return
	}

	// Print the extracted keys
	fmt.Println("Extracted keys:")

	for _, key := range keys {
		fmt.Println(key)
	}

	// Remove the .envrc file
	envFilePath := "./.env"

	er := os.Remove(envFilePath)

	if er != nil {
		fmt.Println("Warning:", er)
	} else {
		fmt.Println("File", envFilePath, "removed successfully.")
	}

	// Open Dockerfile for writing (replace with your Dockerfile path)
	envfile, err := os.OpenFile("./.env", os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		fmt.Printf("Error opening envfile: %v\n", err)
		return
	}
	defer envfile.Close()

	// Write ENV instructions for each key
	for _, key := range keys {
		fmt.Fprintf(envfile, "\n%s\n", key)
	}

	fmt.Println("Successfully added environment variables to .env file")

}
