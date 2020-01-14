# Ansible Server Deployment

## Prerequisites
On MacOS, you can use Homebrew to install ansible. Otherwise, follow [these instructions](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html).
```
$ brew install ansible
```

## Initial Setup (init.yml)
When setting up a new server (eg. spinning up a CentOS DO Droplet), run the following command after editing users.json.
This will setup all the users with the proper ssh keys, disable root user and password authentication.
```
$ ansible-playbook -i inventory -u root --extra-vars="target=xxx.xxx.xxx.xxx" init.yml
```
Note that if you are using Google Cloud's VM instances, you can add your ssh key into `Metadata` and this step is not required.

## Setting up ansible scripts
TODO

## Setup a new host
1. Add the hostname (IP address/ domain name) to the relevant group in `inventory/hosts`. The groups are useful if you want them to access `inventory/group_vars/<group name>` environment variables.

2. Create a file in `inventory/host_vars/` that matches the hostname.

3. Create a file named `<hostname>.yml` which runs specified roles. For example, if I want to install Docker in `seclab.space`, I would have a file like this:
```
- hosts: seclab.space
  roles:
    - common
    - docker
```
For each service you want to make, include it as a role in `roles/<service>`. An example barebones role is `roles/common`.

4. Execute the ansible script.
```
$ ansible-playbook -i inventory -u <your ssh username> -b <hostname>.yml
```
