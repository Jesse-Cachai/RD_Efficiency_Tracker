#!/bin/bash

# Ensure the script runs in its own directory
cd "$(dirname "$0")" || exit 1

# Update from GitHub repository
echo "Updating repository from GitHub..."
git pull origin main || { echo "Git pull failed. Exiting."; exit 1; }

# Build and run Docker services
docker-compose up --build -d


# Exit
echo "All tasks completed successfully!"
exit 0
