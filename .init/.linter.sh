#!/bin/bash
cd /home/kavia/workspace/code-generation/quiz-tracker-platform-11832-11841/quiz_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

