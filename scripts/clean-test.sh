#!/bin/bash
dirEmpty=./test/directoryEmpty
dirNoOverwrite=./test/directoryNoOverwrite
dirOverwrite=./test/directoryOverwrite

preExistentConfigDir=./test/pre-existentConfigFiles

# Clean directoryEmpty
find $dirEmpty ! -name '.confcrc' -type f -exec rm '{}' +

# Clean dirNoOverwrite
find $dirNoOverwrite ! -name '.confcrc' -type f -exec rm '{}' +
find $preExistentConfigDir -type f -exec cp {} $dirNoOverwrite \;

# Clean dirOverwrite
find $dirOverwrite ! -name '.confcrc' -type f -exec rm '{}' +
find $preExistentConfigDir -type f -exec cp {} $dirOverwrite \;
