(window.__L = window.__L || {})["3-5"] = {
  num: "3.5",
  level: "Level 1 · Basics",
  title: "Blink patterns and SOS",
  lead: "Use your own functions to blink the Morse code for SOS. About 5 minutes.",
  parts: "Same circuit as Lesson 3.3: Uno, 220 ohm resistor, LED on pin 13.",
  learn: ["How to write your own functions, dot() and dash()", "How to build a pattern from small pieces", "How to blink SOS in Morse code"],

  circuit: {
    prewired: true,
    pin: 13,
    resistor: "220 Ω",
    steps: ["", "", "", "<b>Same circuit as Lesson 3.3.</b> Only the code changes."],
    math: "A function such as dot() holds a few lines you can call by name as many times as you like."
  },

  code: [
    "void dot() {  // our own command: one short flash",
    "  digitalWrite(13, HIGH);",
    "  delay({{dot}});  // short on-time",
    "  digitalWrite(13, LOW);",
    "  delay({{gap}});  // gap before the next flash",
    "}",
    "",
    "void dash() {  // our own command: one long flash",
    "  digitalWrite(13, HIGH);",
    "  delay({{dash}});  // long on-time",
    "  digitalWrite(13, LOW);",
    "  delay({{gap}});  // same gap",
    "}",
    "",
    "void setup() {  // runs once at start-up",
    "  pinMode(13, OUTPUT);  // pin 13 drives the LED",
    "}",
    "",
    "void loop() {  // runs again and again",
    "  dot(); dot(); dot();  // S = three dots",
    "  dash(); dash(); dash();  // O = three dashes",
    "  dot(); dot(); dot();  // S = three dots",
    "  delay({{pause}});  // rest before repeating",
    "}"
  ],
  setupLines: [16],
  params: [
    { id: "dot", label: "Dot length in milliseconds", value: 200, min: 50, max: 600, step: 50 },
    { id: "dash", label: "Dash length in milliseconds", value: 600, min: 150, max: 1500, step: 50 },
    { id: "gap", label: "Gap in milliseconds", value: 200, min: 50, max: 600, step: 50 },
    { id: "pause", label: "Rest in milliseconds", value: 1400, min: 200, max: 3000, step: 100 }
  ],

  timeline: function (p) {
    var t = [];
    function call(callLine, bodyHigh, bodyLowGap, on) {
      t.push({ line: [callLine, bodyHigh], pin: 1, ms: on });
      t.push({ line: [callLine, bodyLowGap], pin: 0, ms: p.gap });
    }
    var i;
    for (i = 0; i < 3; i++) call(20, 3, 5, p.dot);
    for (i = 0; i < 3; i++) call(21, 10, 12, p.dash);
    for (i = 0; i < 3; i++) call(22, 3, 5, p.dot);
    t.push({ line: 23, pin: 0, ms: p.pause });
    return t;
  },
  graphWindow: 8000,

  timingTitle: "Change the pattern",
  timingText: "Edit the numbers in the code. A dash is usually three times as long as a dot.",
  presets: [
    { label: "Standard SOS", values: { dot: 200, dash: 600, gap: 200, pause: 1400 } },
    { label: "Fast", values: { dot: 100, dash: 300, gap: 100, pause: 700 } },
    { label: "Slow", values: { dot: 400, dash: 1200, gap: 400, pause: 2800 } }
  ],
  stats: function (p) {
    var total = 6 * (p.dot + p.gap) + 3 * (p.dash + p.gap) + p.pause;
    return [
      { v: (total / 1000).toFixed(1) + " s", l: "for one full SOS" },
      { v: String(Math.round(60000 / total * 10) / 10), l: "SOS signals per minute" }
    ];
  },
  challenge: "<b>Challenge on your real Uno:</b> write a function called flash() that blinks 5 times quickly, and call it from loop().",

  quiz: [
    { q: "What is the main benefit of writing dot() as a function?",
      a: ["The LED gets brighter", "Repeated code is written once and reused", "The delay becomes shorter", "It removes the need for setup()"],
      c: 1, e: "A function holds code once, so you can call it many times and fix it in a single place." },
    { q: "In the loop, which part makes the rest between SOS signals?",
      a: ["dash();", "digitalWrite(13, LOW);", "delay(pause);", "pinMode(13, OUTPUT);"],
      c: 2, e: "The final delay keeps the LED off before the next SOS starts." },
    { q: "With the standard timing (dot 200, gap 200), how long is one dot including its gap?",
      a: ["200 ms", "400 ms", "600 ms", "1000 ms"],
      c: 1, e: "The dot is on for 200 ms and then off for a 200 ms gap, so 400 ms in total." }
  ],
  next: "Next up: loops, so you do not have to type dot() three times."
};
