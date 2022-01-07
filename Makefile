KUBI ?= kubectl
SKAFFOLD ?= skaffold

namespaces:
	$(KUBI) apply -f ./kubernetes/namespaces.yaml

namespaces-clean:
	$(KUBI) delete -f ./kubernetes/namespaces.yaml

secrets:
	$(KUBI) apply -f ./kubernetes/secrets.yaml

secrets-clean:
	$(KUBI) delete -f ./kubernetes/secrets.yaml

secrets:
	$(KUBI) apply -f ./kubernetes/secrets.yaml

secrets-clean:
	$(KUBI) delete -f ./kubernetes/secrets.yaml

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

cluster-role-bindings:
	$(KUBI) apply -f ./kubernetes/cluster-role-bindings.yaml

cluster-roles-bindings-clean:
	$(KUBI) delete -f ./kubernetes/cluster-role-bindings.yaml

cluster-role-bindings:
	$(KUBI) apply -f ./kubernetes/cluster-role-bindings.yaml

cluster-roles-bindings-clean:
	$(KUBI) delete -f ./kubernetes/cluster-role-bindings.yaml

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

kubi-config:
	make namespaces
	make secrets
	make service-accounts
	make configs
	make cluster-roles
	make cluster-role-bindings
	make storage-classes
	make ingresses
	make volumes

kubi-config-clean:
	make namespaces-clean
	make secrets-clean
	make service-accounts-clean
	make configs-clean
	make cluster-roles-clean
	make cluster-role-bindings-clean
	make storage-classes-clean
	make ingresses-clean
	make volumes-clean

kubi-local:
	$(SKAFFOLD) dev --port-forward

kubi-remote:
	$(SKAFFOLD) dev --port-forward