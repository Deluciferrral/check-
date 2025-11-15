#!/bin/bash

# Deployment Status Checker
# Simple script to check if deployment has been completed

echo "🔍 Checking deployment status..."
echo ""

# Check if a deployment marker file exists
DEPLOY_MARKER=".deployed"

if [ -f "$DEPLOY_MARKER" ]; then
    echo "✅ Deployment detected!"
    echo ""
    echo "Deployment details:"
    cat "$DEPLOY_MARKER"
    exit 0
else
    echo "❌ No deployment detected."
    echo ""
    echo "To mark as deployed, run:"
    echo "  ./mark-deployed.sh"
    exit 1
fi
