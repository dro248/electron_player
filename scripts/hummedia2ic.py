import json
from pathlib import Path
import sys

from hms2s import s2hms

in_path = Path(sys.argv[1])
out_path = in_path.parents[0] / Path(f'ic_{in_path.name}')

hum_json = json.loads(in_path.read_text())
ic_json = []

for track in hum_json['media'][0]['tracks']:
    for e in track['trackEvents']:
        options = {}
        if e['type'] == 'mutePlugin':
            start = e['popcornOptions']['start']
            end = e['popcornOptions']['end']
            options['label'] = f'{s2hms(start)} - {s2hms(end)}'
            options['type'] = 'mute'
            options['start'] = str(start)
            options['end'] = str(end)
            options['details'] = {}
        elif e['type'] == 'skip':
            start = e['popcornOptions']['start']
            end = e['popcornOptions']['end']
            options['label'] = f'{s2hms(start)} - {s2hms(end)}'
            options['type'] = 'skip'
            options['start'] = str(start)
            options['end'] = str(end)
            options['details'] = {}
        else:
            raise NotImplementedError(f'Event "{e["type"]}" not implemented.')
        ic_json.append({'options': options})

ic_json = sorted(ic_json, key=lambda x: float(x['options']['start']))
out_path.write_text(json.dumps(ic_json).replace('}, {', '},\n {'))
