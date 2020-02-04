from locust import HttpLocust, TaskSet


class ReliableBlogBackendUserBehavior(TaskSet):
    """
    Base methods for interacting with Reliable Blog Backend.
    """
    # auth token after logging in
    AUTH_TOKEN = None

    def headers(self) -> dict:
        h = {}
        if self.AUTH_TOKEN:
            h['Authorization'] = f"Bearer {self.AUTH_TOKEN}"

        return h

    def login(self, email, password):
        res_json = self.client.post('/auth', {'email': email, 'password': password}).json()

        if res_json.get('auth_token'):
            self.AUTH_TOKEN = res_json['auth_token']


class FlowUserLocust(HttpLocust):
    task_set = ReliableBlogBackendUserBehavior
    min_wait = 5000
    max_wait = 9000
