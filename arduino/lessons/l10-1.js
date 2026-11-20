(window.__L = window.__L || {})["10-1"] = {
  num: "10.1", level: "Level 2 · Intermediate",
  title: "Functions: your own commands",
  lead: "Give a group of lines a name, then use it again and again. About 6 minutes.",
  parts: "Parts: Arduino Uno, one LED, one 220 Ω resistor, breadboard, jumper wires.",
  circuit: {
    type: "led", pin: 13, resistor: "220 Ω",
    steps: [
      "<b>Step 1 of 3.</b> Connect Uno <b>pin 13</b> to the <b>220 Ω resistor</b>.",
      "<b>Step 2 of 3.</b> Connect the resistor to the <b>LED</b> (long leg, the + side).",
      "<b>Step 3 of 3.</b> Connect the LED's short leg to <b>GND</b>.",
      "<b>Circuit complete.</b> Same circuit as Lesson 3.3. Press Run and watch the three blinks."
    ],
    math: "Nothing new in the wiring. The new idea is in the code: <code>blinkOnce()</code> is a function you wrote. Every time loop() calls it, the Uno jumps into those lines, runs them, and comes back."
  },
  code: [
    "const int LED = 13;",
    "",
    "void blinkOnce() {",
    "  digitalWrite(LED, HIGH);",
    "  delay({{t}});",
    "  digitalWrite(LED, LOW);",
    "  delay({{t}});",
    "}",
    "",
    "void setup() {",
    "  pinMode(LED, OUTPUT);",
    "}",
    "",
    "void loop() {",
    "  blinkOnce();",
    "  blinkOnce();",
    "  blinkOnce();",
    "  delay({{pause}});",
    "}"
  ],
  setupLines: [11, 12],
  params: [
    { id: "t", type: "number", label: "Blink time in ms", min: 50, max: 500, step: 50, value: 150 },
    { id: "pause", type: "number", label: "Pause in ms", min: 200, max: 3000, step: 100, value: 1000 }
  ],
  presets: [{ label: "Quick triple", values: { t: 100, pause: 800 } }, { label: "Normal", values: { t: 150, pause: 1000 } }, { label: "Slow", values: { t: 400, pause: 1500 } }],
  channels: [{ label: "Pin 13 (LED)" }],
  graphWindow: 6000,
  idle: function () { return [0]; },
  reactive: function (inp, P, now, S) {
    var t = Math.max(50, P.t), pause = Math.max(100, P.pause), segs = [], c;
    for (c = 0; c < 3; c++) { segs.push({ ms: t, on: 1, call: c }); segs.push({ ms: t, on: 0, call: c }); }
    segs.push({ ms: pause, on: 0, call: -1 });
    var s = UNO.seq(segs, now, S).seg;
    var lines = s.call < 0 ? [18] : (s.on ? [15 + s.call, 4, 5] : [15 + s.call, 6, 7]);
    return {
      vals: [s.on], led: s.on, pill: "Pin 13 is " + (s.on ? "HIGH" : "LOW"), lines: lines,
      readout: s.call < 0 ? "Back in loop(): waiting before the next group." : "Inside blinkOnce(), call " + (s.call + 1) + " of 3."
    };
  },
  stats: function (P) { var c = 6 * Math.max(50, P.t) + Math.max(100, P.pause); return [{ v: (c / 1000).toFixed(2) + " s", l: "one full cycle" }, { v: String(Math.round(180000 / c)), l: "blinks per minute" }]; },
  timingTitle: "Experiment: change it in one place",
  timingText: "While it runs, change the delay inside <code>blinkOnce()</code>. All three blinks change together, because the three calls share one set of lines. Without a function you would need to edit six delay() lines, and it is easy to miss one.",
  challenge: "<b>Challenge on your real Uno:</b> write a second function, <code>longBlink()</code>, that keeps the LED on for 600 ms. In loop(), call blinkOnce() three times, longBlink() three times, then blinkOnce() three times. That is SOS.",
  quiz: [
    { q: "What is the main benefit of writing blinkOnce()?", a: ["The lines are written once and used many times", "The LED gets brighter", "The Uno uses less power", "The Uno runs faster"], c: 0, e: "A function lets you reuse lines and change them in one place." },
    { q: "What does void mean in void blinkOnce()?", a: ["The function sends back no value", "The function is empty", "The function runs only once", "The function is switched off"], c: 0, e: "void means nothing is returned. The next lesson shows functions that return a value." },
    { q: "loop() calls blinkOnce() three times. How many times do the lines inside blinkOnce() run each pass of loop()?", a: ["Once", "Three times", "Six times", "Never"], c: 1, e: "Each call runs the function's lines once, so three calls run them three times." }
  ],
  next: "Next: parameters and return values."
};
