#!/bin/bash

# Konfigurasi
SERVER="root@157.245.201.45"
REMOTE_DIR="/var/www/html/whatsapp-gateway"
LOCAL_DIR="."

# Warna untuk output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Starting deployment...${NC}"

# Sync files ke server
echo -e "${GREEN}Syncing files to server...${NC}"
rsync -avz --exclude 'node_modules' \
           --exclude '.git' \
           --exclude 'deploy.sh' \
           --exclude 'deploy_temp' \
           --exclude 'package-lock.json' \
           "$LOCAL_DIR/" "$SERVER:$REMOTE_DIR/"

# Install dependencies dan restart service
echo -e "${GREEN}Installing dependencies and restarting service...${NC}"
ssh "$SERVER" "cd $REMOTE_DIR && \
    export NVM_DIR=\"/root/.nvm\" && \
    [ -s \"\$NVM_DIR/nvm.sh\" ] && \. \"\$NVM_DIR/nvm.sh\" && \
    nvm use 20 && \
    npm install && \
    systemctl restart whatsapp-gateway"

echo -e "${GREEN}Deployment completed!${NC}" 

# rCm3vKC3#ny1fsXqtG