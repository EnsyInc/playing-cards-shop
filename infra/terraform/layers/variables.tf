variable "azurerm_subscription_id" {
  sensitive = true
  type = string
}

variable "azurerm_client_id" {
  sensitive = true
  type = string
}

variable "azurerm_client_secret" {
  sensitive = true
  type = string
}

variable "azurerm_tenant_id" {
  sensitive = true
  type = string
}

variable "location" {
  type = string
}

variable "containerRegistryUsername" {
  sensitive = true
  type = string
}

variable "containerRegistryEmail" {
  sensitive = true
  type = string
}

variable "containerRegistryPwd" {
  sensitive = true
  type = string
}