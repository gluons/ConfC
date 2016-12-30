$dirEmpty = ".\test\directoryEmpty"
$dirNoOverwrite = ".\test\directoryNoOverwrite"
$dirOverwrite = ".\test\directoryOverwrite"

$preExistentConfigFiles = Join-Path ".\test\pre-existentConfigFiles" -ChildPath * -Resolve

# Clean directoryEmpty
Join-Path $dirEmpty -ChildPath * -Resolve | Remove-Item -Exclude ".confcrc"

# Clean directoryNoOverwrite
Join-Path $dirNoOverwrite -ChildPath * -Resolve | Remove-Item -Exclude ".confcrc"
$preExistentConfigFiles | Copy-Item -Destination $dirNoOverwrite

# Clean directoryOverwrite
Join-Path $dirOverwrite -ChildPath * -Resolve | Remove-Item -Exclude ".confcrc"
$preExistentConfigFiles | Copy-Item -Destination $dirOverwrite
