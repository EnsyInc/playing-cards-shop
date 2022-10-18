function Write-StatusFinished ($message) {
    Write-Status -message $message -prefix "Finished" -color DarkGreen
}

function Write-StatusFailed ($message) {
    Write-Status -message $message -prefix "Failed" -color Red
}

function Write-Status($message, $prefix, $color) {
    Write-Host "------    $prefix : $message    ------" -ForegroundColor $color
}
