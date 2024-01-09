#!/bin/bash
set -e
set -x

gradleFile="android/build.gradle"

# Function to update compileSdkVersion
update_compileSdkVersion() {
    sed -i "s/compileSdkVersion = [0-9]*/compileSdkVersion = 33/" "$gradleFile"
}

# Update compileSdkVersion
update_compileSdkVersion

echo "compileSdkVersion updated in $gradleFile"
