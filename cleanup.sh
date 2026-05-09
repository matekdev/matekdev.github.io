#!/bin/bash

# Protected paths (relative to static)
# /generic/msc1.jpg
# /home/me.jpg
# /projects/thumbnails/*.jpg

protected_exact=("/generic/msc1.jpg" "/home/me.jpg")
protected_pattern="/projects/thumbnails/"

# Find ALL source and markdown files to check for references
REFS=$(grep -rE "\.(jpg|jpeg|png)" src static/markdown 2>/dev/null)

deleted_count=0
deleted_list=""

find static -type f -regex ".*\.\(jpg\|jpeg\|png\)$" | while read -r img; do
    rel_path="/${img#static/}"
    rel_path=$(echo "$rel_path" | sed 's|//|/|g')
    
    # Check if webp sibling exists
    base="${img%.*}"
    webp="${base}.webp"
    
    if [[ -f "$webp" ]]; then
        # Check if protected
        skip=0
        for p in "${protected_exact[@]}"; do
            if [[ "$rel_path" == "$p" ]]; then
                skip=1
                break
            fi
        done
        
        if [[ "$rel_path" == "$protected_pattern"* ]]; then
            skip=1
        fi
        
        if [[ $skip -eq 1 ]]; then
            continue
        fi
        
        # Check if referenced in source (checking filename)
        filename=$(basename "$img")
        if echo "$REFS" | grep -q "$filename"; then
            continue
        fi
        
        # Delete and record
        rm "$img"
        echo "$img" >> deleted_files.txt
    fi
done

if [[ -f deleted_files.txt ]]; then
    count=$(wc -l < deleted_files.txt)
    echo "Deleted count: $count"
    head -n 20 deleted_files.txt
    rm deleted_files.txt
else
    echo "Deleted count: 0"
fi
