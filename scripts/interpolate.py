"""Interpolate smoother position transitions into annotations json."""

# so far this script only works with simple annotations, not from hummedia

import json
import sys

MAX = 1 / 30  # max time interval (in seconds) between location updates

if len(sys.argv) < 2:
    ann_in = json.load(sys.stdin)
else:
    with open(sys.argv[1]) as jfile:
        try:
            ann_in = json.load(jfile)
        except Exception as e:
            print(f'Loading {sys.argv[1]} file failed', e, file=sys.stderr)

ann_out = []


def stringify(flt):
    """Turn float into string, removing `.0` at the end."""
    if int(flt) == flt:
        return str(int(flt))
    else:
        return str(flt)


for a_i, a in enumerate(ann_in):
    try:
        if len(a['options']['details']['position']) > 1:
            tmp_pos_dict = {float(k): v for k, v
                            in a['options']['details']['position'].items()}
            times = list(sorted(tmp_pos_dict))
            for t1, t2 in zip(times, times[1:]):
                tdiff = t2 - t1
                incr = int(tdiff / MAX)
                if tdiff <= MAX:
                    continue
                x1, y1 = tmp_pos_dict[t1][0], tmp_pos_dict[t1][1]
                x2, y2 = tmp_pos_dict[t2][0], tmp_pos_dict[t2][1]

                xdiff = x2 - x1
                xincr = xdiff / incr
                ydiff = y2 - y1
                yincr = ydiff / incr
                for i in range(1, incr):
                    tmid = t1 + i * MAX
                    xmid = x1 + i * xincr
                    ymid = y1 + i * yincr
                    tmp_pos_dict[tmid] = [xmid, ymid]
            a['options']['details']['position'] = {stringify(t): p for t, p
                                                   in sorted(tmp_pos_dict.items())}  # noqa:E501
            ann_out.append(a)
    except KeyError:
        ann_out.append(a)

print(json.dumps(ann_out, indent=2))
