#!/bin/bash

# Ensure the script runs in its own directory
cd "$(dirname "$0")" || exit 1

# Update from GitHub repository
echo "Updating repository from GitHub..."
git pull origin main || { echo "Git pull failed. Exiting."; exit 1; }

# Build Docker services
echo "Building Docker services..."
docker-compose build db
docker-compose build survey_app
docker-compose build csv_export

# Stop services
echo "Stopping Docker services..."
docker-compose stop survey_app
docker-compose stop csv_export
docker-compose stop db

# Start services
echo "Starting Docker services..."
docker-compose start db
docker-compose start survey_app
docker-compose start csv_export

# Exit
echo "All tasks completed successfully!"
exit 0
