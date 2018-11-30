"""Sort json file according to `start`."""

import json
from pathlib import Path
import sys

in_path = Path(sys.argv[1])
in_json = json.loads(in_path.read_text())

output = sorted(in_json, key=lambda x: float(x['options']['start']))

out_str = json.dumps(output)
out_str = out_str.replace('{"options',      '\n  {"options')
out_str = out_str.replace('"label":',       '\n      "label":')
out_str = out_str.replace(' "start":',      '\n      "start":')
out_str = out_str.replace(' "end":',        '\n      "end":')
out_str = out_str.replace(', "type":',     ',\n      "type":')
out_str = out_str.replace(' "details":',    '\n      "details":')
out_str = out_str.replace('{"type":',      '{\n          "type":')
out_str = out_str.replace(' "amount":',     '\n          "amount":')
out_str = out_str.replace(' "position":',   '\n          "position":')
out_str = out_str.replace('], ',          '],\n                       ')

try:
    json.loads(out_str)
    print('Output json is valid.')
except ValueError as e:
    print(f'WARNING: Invalid json: {e}')
out_path = in_path.parents[0] / f'sorted_{in_path.name}'
print(f'Writing output to {out_path}...')
out_path.write_text(out_str)
