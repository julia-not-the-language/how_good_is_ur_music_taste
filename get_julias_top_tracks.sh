#!/bin/bash

# URL to send the request to
URL="https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0"

# Authorization Bearer token
TOKEN="BQDG7rbl6aCywSQbKqQYytXjnPCf21Gm7NV9a23iTZH7-cxeVvT8QMjAFbjM-0iiL105-h_NQb_D_lfMWKD8CB4MprbMoa_qvDBdr0thoIxEKfj-Xxg7tzG-6U4ktcf8veUXqJF9KISnrnxxh_o3M4T3sG0hoPMdMOoxS1WDDg1jrAxaMtTCvNas94mGOPmbbujraGfuNg"

# Output file
OUTPUT_FILE="spotify_output_1.json"

# Execute curl and save the response to a JSON file
curl --request GET --url "$URL" --header "Authorization: Bearer $TOKEN" -o "$OUTPUT_FILE"

# Check if the curl command was successful
if [ $? -eq 0 ]; then
    echo "Request was successful, saved to $OUTPUT_FILE"
else
    echo "Failed to execute curl"
fi

URL2="https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=50"

# Output file
OUTPUT_FILE2="spotify_output_2.json"

curl --request GET --url "$URL2" --header "Authorization: Bearer $TOKEN" -o "$OUTPUT_FILE2"

# Check if the curl command was successful
if [ $? -eq 0 ]; then
    echo "Request was successful, saved to $OUTPUT_FILE"
else
    echo "Failed to execute curl"
fi




