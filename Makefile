CHART_NAME ?= developer-handbook
NAMESPACE_NAME ?= global
RELEASE_NAME ?= $(NAMESPACE_NAME)-$(CHART_NAME)

install-chart:
	helm upgrade --install --wait --force --recreate-pods $(RELEASE_NAME) deployments/kubernetes/chart/$(CHART_NAME) --namespace $(NAMESPACE_NAME)  || (helm rollback --force --recreate-pods $(RELEASE_NAME) 0 ; exit 1)
