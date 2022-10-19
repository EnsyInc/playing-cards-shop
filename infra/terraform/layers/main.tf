provider "azurerm" {
  subscription_id   = var.azurerm_subscription_id
  client_id         = var.azurerm_client_id
  client_secret     = var.azurerm_client_secret
  tenant_id         = var.azurerm_tenant_id

  features {}
}

terraform {
  backend "azurerm" {}
}

locals {
    base_name           = "pcs-base"
    resource_group_name = "${local.base_name}-rg"
    key_vault_name      = "${local.base_name}-kv"
}

### DATA ###

data "azurerm_client_config" "current" {}

data "azurerm_kubernetes_cluster" "primary" {
    name                = "${local.base_name}-aks"
    resource_group_name = local.resource_group_name
}

### SECRETS ###

resource "azurerm_key_vault" "main" {
  name = local.key_vault_name
  location = var.location
  resource_group_name = local.resource_group_name
  tenant_id = var.azurerm_tenant_id
  enabled_for_disk_encryption = true
  enabled_for_deployment = true
  enabled_for_template_deployment = true

  dynamic "access_policy" {
    content {
        tenant_id = data.azurerm_client_config.current.tenant_id
        object_id = data.azurerm_kubernetes_cluster.primary.kubelet_identity[0].object_id
        secret_permissions = [
            "get",
            "list",
        ]
    }
  }

  dynamic "access_policy" {
    content {
        tenant_id = data.azurerm_client_config.current.tenant_id
        object_id = data.azurerm_client_config.current.object_id
        secret_permissions = [
            "get",
            "backup",
            "delete",
            "purge",
            "recover",
            "restore",
            "set",
            "list",
        ]
    }
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "azurerm_key_vault_secret" "containerRegistryUsername" {
  name = "containerRegistryUsername"
  value = var.containerRegistryUsername
  key_vault_id = azurerm_key_vault.main.id
}

resource "azurerm_key_vault_secret" "containerRegistryEmail" {
  name = "containerRegistryEmail"
  value = var.containerRegistryEmail
  key_vault_id = azurerm_key_vault.main.id
}

resource "azurerm_key_vault_secret" "containerRegistryPwd" {
  name = "containerRegistryPwd"
  value = var.containerRegistryPwd
  key_vault_id = azurerm_key_vault.main.id
}
