KUBI ?= kubectl
SKAFFOLD ?= skaffold

namespaces:
	$(KUBI) apply -f ./kubernetes/namespaces.yaml

namespaces-clean:
	$(KUBI) delete -f ./kubernetes/namespaces.yaml

service-accounts:
	$(KUBI) apply -f ./kubernetes/service-accounts.yaml

service-accounts-clean:
	$(KUBI) delete -f ./kubernetes/service-accounts.yaml

configs:
	$(KUBI) apply -f ./kubernetes/config-maps.yaml

configs-clean:
	$(KUBI) delete -f ./kubernetes/config-maps.yaml

cluster-roles:
	$(KUBI) apply -f ./kubernetes/cluster-roles.yaml

cluster-roles-clean:
	$(KUBI) delete -f ./kubernetes/cluster-roles.yaml

storage-classes:
	$(KUBI) apply -f ./kubernetes/storage-classes.yaml

storage-classes-clean:
	$(KUBI) delete -f ./kubernetes/storage-classes.yaml

ingresses:
	$(KUBI) apply -f ./kubernetes/ingresses.yaml

ingresses-clean:
	$(KUBI) delete -f ./kubernetes/ingresses.yaml

volumes:
	$(KUBI) apply -f ./kubernetes/volumes.yaml

volumes-clean:
	$(KUBI) delete -f ./kubernetes/volumes.yaml

storybook:
	npx -p @storybook/cli sb init



setup:
	make storybook

dev:
	$(SKAFFOLD) dev --profile development --port-forward

remote:
	$(SKAFFOLD) --profile production

minikube:
	minikube start --memory 7168 --cpus 5



local-path-provisioner:
	$(KUBI) apply -f ./kubernetes/local-path-provisioner.yaml

local-path-provisioner-clean:
	$(KUBI) delete -f ./kubernetes/local-path-provisioner.yaml