import os
import subprocess

# Ask for git name and net id
git_name = input("Enter your git name: ")
net_id = input("Enter your net id: ")

# Define the output file
output_file = f'{net_id}.commits.txt'

# Set the date threshold
date_threshold = '2024-10-16'

# File extensions to skip (e.g., binary files)
skip_extensions = ('.pdf', '.png', '.jpg', '.jpeg', '.gif', '.exe', '.zip', 
                   '.md', '.txt', '.yml', '.gitignore', '.gitattributes', '.json')

# Open the output file in write mode
with open(output_file, 'w') as f:
    # Walk through the repository files
    for root, dirs, files in os.walk('..'):
        # Skip the .git and node_modules directories
        if '.git' in root or 'node_modules' in root:
            continue
        
        for file in files:
            # Skip binary files and the output file itself
            if file.endswith(skip_extensions) or file == output_file:
                print(f"Skipping file: {file}")
                continue

            # Construct the full file path
            filepath = os.path.join(root, file)

            # Check if the file is tracked by git
            try:
                result = subprocess.run(
                    ['git', 'ls-files', filepath], 
                    stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
                )
                
                # If the file is untracked, skip it
                if not result.stdout.strip():
                    print(f"Skipping untracked file: {filepath}")
                    continue

                # Run 'git blame' with the --since option to filter by date and grep for git_name
                blame_result = subprocess.run(
                    ['git', 'blame', '--since', date_threshold, filepath], 
                    stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
                )

                # Check if git_name appears in the output
                if blame_result.returncode == 0:
                    for line in blame_result.stdout.splitlines():
                        output_line = f'{filepath}: {line}\n'
                        # Write the line only if it's from the specified git_name
                        if git_name in line:
                            f.write(output_line)
                else:
                    print(f"Error running git blame on {filepath}: {blame_result.stderr}")
            except Exception as e:
                print(f"Error processing {filepath}: {e}")