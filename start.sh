#!/bin/bash

# Store process IDs
PIDS=()

# Start frontend
echo "Starting Frontend..."
cd frontend
npm run dev &
PIDS+=($!)

# Start backend
echo "Starting Backend..."
cd ../backend
node server.js &
PIDS+=($!)

# Start recommender
echo "Starting Recommender..."
cd ../recommender
python app/app.py &
PIDS+=($!)

# Trap SIGINT (Ctrl+C) and kill all child processes
trap "echo 'Stopping all processes...'; kill ${PIDS[@]}; exit" SIGINT

# Wait for processes to finish
wait