# JSON Format for Video Annotations

There are five types of video annotations:
1. skip
2. mute
3. blank
4. blur
5. and censors

Each one does something a bit different.

## Skip

### Skip Example
``` json
{
  "options": {
    "start": "21",
    "end": "35",
    "type": "skip",
    "details": {}
  }
}
```

## Mute (what is mutePlugin?)

### Mute Example
``` json
{
  "options": {
    "start": "37",
    "end": "48",
    "type": "mute",
    "details": {}
  }
}
```

## Blank

### Blank Example
``` json
{
  "options": {
    "start": "40",
    "end": "45",
    "type": "blank",
    "details": {}
  }
}
```

## Blur

### Blur Example
``` json
{
  "options": {
    "start": "2",
    "end": "10",
    "type": "blur",
    "details": {}
  }
}
```

## Censor

Each censor has an interpolate boolean, which determines if the program will interpolate
between the censors.

I'm not sure what the this part of the details does.
``` json
"size": {
  "6": "10"
}
```

### Censor Examples
#### Solid Color Censor
``` json
{
  "options": {
    "start": "0",
    "end": "13",
    "type": "censor",
    "details": {
      "type": "black",
      "interpolate": true,
      "position": {
        "4":     [18, 18, 15, 15],
        "4.25":  [12, 18],
        "4.50":  [14, 18],
        "4.75":  [16, 18],
        "5.00":  [18, 18],
        "5.25":  [18, 18, 14, 16],
        "5.50":  [18, 18, 12, 18],
        "5.75":  [18, 18, 10, 20],
        "6.00":  [18, 18, 14, 20]
      }
    }
  }
}
```

#### Blur Censor
``` json
{
  "options": {
    "start": "6",
    "end": "19",
    "type": "censor",
    "details": {
      "type": "blur",
      "interpolate": true,
      "amount": "30px",
      "size": {
        "6": "10"
      },
      "position": {
        "6":     [0, 0, 15, 15],
        "8":     [10, 10],
        "9":     [15, 15],
        "10.25":  [16.00, 16.00],
        "10.50":  [16.25, 16.25],
        "10.75":  [16.50, 16.50],
        "11.00":  [16.75, 16.75],
        "11.25":  [17.00, 17.00],
        "11.50":  [17.25, 17.25],
        "11.75":  [17.50, 17.50],
        "12.00":  [17.75, 17.75],
        "12.25":  [18.00, 18.00, 17.1, 17.1],
        "12.50":  [18.00, 18.00, 17.4, 17.4],
        "12.75":  [18.00, 18.00, 17.7, 17.7],
        "13.00":  [18.00, 18.00, 18, 18],
      }
    }
  }
}
```
