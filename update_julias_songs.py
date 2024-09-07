import spotipy
from spotipy.oauth2 import SpotifyOAuth
import json

filename = "config/Julias_Top_100.json"

scope = "user-top-read"
# export SPOTIPY_CLIENT_ID='f128aa0267b54f1aa434896018ba5433'
# export SPOTIPY_CLIENT_SECRET='2d968a609e1a4d55b013fbc6b8f80920'
# export SPOTIPY_REDIRECT_URI='https://localhost:8888/callback'

SPOTIPY_CLIENT_ID = 'f128aa0267b54f1aa434896018ba5433'
SPOTIPY_CLIENT_SECRET='2d968a609e1a4d55b013fbc6b8f80920'
SPOTIPY_REDIRECT_URI='https://localhost:8888/callback'

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))

# Valid values: long_term (calculated from ~1 year of data and including all new data as it becomes available), medium_term (approximately last 6 months), short_term (approximately last 4 weeks). Default: medium_term
results_1_to_50 = sp.current_user_top_artists(limit=50, time_range="long_term")
results_50_to_100 = sp.current_user_top_artists(limit=50, offset=50, time_range="long_term")

items1 = results_1_to_50.get("items", [])
items2 = results_50_to_100.get("items", [])

print(type(results_50_to_100["items"][0]))
print(results_50_to_100["items"][0]["id"])

items_dict1 = {item['id']: item for item in items1}
items_dict2 = {item['id']: item for item in items2}

merged_items_dict = {**items_dict1, **items_dict2}

print(len(merged_items_dict.keys()))


print(f"Printing {len(merged_items_dict.keys())} to {filename}.")
# Write the merged dictionary to a JSON file
with open(filename, 'w') as file:
    json.dump(merged_items_dict, file, indent=4)
