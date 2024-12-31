#!/bin/bash

# Ensure the script runs in its own directory
cd "$(dirname "$0")" || exit 1


# Stop services
echo "Stopping Docker services..."
docker-compose stop survey_app
docker-compose stop csv_export
docker-compose stop db


# Exit
echo "All tasks completed successfully!"
exit 0
