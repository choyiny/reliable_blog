#!/bin/sh

echo -n "$VAULT_PASS" > ~/password.secret
mkdir ~/.ssh
echo "$DEPLOY_KEY" > ~/.ssh/id_rsa
chmod 0600 ~/.ssh/id_rsa

ansible-playbook -i ansible/inventory -u $SSH_USERNAME -b --vault-password-file ~/password.secret ansible/$(echo $DEPLOY_FILE) -e "$EXTRA_VARS"
