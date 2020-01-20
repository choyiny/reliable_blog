from locust import HttpLocust, TaskSet


class ReliableBlogBackendUserBehavior(TaskSet):
    """
    Base methods for interacting with Reliable Blog Backend.
    """
    pass


class FlowUserLocust(HttpLocust):
    task_set = ReliableBlogBackendUserBehavior
    min_wait = 5000
    max_wait = 9000
