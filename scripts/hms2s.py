"""Convert between HH:MM:SS and seconds."""
import datetime as dt
import re
import sys


def hms2s(time_str):
    """Convert HH:MM:SS times to seconds."""
    output = [time_str]
    for t in re.findall('([0-9:]+(?:\.[0-9]+)?)', time_str, flags=re.S):
        times = [float(i) for i in t.split(':')]
        size = len(times)
        if size > 3:
            raise NotImplementedError('Expected input: HH:MM:SS or MM:SS.')
        elif size == 3:
            h, m, s = times
        elif size == 2:
            h = 0
            m, s = times
        elif size == 1:
            h, m = 0, 0
            s = times[0]
        else:
            continue
        tot = dt.timedelta(hours=h, minutes=m, seconds=s).total_seconds()
        output.append(tot)
    return output


def s2hms(secs, rounding=True):
    """Convert seconds to HH:MM:SS."""
    if rounding:
        secs = round(secs)
    return str(dt.timedelta(seconds=secs))


if __name__ == '__main__':
    in_lines = sys.stdin.readlines()
    for line in in_lines:
        print(*hms2s(line.rstrip()), sep='\t')
