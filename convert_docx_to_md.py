import os
import docx
import datetime

def get_creation_date(file_path):
    """Gets the file's creation date (cross-platform)."""
    if os.name == 'nt':  # Windows
        timestamp = os.path.getctime(file_path)
    else:  # macOS / Linux
        stat = os.stat(file_path)
        try:
            timestamp = stat.st_birthtime  # macOS
        except AttributeError:
            timestamp = stat.st_mtime  # Linux (fallback to last modified time)
    
    return datetime.datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d")

def convert_docx_to_markdown(docx_path, output_dir="markdown_output"):
    """Converts a DOCX file to a Markdown file with metadata."""
    # Extract title from filename (removing extension)
    title = os.path.splitext(os.path.basename(docx_path))[0]

    # Get creation date
    date = get_creation_date(docx_path)

    # Read DOCX content
    doc = docx.Document(docx_path)
    paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]

    # Construct Markdown content
    markdown_content = f"""---
title: "{title}"
date: "{date}"
---

""" + "\n\n".join(paragraphs)

    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Define output path
    md_filename = f"{title}.md"
    md_path = os.path.join(output_dir, md_filename)

    # Save Markdown file
    with open(md_path, "w", encoding="utf-8") as md_file:
        md_file.write(markdown_content)

    print(f"✅ Converted: {docx_path} → {md_path}")

# Example Usage
if __name__ == "__main__":
    input_folder = "../toDennis"  # Folder containing DOCX files
    output_folder = "content"

    # Convert all DOCX files in the folder
    for filename in os.listdir(input_folder):
        if filename.startswith("~$"):  # Skip temp files
            continue
        if filename.endswith(".docx"):
            convert_docx_to_markdown(os.path.join(input_folder, filename), output_folder)
