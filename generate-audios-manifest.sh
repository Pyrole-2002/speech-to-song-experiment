#!/bin/bash

# Define the path to the audios directory
audios_dir="./public/audios"
ll="looped"
looped="${audios_dir}/looped"

echo "Cleaning up the looped audios directory..."
rm -rf "$looped"
echo "Generating the looped audios..."
mkdir -p "$looped"

# generating silence audio file
silence_path="./public/silence.wav"
sox -n -r 22050 "$silence_path" trim 0 0.5

# temp
temp_ext="temp"

# Generate the audio manifest JSON file
echo "{" > ./public/audios-manifest.json
echo '  "audioFiles": [' >> ./public/audios-manifest.json

myArray=()
filname_without_ext=()

while read -r file; do
    filename=$(basename "$file")
    looped_filename="${filename/./_looped.}"
    echo "    \"$looped_filename\"," >> ./public/audios-manifest.json
    without_ext="${filename%%.*}"
    filname_without_ext+=("$without_ext")
    temp="$audios_dir/$without_ext"
    tempname="${temp}_${temp_ext}.wav"
    temp="$temp.wav"
    myArray+=("$tempname")
    sox "$temp" "$silence_path" "$tempname"
done < <(find "$audios_dir" -type f -name "*.wav")

rm "$silence_path"

loop_count=10
k=0
# Outer loop: Iterate over each element in the array
for element in "${myArray[@]}"; do
    loop="loop.wav"
    temp_loop="${element}_${loop}"\
    tt="${temp_loop}_0.wav"
    sox "$element" "$element" "$tt"
    for (( j=0; j<loop_count; j++ )); do
        tt1="${temp_loop}_${j}.wav"
        tt2="${temp_loop}_$((j+1)).wav"
        sox "$tt1" "$element" "$tt2"
        rm "$tt1"
    done
    rm "$element"
    tt="${temp_loop}_$loop_count.wav"
    t=$k
    ttt="${looped}/${filname_without_ext[t]}_looped.wav"
    mv "$tt" "$ttt"
    ((k++))
done


# Remove the trailing comma from the last file entry
sed -i '$ s/,$//' ./public/audios-manifest.json

# Close the JSON object
echo '  ]' >> ./public/audios-manifest.json
echo "}" >> ./public/audios-manifest.json

echo "Audio manifest JSON file generated successfully!"
