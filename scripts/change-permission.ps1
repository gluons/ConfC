$path = ".\test\unwritableTarget"

$acl = Get-Acl $path
$right = [System.Security.AccessControl.FileSystemRights]::Write
$type = [System.Security.AccessControl.AccessControlType]::Deny
$inheritanceFlag = [System.Security.AccessControl.InheritanceFlags]::ContainerInherit -bor [System.Security.AccessControl.InheritanceFlags]::ObjectInherit
$propagationFlag = [System.Security.AccessControl.PropagationFlags]::None

$ace = New-Object System.Security.AccessControl.FileSystemAccessRule("everyone", $right, $inheritanceFlag, $propagationFlag, $type)
$acl.SetAccessRule($ace)

Set-Acl $path $acl
