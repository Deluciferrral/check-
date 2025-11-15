# check-
snap check into crypto

## Deployment Status Checker

This repository includes simple scripts to check and mark deployment status.

### Usage

**To check if deployed:**
```bash
./check-deploy.sh
```

**To mark as deployed:**
```bash
./mark-deployed.sh
```

### How It Works

- `check-deploy.sh` - Checks for a `.deployed` marker file and displays deployment information
- `mark-deployed.sh` - Creates a `.deployed` marker file with deployment timestamp and details

This provides a simple answer to "did you deploy?"
