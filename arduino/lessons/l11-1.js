(window.__L = window.__L || {})["11-1"] = {
  num: "11.1", level: "Level 2 · Intermediate",
  title: "The 7-segment display",
  lead: "Light seven LED bars in the right pattern to show a digit. About 10 minutes.",
  parts: "Parts: Arduino Uno, one common-cathode 7-segment display, one 220 Ω resistor, breadboard, jumper wires.",
  circuit: {
    type: "disp", kind: "seg7", dev: "7-segment (common cathode)", groups: 2, pinLabel: "Pins 2 to 8 drive segments a to g",
    rows: [
      { u: "Pin 2", d: "a", g: 0 }, { u: "Pin 3", d: "b", g: 0 }, { u: "Pin 4", d: "c", g: 0 }, { u: "Pin 5", d: "d", g: 0 },
      { u: "Pin 6", d: "e", g: 0 }, { u: "Pin 7", d: "f", g: 0 }, { u: "Pin 8", d: "g", g: 0 },
      { u: "GND", d: "COM, 220 Ω", g: 1, t: "g" }
    ],
    steps: [
      "<b>Step 1 of 2.</b> Connect Uno <b>pins 2 to 8</b> to the display's segment pins <b>a to g</b>, in order.",
      "<b>Step 2 of 2.</b> Connect the display's <b>COM</b> (common cathode) pin through the <b>220 Ω resistor</b> to <b>GND</b>.",
      "<b>Circuit complete.</b> Press Run and watch the digits count from 0 to 9."
    ],
    math: "A 7-segment digit is seven LEDs (a to g) that share one pin, COM. In a common-cathode display, COM goes to GND and a HIGH on a segment pin lights that segment. Sharing one 220 Ω resistor on COM is fine for learning, but brightness changes slightly with how many segments are lit. For even brightness, use one resistor per segment."
  },
  code: [
    "const int segPins[] = {2, 3, 4, 5, 6, 7, 8};  // a b c d e f g",
    "const byte DIGITS[] = {",
    "  0x3F, 0x06, 0x5B, 0x4F, 0x66,   // 0 1 2 3 4",
    "  0x6D, 0x7D, 0x07, 0x7F, 0x6F    // 5 6 7 8 9",
    "};",
    "",
    "void showDigit(int n) {",
    "  for (int i = 0; i < 7; i++) {",
    "    digitalWrite(segPins[i], bitRead(DIGITS[n], i));",
    "  }",
    "}",
    "",
    "void setup() {",
    "  for (int i = 0; i < 7; i++) {",
    "    pinMode(segPins[i], OUTPUT);",
    "  }",
    "}",
    "",
    "void loop() {",
    "  for (int n = 0; n <= 9; n++) {",
    "    showDigit(n);",
    "    delay({{d}});",
    "  }",
    "}"
  ],
  setupLines: [14, 15, 16, 17],
  params: [{ id: "d", type: "number", label: "Time per digit in ms", min: 200, max: 2000, step: 100, value: 800 }],
  presets: [{ label: "Fast (300 ms)", values: { d: 300 } }, { label: "Normal (800 ms)", values: { d: 800 } }, { label: "Slow (1500 ms)", values: { d: 1500 } }],
  noGraph: true,
  channels: [],
  idle: function () { return []; },
  reactive: function (inp, P, now, S) {
    var D = [0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F], d = Math.max(200, P.d), segs = [], n;
    for (n = 0; n < 10; n++) segs.push({ ms: d, n: n });
    var q = UNO.seq(segs, now, S).seg.n, pat = D[q], on = "", bin = "";
    for (var i = 0; i < 7; i++) { if ((pat >> i) & 1) on += "abcdefg"[i]; bin = ((pat >> i) & 1) + bin; }
    return {
      vals: [], led: 1, pill: "Showing " + q, disp: { segs: on }, lines: [20, 21, 22, 8, 9],
      readout: "n = " + q + ":  DIGITS[" + q + "] = 0x" + ("0" + pat.toString(16).toUpperCase()).slice(-2) + " = " + bin + " (g to a)  →  segments " + on.split("").join(" ")
    };
  },
  stats: function (P) { return [{ v: (10 * Math.max(200, P.d) / 1000).toFixed(1) + " s", l: "to count 0 to 9" }]; },
  timingTitle: "Experiment: read the pattern",
  timingText: "Watch the readout under the display. Each digit is one byte, and each bit of that byte is one segment: bit 0 is segment a, bit 6 is segment g. For 1, only bits 1 and 2 are set, which lights segments b and c. <code>bitRead(DIGITS[n], i)</code> pulls out one bit, and <code>digitalWrite</code> sends it to the matching pin.",
  challenge: "<b>Challenge on your real Uno:</b> make it count down from 9 to 0. Then add the letter A: it uses segments a, b, c, e, f and g. What byte value is that?",
  quiz: [
    { q: "How many LED bars (not counting the dot) are in one 7-segment digit?", a: ["7", "8", "10", "5"], c: 0, e: "The segments are labelled a to g." },
    { q: "What does bitRead(DIGITS[n], i) return?", a: ["Bit number i of the pattern for digit n, which is 0 or 1", "The digit n", "The pin number", "The delay time"], c: 0, e: "It picks one bit from the byte, and that bit says whether segment i is on." },
    { q: "Why is a resistor needed on the display?", a: ["To limit the current through the LED segments", "To make the digits change", "To store the pattern", "It is not needed"], c: 0, e: "Each segment is an LED, so current must be limited, as in Lesson 2.3." }
  ],
  next: "Next: the 74HC595 shift register, which controls 8 outputs using only 3 pins."
};
