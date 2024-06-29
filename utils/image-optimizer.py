from PIL import Image
import os
import shutil

def convert_and_optimize(image_path, output_path, resolution=None, percentage=None):
    with Image.open(image_path) as img:
        icc_profile = img.info.get('icc_profile')
        
        if resolution:
            img = resize_image(img, resolution=resolution)
        
        if percentage:
            img = resize_image(img, percentage=percentage)

        if os.path.isdir(output_path):
            output_path = os.path.join(output_path, os.path.splitext(os.path.basename(image_path))[0] + '.webp')
        
        temp_output_path = output_path + ".temp"
        
        if os.path.exists(temp_output_path):
            os.remove(temp_output_path)
        
        img.save(temp_output_path, "WEBP", quality=90, icc_profile=icc_profile)
        
        if os.path.getsize(temp_output_path) >= os.path.getsize(image_path):
            os.remove(temp_output_path)
            if image_path != output_path:
                shutil.copy2(image_path, output_path)
        else:
            os.rename(temp_output_path, output_path)

def process_directory(directory, output_directory, resolution=None, percentage=None):
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            image_path = os.path.join(directory, filename)
            output_path = os.path.join(output_directory, os.path.splitext(filename)[0] + '.webp')
            convert_and_optimize(image_path, output_path, resolution, percentage)

def sanitize_path_input(path_input):
    return path_input.strip('"').strip("'").replace('\\', '/')

def resize_image(img, resolution=None, percentage=None):
    if resolution:
        base_width, base_height = resolution
        original_width, original_height = img.size
        aspect_ratio = original_width / original_height
        if original_width > original_height:
            new_width = base_width
            new_height = int(base_width / aspect_ratio)
        else:
            new_height = base_height
            new_width = int(base_height * aspect_ratio)
        return img.resize((new_width, new_height), Image.LANCZOS)
    
    if percentage:
        original_width, original_height = img.size
        new_width = int(original_width * (percentage / 100.0))
        new_height = int(original_height * (percentage / 100.0))
        return img.resize((new_width, new_height), Image.LANCZOS)

def main():
    print("\nImage Optimizer\n" + "-"*15 + "\n")
    print("Choose an option:")
    print("1. Convert to full resolution and optimize for web.")
    print("2. Convert to specific resolution and optimize for web.")
    print("3. Convert by resizing percentage and optimize for web.\n")
    
    choice = input("Enter your choice (1/2/3): ")
    
    if choice not in ['1', '2', '3']:
        print("\nInvalid choice!")
        return
    
    path = input("\nEnter the path to your image or directory: ")
    path = sanitize_path_input(path)
    
    if not os.path.exists(path):
        print("\nPath not found!")
        return
    
    resolution = None
    percentage = None
    
    if choice == '2':
        width = int(input("\nEnter desired width: "))
        height = int(input("Enter desired height: "))
        resolution = (width, height)
    elif choice == '3':
        percentage = float(input("\nEnter desired percentage (e.g., 50 for 50%): "))
    
    if os.path.isdir(path):
        output_directory = input("\nEnter the directory to save the optimized images: ")
    else:
        output_directory = input("\nEnter the directory or path to save the optimized image: ")
    
    output_directory = sanitize_path_input(output_directory)
    
    if os.path.isdir(path):
        process_directory(path, output_directory, resolution, percentage)
        print(f"\nImages saved to {output_directory}")
    else:
        convert_and_optimize(path, output_directory, resolution, percentage)
        print(f"\nImage saved to {output_directory}")

if __name__ == "__main__":
    main()
