#!/bin/bash

# Define the path to the audios directory
audios_dir="./public/audios"

# Generate the audio manifest JSON file
echo "{" > ./public/audios-manifest.json
echo '  "audioFiles": [' >> ./public/audios-manifest.json

# List all .wav files in the audios directory and write them to the manifest file
find "$audios_dir" -type f -name "*.wav" | while read -r file; do
    filename=$(basename "$file")
    echo "    \"$filename\"," >> ./public/audios-manifest.json
done

# Remove the trailing comma from the last file entry
sed -i '$ s/,$//' ./public/audios-manifest.json

# Close the JSON object
echo '  ]' >> ./public/audios-manifest.json
echo "}" >> ./public/audios-manifest.json

# Run the loopAudio.js script to generate and store looped audio files
node loopAudio.js
echo "Audio manifest JSON file generated successfully!"
