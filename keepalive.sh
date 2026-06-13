#!/bin/bash
cd /home/z/my-project
while true; do
    npx next dev -p 3000 2>&1 >> /home/z/my-project/dev.log &
    PID=$!
    # Keep it alive
    for i in $(seq 1 300); do
        sleep 2
        if ! kill -0 $PID 2>/dev/null; then
            break
        fi
    done
    kill $PID 2>/dev/null
done
