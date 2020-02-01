# Deploying Reliable Software
A CSCD94 - Computer Science Project with Professor [Thierry Sans](https://github.com/thierrysans).

## Introduction
[Our website](https://deployingreliable.software)

An extension to the existing “Programming on the Web” course at the University of Toronto Scarborough. This research project aims to follow the two books by Google, Site Reliability Engineering and Site Reliability Workbook. There are two main objectives:
- What is the Google way of deploying software used by millions of people?
- How to maintain high availability while allowing for frequent software updates?

## Development Setup
Prerequisites: Docker and Docker Compose installed in your system.

1. To start all servers in development mode, simply run
```
$ docker-compose up -d
```

## Technologies
We try to use a range of technologies in this demo. Here are the list of technologies used and its functionality.

### Application Stack
- Ruby on Rails: Backend server REST framework
- Angular 8: Frontend framework
- Nginx: Reverse proxying for applications

### Monitoring
- Grafana: Dashboard to show statistics and alert if thresholds are exceeded.
- node_exporter: A companion for Prometheus to export server statistics.
- Prometheus: A time series database to store data.
- Sentry: An external service to track application errors.
