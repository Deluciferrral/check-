#!/bin/bash

# Mark Deployment
# Simple script to mark a deployment as complete

echo "📝 Marking deployment..."

DEPLOY_MARKER=".deployed"

cat > "$DEPLOY_MARKER" << EOF
Deployment Date: $(date)
Deployed By: ${USER:-unknown}
Host: $(hostname)
EOF

echo "✅ Deployment marked successfully!"
echo ""
echo "Run './check-deploy.sh' to verify deployment status."
