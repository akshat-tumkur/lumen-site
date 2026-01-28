import os
from PIL import Image

src_dir = ".." # Since we are in lumen-site, parent has the images
dest_dir = "public/frames"
os.makedirs(dest_dir, exist_ok=True)

# format: ezgif-frame-001.jpg -> frame_000.webp
for i in range(1, 201):
    src_filename = f"ezgif-frame-{i:03d}.jpg"
    src_path = os.path.join(src_dir, src_filename)
    
    dest_filename = f"frame_{i-1:03d}.webp" # 0-indexed
    dest_path = os.path.join(dest_dir, dest_filename)
    
    if os.path.exists(src_path):
        # Convert and save
        try:
            with Image.open(src_path) as img:
                img.save(dest_path, "WEBP", quality=85)
        except Exception as e:
            print(f"Error converting {src_filename}: {e}")
    else:
        print(f"Warning: {src_filename} not found.")

print("Done.")
