#!/bin/bash
cd /home/kavia/workspace/code-generation/cyberlegal-insight-hub-38738-1f868d27/cyberlegal_insight_hub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

