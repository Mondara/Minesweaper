import {
  checkLose,
  checkWin,
  createBoard,
  markedTilesCount,
  markTile,
  positionMatch,
  revealTile,
  TILE_STATUSES,
} from "../minesweeper";

describe("#createBoard", () => {
  test("it creates a valid board", () => {
    const boardSize = 2;
    const minePositions = [{ x: 0, y: 1 }];
    const expectedBoard = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ];

    const board = createBoard(boardSize, minePositions);
    expect(board).toEqual(expectedBoard);
  });
});

describe("#markedTilesCount", () => {
  test("with some marked tiles", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.MARKED, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.MARKED, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ];

    const result = markedTilesCount(board);
    expect(result).toEqual(2);
  });

  test("with no marked tiles", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ];

    const result = markedTilesCount(board);
    expect(result).toEqual(0);
  });

  test("with all marked tiles", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.MARKED, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.MARKED, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.MARKED, mine: false },
      ],
    ];

    const result = markedTilesCount(board);
    expect(result).toEqual(4);
  });
});

describe("#markTile", () => {
  test("markes hidden tile", () => {
    const markPosition = { x: 0, y: 1 };
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ];

    const expectedBoard = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.MARKED, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ];

    const resultBoard = markTile(board, markPosition);
    expect(resultBoard).toEqual(expectedBoard);
  });

  test("hides a marked tile", () => {
    const markPosition = { x: 0, y: 1 };
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.MARKED, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ];

    const expectedBoard = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ];

    const resultBoard = markTile(board, markPosition);
    expect(resultBoard).toEqual(expectedBoard);
  });

  test("mine tiles does nothing", () => {
    const markPosition = { x: 0, y: 1 };
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.MINE, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ];

    const resultBoard = markTile(board, markPosition);
    expect(resultBoard).toEqual(board);
  });

  test("number tiles does nothing", () => {
    const markPosition = { x: 0, y: 1 };
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.NUMBER, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ];

    const resultBoard = markTile(board, markPosition);
    expect(resultBoard).toEqual(board);
  });
});

describe("#revealTile", () => {
  test("marked tiles does nothing", () => {
    const markPosition = { x: 0, y: 1 };
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.MARKED, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ];

    const resultBoard = revealTile(board, markPosition);
    expect(resultBoard).toEqual(board);
  });

  test("mine tiles does nothing", () => {
    const markPosition = { x: 0, y: 1 };
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.MINE, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ];

    const resultBoard = revealTile(board, markPosition);
    expect(resultBoard).toEqual(board);
  });

  test("number tiles does nothing", () => {
    const markPosition = { x: 0, y: 1 };
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.NUMBER, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ];

    const resultBoard = revealTile(board, markPosition);
    expect(resultBoard).toEqual(board);
  });

  describe("with a hidden tile", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
      ],
    ];

    test("changes status to mine when tile is a mine", () => {
      const markPosition = { x: 0, y: 1 };
      const expectedBoard = [
        [
          { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 0, y: 1, status: TILE_STATUSES.MINE, mine: true },
        ],
        [
          { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
          { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
        ],
      ];

      const resultBoard = revealTile(board, markPosition);
      expect(resultBoard).toEqual(expectedBoard);
    });

    describe("when tile is not a mine", () => {
      test("tile is adjacent to a mine, counts the number of nearby mines", () => {
        const markPosition = { x: 0, y: 0 };
        const expectedBoard = [
          [
            {
              x: 0,
              y: 0,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 1,
            },
            { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
          ],
          [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
          ],
        ];

        const resultBoard = revealTile(board, markPosition);
        expect(resultBoard).toEqual(expectedBoard);
      });

      test("tile is not adjacent to a mine, reveals nearby mines", () => {
        const markPosition = { x: 2, y: 2 };
        const board = [
          [
            { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: true },
            { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 0, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
          ],
          [
            { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 1, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 1, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
          ],
          [
            { x: 2, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 2, y: 1, status: TILE_STATUSES.HIDDEN, mine: false },
            { x: 2, y: 2, status: TILE_STATUSES.HIDDEN, mine: false },
          ],
        ];

        const expectedBoard = [
          [
            {
              x: 0,
              y: 0,
              status: TILE_STATUSES.HIDDEN,
              mine: true,
            },
            {
              x: 0,
              y: 1,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 1,
            },
            {
              x: 0,
              y: 2,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0,
            },
          ],
          [
            {
              x: 1,
              y: 0,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 1,
            },
            {
              x: 1,
              y: 1,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 1,
            },
            {
              x: 1,
              y: 2,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0,
            },
          ],
          [
            {
              x: 2,
              y: 0,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0,
            },
            {
              x: 2,
              y: 1,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0,
            },
            {
              x: 2,
              y: 2,
              status: TILE_STATUSES.NUMBER,
              mine: false,
              adjacentMinesCount: 0,
            },
          ],
        ];

        const resultBoard = revealTile(board, markPosition);
        expect(resultBoard).toEqual(expectedBoard);
      });
    });
  });
});

describe("#checkWin", () => {
  test("with only hidden marked mine tiles not revealed, return true", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.NUMBER, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.NUMBER, mine: false },
      ],
    ];

    expect(checkWin(board)).toBeTruthy();
  });

  test("with some non-mine tiles not revealed, return false", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MARKED, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.NUMBER, mine: false },
      ],
    ];

    expect(checkWin(board)).toBeFalsy();
  });
});

describe("#checkLose", () => {
  test("with no mines revealed, return false", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.HIDDEN, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.NUMBER, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.NUMBER, mine: false },
      ],
    ];

    expect(checkLose(board)).toBeFalsy();
  });

  test("with mine tile revealed, return true", () => {
    const board = [
      [
        { x: 0, y: 0, status: TILE_STATUSES.MINE, mine: true },
        { x: 0, y: 1, status: TILE_STATUSES.HIDDEN, mine: true },
      ],
      [
        { x: 1, y: 0, status: TILE_STATUSES.HIDDEN, mine: false },
        { x: 1, y: 1, status: TILE_STATUSES.NUMBER, mine: false },
      ],
    ];

    expect(checkLose(board)).toBeTruthy();
  });
});

describe("#positionMatch", () => {
  test("returns true when x and y properties are the same", () => {
    const posA = { x: 1, y: 2 };
    const posB = { x: 1, y: 2 };

    expect(positionMatch(posA, posB)).toBeTruthy();
  });

  test("returns false when x and y properties are not the same", () => {
    const posA = { x: 1, y: 2 };
    const posB = { x: 0, y: 2 };

    expect(positionMatch(posA, posB)).toBeFalsy();
  });
});
