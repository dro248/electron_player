import json
from pathlib import Path
import sys

in_path = Path(sys.argv[1])
out_path = Path(f'ic_{sys.argv[1]}')

hum_json = json.loads(in_path.read_text())
ic_json = []

for track in hum_json['media'][0]['tracks']:
    for e in track['trackEvents']:
        options = {}
        if e['type'] == 'mutePlugin':
            options['type'] = 'mute'
            options['start'] = str(e['popcornOptions']['start'])
            options['end'] = str(e['popcornOptions']['end'])
            options['details'] = {}
        elif e['type'] == 'skip':
            options['type'] = 'skip'
            options['start'] = str(e['popcornOptions']['start'])
            options['end'] = str(e['popcornOptions']['end'])
            options['details'] = {}
        else:
            raise NotImplementedError(f'Event "{e["type"]}" not implemented.')
        ic_json.append({'options': options})

ic_json = sorted(ic_json, key=lambda x: float(x['options']['start']))
out_path.write_text(json.dumps(ic_json).replace('}, {', '},\n {'))
