# Ansible Server Deployment

## Prerequisites
On MacOS, you can use Homebrew to install ansible. Otherwise, follow [these instructions](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html).
```
$ brew install ansible
```
Then install third party roles for Ansible.
```
$ ansible-galaxy install -r requirements.yml
```

## Initial Setup (init.yml)
When setting up a new server (eg. spinning up a CentOS DO Droplet), run the following command after editing users.json.
This will setup all the users with the proper ssh keys, disable root user and password authentication.
```
$ ansible-playbook -i inventory -u root --extra-vars="target=xxx.xxx.xxx.xxx" init.yml
```
Note that if you are using Google Cloud's VM instances, you can add your ssh key into `Metadata` instead. This step is not required.

## Setting up ansible scripts
1. You need a `password.secret` file with the proper password, since we have passwords encrypted with ansible-vault. See below for instructions on how to do so.
```
echo '<your password>' > password.secret
```
2. You can run a script `<host name>.yml` with the following command.
```
$ ansible-playbook -i inventory -u <your username> -b --vault-password-file ./password.secret <hostname>.yml
```

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

## Using ansible vault
Simply run the following command in ansible. An example output is provided.
```
$ ansible-vault encrypt_string --vault-password-file ansible/password.secret '123' --name 'secret_key_base'
secret_key_base: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  38646365623561646466316161636332336136363134613438663861316339306665353532306439
  6361656236313839386162383837346332333430346130360a396533653766306262396163613563
  38366562643462376261366661626265336237653863636232633832383438656633373861346432
  3638383736333363390a303632393038623530643664643764636362343738336233643663383863
  33663563343132343065626137346536343666336362303762636663623635343965343433656433
  62663463356431343763623737383961633435333962323839386136616161666261656561393537
  31626239386665393164356435656535343435643639646338363065373665303263373132393937
  31636631653930326435303636663761323035386339633766613632313331633632383338346133
  63353161653631323138376662363032613761613762346337333130306433343862
Encryption successful
```
You can paste it into the file for `group_vars` and `host_vars`.
