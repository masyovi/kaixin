#!/bin/bash
while true; do
  echo "Starting dev server..."
  bun run dev > dev.log 2>&1 &
  PID=$!
  # Keep pinging every 2 seconds
  while kill -0 $PID 2>/dev/null; do
    sleep 2
    curl -s -o /dev/null http://localhost:3000/ 2>/dev/null
  done
  echo "Server died, restarting in 2s..."
  sleep 2
done
