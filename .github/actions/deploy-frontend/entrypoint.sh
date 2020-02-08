#!/bin/sh

echo "$VAULT_PASS" > ~/password.secret
mkdir ~/.ssh
echo "$DEPLOY_KEY" > ~/.ssh/id_rsa
chmod 0600 ~/.ssh/id_rsa

ansible-playbook -i ansible/inventory -u choyiny -b --vault-password-file ./password.secret ansible/deployingreliable.software/redeploy-frontend.yml --extra-vars="frontend_image=$IMAGE_URL"
