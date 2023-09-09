function landPerimeter(arr) {
    let p = 0;

    let map = [];

    for (y in arr) {
        map[y] = [];
        for (x in arr[y]) {
            if (arr[y][x] == "X") {
                map[y][x] = "X";
            } else {
                map[y][x] = undefined;
            }
        }
    }

    for (let y = -1; y <= map.length; y++) {
        for (let x = -1; x <= map[0].length; x++) {
            if (!map[y]) {
                continue;
            }
            if (map[y][x]) {
                if (!map[y - 1]) {
                    p++;
                } else if (!map[y - 1][x]) {
                    p++;
                }

                if (!map[y + 1]) {
                    p++;
                } else if (!map[y + 1][x]) {
                    p++;
                }

                if (!map[y]) {
                    p++;
                    continue;
                }
                if (!map[y][x - 1]) {
                    p++;
                }

                if (!map[y]) {
                    p++;
                    continue;
                }
                if (!map[y][x + 1]) {
                    p++;
                }
            }
        }
    }
    return "Total land perimeter: " + p;
}

const map = ["OXOOOX", "OXOXOO", "XXOOOX", "OXXXOO", "OOXOOX", "OXOOOO", "OOXOOX", "OOXOOO", "OXOOOO", "OXOOXX"];

console.log(landPerimeter(map));
