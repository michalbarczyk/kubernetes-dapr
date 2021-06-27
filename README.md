# Kubernetes Dapr
Example project that shows Dapr capabilities on Kubernetes cluster

## Running on Linux (works with WSL 2)

#### 1. [Setup Minikube cluster](https://docs.dapr.io/operations/hosting/kubernetes/cluster/setup-minikube/) (including setting up Docker and installing kubectl)

#### 2. Install [Helm](https://helm.sh/docs/intro/install/) and setup Redis instance:
```
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install redis bitnami/redis
```

Then run ```kubectl get pods``` and verify instances are running
```
NAME               READY   STATUS    RESTARTS   AGE
redis-master-0     1/1     Running   0          6m55s
redis-replicas-0   1/1     Running   1          6m55s
redis-replicas-1   1/1     Running   0          5m43s
redis-replicas-2   1/1     Running   0          5m31s
```
#### 3. Install [Dapr CLI](https://github.com/dapr/cli)
#### 4. Deploy Dapr operator on Kubernetes by running `dapr init -k` (should display success message)
#### 5. Setup Kafka instance:
```
kubectl create ns kafka
helm install dapr-kafka bitnami/kafka --wait --namespace kafka -f ./kafka/kafka-non-persistence.yaml
```
Then run ```kubectl -n kafka get pods``` and verify instances are running
```
NAME                     READY   STATUS    RESTARTS   AGE
dapr-kafka-0             1/1     Running   0          2m7s
dapr-kafka-zookeeper-0   1/1     Running   0          2m57s
```
#### 6. Run all services by running `kubectl apply -f ./deploy/.`
#### 7. To be able to access UI (convert currency) run `kubectl port-forward service/reactapp 8080:80` and then access it on localhost:8080
#### 8. To be able to access UI (set exchange rate) run `kubectl port-forward service/exchange-rate-publisher 8081:80` and then access it on localhost:8081
#### 9. (optional) to enable tracing:
Create zipkin deployment:
```
kubectl create deployment zipkin --image openzipkin/zipkin
kubectl expose deployment zipkin --type ClusterIP --port 9411

kubectl apply -f ./deploy/tracing/.
```
To be able to access zipkin UI (at localhost:9411):
```
kubectl port-forward svc/zipkin 9411:9411
```