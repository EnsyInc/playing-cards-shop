# PowerShell 7 is required to run this script.
# It is available for download here: https://github.com/PowerShell/PowerShell

param(
    [Parameter(Mandatory)]
    [string] $helmChartPath,

    [Parameter(Mandatory)]
    [string] $helmReleaseName,

    [Parameter(Mandatory = $false)]
    [string] $containerRegistry = 'ensyinc.jfrog.io/ensyinc-docker',

    # Should be retrieved from kv in the future
    [Parameter(Mandatory)]
    [string] $containerRegistryUsername,

    # Should be retrieved from kv in the future
    [Parameter(Mandatory)]
    [string] $containerRegistryEmail,
    
    # Should be retrieved from kv in the future
    [Parameter(Mandatory)]
    [string] $containerRegistryPwd,

    [Parameter(Mandatory = $false)]
    [string] $namespace = 'pcs'
)

$currentDir = Split-Path -Parent $MyInvocation.MyCommand.Path 
. "$currentDir\utils.ps1"

$containerRegistrySecretName = 'cr-auth';

function Get-CurrentDeploymentVersion {
    $deploymentVersion = helm history $helmReleaseName --namespace $namespace --max 1 -o json | ConvertFrom-Json

    if ($LASTEXITCODE -ne 0) {
        return [PSCustomObject]@{
            revision = "N/A"
            version  = "N/A"
        }
    }

    return [PSCustomObject]@{
        revision = $deploymentVersion.revision
        version  = $deploymentVersion.chart
    }
    
}

function Set-ContainerRegistrySecrets {
    Write-Host "Deleting old container registry secrets"
    kubectl delete secret --namespace $namespace $containerRegistrySecretName > $null
    Write-Host "Deleted old container registry secrets"

    Write-Host "Creating new container registry secret"
    kubectl create secret docker-registry --namespace $namespace $containerRegistrySecretName --docker-server $containerRegistry `
        --docker-username $containerRegistryUsername --docker-password $containerRegistryPwd --docker-email $containerRegistryEmail > $null
    Write-Host "Created new container registry secret"
}

function Invoke-DeplyHelmChart($currentlyDeployedVersion) {
    Write-Warning "The following helm release template is about to be deployed"
    helm template $helmChartPath
    
    Write-Warning "The currently deployed helm release revision is $($currentlyDeployedVersion.revision) and the version is $($currentlyDeployedVersion.version)"
    Write-Warning "Deploying new helm release"

    helm upgrade $helmReleaseName $helmChartPath --install --atomic --wait-for-jobs --cleanup-on-fail --create-namespace --namespace $namespace

    if ($LASTEXITCODE -ne 0) {
        Write-StatusFailed "Failed to deploy helm release"
    }
    else {
        Write-StatusFinished "Successfully deployed helm release"
    }
}

function Main {
    Set-ContainerRegistrySecrets

    $currentlyDeployedVersion = Get-CurrentDeploymentVersion

    Invoke-DeplyHelmChart $currentlyDeployedVersion
}

Main
