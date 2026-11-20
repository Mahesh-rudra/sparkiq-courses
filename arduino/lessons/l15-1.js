(window.__L = window.__L || {})["15-1"] = {
  num: "15.1", level: "Level 2 · Intermediate",
  title: "The 4×4 keypad",
  lead: "Read sixteen keys with eight pins and build a PIN-code check. About 12 minutes.",
  parts: "Parts: Arduino Uno, a 4×4 membrane keypad, jumper wires. The Keypad library is installed from the Library Manager.",
  circuit: {
    type: "disp", kind: "input", dev: "4×4 keypad", groups: 2, pinLabel: "Rows on 9 to 6, columns on 5 to 2",
    rows: [
      { u: "Pin 9", d: "Row 1", g: 0 }, { u: "Pin 8", d: "Row 2", g: 0 }, { u: "Pin 7", d: "Row 3", g: 0 }, { u: "Pin 6", d: "Row 4", g: 0 },
      { u: "Pin 5", d: "Column 1", g: 1 }, { u: "Pin 4", d: "Column 2", g: 1 }, { u: "Pin 3", d: "Column 3", g: 1 }, { u: "Pin 2", d: "Column 4", g: 1 }
    ],
    steps: [
      "<b>Step 1 of 2.</b> Connect the keypad's four <b>row</b> pins (the first four) to Uno <b>pins 9, 8, 7 and 6</b>.",
      "<b>Step 2 of 2.</b> Connect the four <b>column</b> pins (the last four) to Uno <b>pins 5, 4, 3 and 2</b>.",
      "<b>Circuit complete.</b> Press Run and hold the slider on a key for a moment: 1 to 16 are the keys left to right, top to bottom."
    ],
    math: "A keypad is a grid, so 16 keys need only 4 + 4 wires. The library sets one row pin LOW at a time and checks which column pins read LOW: that row and column cross at the pressed key. This is called <b>scanning</b>. A key stays down for tens of milliseconds, so the library also debounces it."
  },
  code: [
    "#include <Keypad.h>",
    "",
    "const byte ROWS = 4;",
    "const byte COLS = 4;",
    "char keys[ROWS][COLS] = {",
    "  {'1', '2', '3', 'A'},",
    "  {'4', '5', '6', 'B'},",
    "  {'7', '8', '9', 'C'},",
    "  {'*', '0', '#', 'D'}",
    "};",
    "byte rowPins[ROWS] = {9, 8, 7, 6};",
    "byte colPins[COLS] = {5, 4, 3, 2};",
    "Keypad pad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);",
    "",
    "String code = \"\";",
    "",
    "void setup() {",
    "  Serial.begin(9600);",
    "}",
    "",
    "void loop() {",
    "  char k = pad.getKey();",
    "  if (k) {",
    "    if (k == '#') {",
    "      Serial.println(code == \"{{pin}}\" ? \"OPEN\" : \"WRONG\");",
    "      code = \"\";",
    "    } else {",
    "      code += k;",
    "      Serial.println(code);",
    "    }",
    "  }",
    "}"
  ],
  setupLines: [18, 19],
  params: [{ id: "pin", type: "select", label: "Correct PIN", options: ["1234", "0000", "4321"], value: "1234" }],
  presets: [{ label: "PIN 1234", values: { pin: "1234" } }, { label: "PIN 0000", values: { pin: "0000" } }],
  input: { label: "Key under the finger (0 = none, 1 to 16)", min: 0, max: 16, value: 0, unit: "" },
  monitor: {},
  noGraph: true,
  channels: [],
  idle: function () { return []; },
  reactive: function (inp, P, now, S) {
    var MAP = "123A456B789C*0#D", k = Math.round(inp.val), out = "", pressed = null;
    if (S.cand === undefined) { S.cand = 0; S.since = now; S.reg = 0; S.code = ""; S.until = 0; S.hl = [22, 23]; S.msg = "Hold the slider on a key for a moment."; }
    if (k !== S.cand) { S.cand = k; S.since = now; }
    if (now - S.since >= 250 && S.reg !== k) {
      S.reg = k;
      if (k > 0) {
        var ch = MAP.charAt(k - 1);
        if (ch === "#") { var ok = S.code === String(P.pin); out = (ok ? "OPEN" : "WRONG") + "\n"; S.msg = "'#' ends the entry: " + (ok ? "the code matches, so OPEN." : "'" + S.code + "' is not " + P.pin + ", so WRONG.") + " The buffer is cleared."; S.code = ""; S.hl = [22, 23, 24, 25, 26]; }
        else { S.code += ch; out = S.code + "\n"; S.msg = "Key '" + ch + "' was added. The buffer now holds '" + S.code + "'."; S.hl = [22, 23, 27, 28, 29]; }
        S.until = now + 500;
      }
    }
    var held = k > 0 ? MAP.charAt(k - 1) : null;
    return { vals: [], led: 1, pill: held ? "Key '" + held + "'" : "No key", out: out, lines: S.until > now ? S.hl : [22, 23], readout: S.msg };
  },
  stats: function () { return [{ v: "8", l: "pins for 16 keys" }, { v: "4 × 4", l: "rows × columns" }]; },
  timingTitle: "Experiment: enter the PIN",
  timingText: "Move the slider to key 1, hold for a moment, then 2, 3 and 4, and finally key 15 (the # key). The slider passes over other keys on its way, but a key only counts once it has been held for a short moment, which is what debouncing does for real buttons. Try a wrong PIN, then switch to another correct PIN with the select above.",
  challenge: "<b>Challenge on your real Uno:</b> add a green LED on pin 12 that lights for two seconds on OPEN, and let the sketch lock for ten seconds after three wrong tries. Which new variables do you need?",
  quiz: [
    { q: "How many Uno pins does a 4×4 keypad need?", a: ["8", "16", "4", "2"], c: 0, e: "Four rows and four columns." },
    { q: "How does the library find which key is pressed?", a: ["It sets one row LOW at a time and looks for a LOW column", "It reads one analog pin", "Each key has its own pin", "It uses I2C"], c: 0, e: "That is matrix scanning." },
    { q: "pad.getKey() returns nothing when no key is pressed. What does that look like in code?", a: ["The value is 0, so if (k) is false", "The sketch waits", "It returns 'N'", "It returns −1"], c: 0, e: "A char of 0 is false, so the if block is skipped." }
  ],
  next: "Next: the rotary encoder."
};
