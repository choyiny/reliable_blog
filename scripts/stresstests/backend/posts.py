import random
from json import JSONDecodeError

from locust import HttpLocust, task, between

from backend.blog_backend import ReliableBlogBackendUserBehavior


class ViewPostsBehavior(ReliableBlogBackendUserBehavior):
    """
    Stress Testing for Unauthenticated requests towards backend
    $ PYTHONPATH=. locust -f backend/posts.py --host=https://backend.deployingreliable.software
    """
    POST_IDS = []

    @task(2)
    def fail_login(self):
        self.login('xxxxx@xxxx.com', 'password-does-not-work')

    @task(2)
    def view_homepage_posts(self):
        with self.client.get('/posts', headers=self.headers(), catch_response=True) as res:
            try:
                res_json = res.json()
                self.POST_IDS = [p['id'] for p in res_json]
            except JSONDecodeError:
                res.failure(res.content)

    @task(6)
    def view_post(self):
        if len(self.POST_IDS) > 0:
            self.client.get(f"/posts/{random.choice(self.POST_IDS)}", name='/posts/$id', headers=self.headers())
        else:
            self.view_homepage_posts()

    @task(1)
    def view_nonexisting_post(self):
        with self.client.get(
                f"/posts/123456",
                name='/posts/$does-not-exist',
                headers=self.headers(),
                catch_response=True
        ) as res:
            res.success()


class WebsiteUser(HttpLocust):
    task_set = ViewPostsBehavior
    wait_time = between(10, 50)
