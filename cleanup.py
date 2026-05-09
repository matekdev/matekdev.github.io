import os
import re

# Protected paths (relative to static/)
protected_exact = {"/generic/msc1.jpg", "/home/me.jpg"}
protected_prefixes = ("/projects/thumbnails/",)

def is_protected(rel_path):
    if rel_path in protected_exact:
        return True
    for prefix in protected_prefixes:
        if rel_path.startswith(prefix):
            return True
    return False

# Load references
references = set()
if os.path.exists("image_references.txt"):
    with open("image_references.txt", "r", encoding="utf_8", errors="ignore") as f:
        content = f.read()
        # Find anything that looks like a path or filename with these extensions
        found = re.findall(r'[\w\/\.\-]+\.(?:jpg|jpeg|png)', content)
        for path in found:
            references.add(os.path.basename(path))

deleted_paths = []

for root, dirs, files in os.walk("static"):
    for file in files:
        if file.lower().endswith((".jpg", ".jpeg", ".png")):
            full_path = os.path.join(root, file)
            rel_path = "/" + os.path.relpath(full_path, "static").replace("\\", "/")
            
            # Check for webp sibling
            base_name, _ = os.path.splitext(full_path)
            webp_sibling = base_name + ".webp"
            
            if os.path.exists(webp_sibling):
                # Is it protected?
                if is_protected(rel_path):
                    continue
                
                # Is it referenced in source?
                if file in references:
                    continue
                
                # Delete it
                deleted_paths.append(full_path)
                os.remove(full_path)

print(f"Deleted count: {len(deleted_paths)}")
for p in deleted_paths[:20]:
    print(p)
