import asyncio
import aiohttp
import logging
import sys
import threading
import time
import requests

logger = get_logger()
urls = ["https://kube1.deployingreliable.software"]
obj = type('', (), {})()
obj.stats = {'total': 0}

def get_logger():
  root = logging.getLogger()
  root.setLevel(logging.INFO)

  handler = logging.StreamHandler(sys.stdout)
  handler.setLevel(logging.INFO)
  formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
  handler.setFormatter(formatter)
  root.addHandler(handler)
  return root

def inc_obj_node(obj, node):
  obj.stats['total'] += 1
  if node in obj.stats:
    obj.stats[node] += 1
  else:
    obj.stats[node] = 1

def parse_data(a):
  b = a.split("\n")
  c = [x.split() for x in b[1:-1]]
  d = {x[0][:-1].lower(): x[1] for x in c}
  return d

def thr(url, x):
  for _ in range(x):
    r = requests.get(url)
    data = parse_data(r.content.decode())
    inc_obj_node(obj, data['hostname'])
    logger.debug(f"[GET] {url} {data}")

def check_thread(threads):
  while any([t.is_alive() for t in threads]):
    logger.info(obj.stats)
    time.sleep(1)

def main():
  num_threads = 4
  num_requests = 300
  threads = [ threading.Thread(target = thr, args=(urls[0], num_requests//num_threads)) for i in range(num_threads) ]
  checker = threading.Thread(target=check_thread, args=(threads,))
  [ t.start() for t in threads ]
  checker.start()
  [ t.join() for t in threads ]
  checker.join()
  logger.info(obj.stats)

if __name__ == "__main__":
    main()
