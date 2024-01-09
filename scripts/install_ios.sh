#!/bin/bash
set -e
set -x

name=$PROJECT_NAME
podfile="ios/Podfile"
target=$name

# Function to add a pod entry within the target block if it does not exist
add_pod_to_target() {
    if ! grep -q "$1" "$podfile"; then
        echo "Adding $1 to target $target in Podfile"
        # Use awk to insert the pod lines within the target block
        awk -v podline="$1" -v target="$target" '
        $0 ~ "target \x27" target "\x27 do" {print; inBlock=1; next}
        inBlock && /end/ {print podline; print; inBlock=0; next}
        {print}
        ' "$podfile" > tmpfile && mv tmpfile "$podfile"
    else
        echo "$1 already in target $target in Podfile"
    fi
}

# Modify the podfile within the target
add_pod_to_target "  pod 'Firebase', :modular_headers => true"
add_pod_to_target "  pod 'FirebaseCore', :modular_headers => true"
add_pod_to_target "  pod 'GoogleUtilities', :modular_headers => true"

# Note: If the RNFirebaseAsStaticFramework setting needs to be within the target, move this into the function above
if ! grep -q "RNFirebaseAsStaticFramework = true" "$podfile"; then
    echo "\$RNFirebaseAsStaticFramework = true" >> "$podfile"
fi

echo "Podfile configured for target $target"
