(window.__L = window.__L || {})["13-1"] = {
  num: "13.1", level: "Level 2 · Intermediate",
  title: "The transistor switch",
  lead: "An Uno pin can only supply about 20 mA. A transistor lets it switch a load ten times bigger. About 10 minutes.",
  parts: "Parts: Arduino Uno, one 2N2222 (or BC547) NPN transistor, a base resistor, a 5 V load that draws about 100 mA (a small buzzer, motor or LED strip), jumper wires.",
  learn: ["Why a pin cannot drive a big load directly", "How a transistor switches a larger current", "How to choose the base resistor"],
  circuit: {
    type: "disp", kind: "load", dev: "2N2222 NPN", groups: 2, pinLabel: "Pin 9 drives the base",
    rows: [
      { u: "Pin 9", d: "Base via Rb", g: 0 },
      { u: "5V", d: "Load + side", g: 1, t: "p" }, { u: "GND", d: "Emitter", g: 1, t: "g" }
    ],
    steps: [
      "<b>Step 1 of 2.</b> Connect Uno <b>pin 9</b> through the <b>base resistor</b> to the transistor's <b>base</b> (middle pin on a 2N2222 in a TO-92 case, flat face towards you: emitter, base, collector from left to right).",
      "<b>Step 2 of 2.</b> Connect the <b>emitter</b> to <b>GND</b>. Connect the load between <b>5V</b> and the <b>collector</b>.",
      "<b>Circuit complete.</b> Press Run and try the three resistor values."
    ],
    math: "The base needs a small current to open the switch: <b>Ib = (5 V − 0.7 V) ÷ Rb</b>. The transistor can then pass roughly <b>hFE × Ib</b> in the collector, with hFE around 100 for a 2N2222. With 1 kΩ, Ib is 4.3 mA and the transistor can pass up to 430 mA. With 10 kΩ, Ib is only 0.43 mA, so it can pass about 43 mA and a 100 mA load is starved."
  },
  code: [
    "const int GATE = 9;  // the transistor gate pin",
    "const long BASE_OHMS = {{rb}};  // the base resistor you fitted",
    "",
    "void setup() {  // runs once at start-up",
    "  pinMode(GATE, OUTPUT);",
    "}",
    "",
    "void loop() {  // runs again and again",
    "  digitalWrite(GATE, HIGH);  // transistor on: the load gets power",
    "  delay({{d}});",
    "  digitalWrite(GATE, LOW);  // transistor off: the load is off",
    "  delay({{d}});",
    "}"
  ],
  setupLines: [5, 6],
  params: [
    { id: "rb", type: "select", label: "Base resistor (Ω)", options: ["330", "1000", "10000"], value: "1000" },
    { id: "d", type: "number", label: "Time on and off in ms", min: 200, max: 1500, step: 100, value: 600 }
  ],
  presets: [{ label: "330 Ω", values: { rb: "330" } }, { label: "1 kΩ (good)", values: { rb: "1000" } }, { label: "10 kΩ (too big)", values: { rb: "10000" } }],
  noGraph: false,
  channels: [{ label: "Load current mA", top: "120", bot: "0", max: 120 }],
  graphWindow: 6000,
  idle: function () { return [0]; },
  reactive: function (inp, P, now, S) {
    var d = Math.max(200, P.d), rb = parseInt(P.rb, 10) || 1000, s = UNO.seq([{ ms: d, on: 1 }, { ms: d, on: 0 }], now, S).seg;
    var ib = s.on ? 4.3 / rb * 1000 : 0, ic = Math.min(100, 100 * ib);
    if (!s.on) return { vals: [0], led: 0, pill: "Load OFF", lines: [11, 12], readout: "Pin 9 is LOW: no base current, so the transistor is off and no current flows through the load." };
    return { vals: [ic], led: 1, pill: ic >= 100 ? "Load ON: 100 mA" : "Weak: only " + ic.toFixed(0) + " mA", lines: [9, 10],
      readout: "Ib = (5 − 0.7) ÷ " + rb + " = " + ib.toFixed(2) + " mA.  The transistor can pass about 100 × " + ib.toFixed(2) + " = " + (100 * ib).toFixed(0) + " mA.  The load wants 100 mA" + (ic >= 100 ? ": fully on." : ": it gets only " + ic.toFixed(0) + " mA and the transistor runs warm.") };
  },
  stats: function (P) { var rb = parseInt(P.rb, 10) || 1000; return [{ v: (4.3 / rb * 1000).toFixed(1) + " mA", l: "base current from the pin" }, { v: Math.min(100, 100 * 4.3 / rb * 1000).toFixed(0) + " mA", l: "load current available" }]; },
  timingTitle: "Experiment: choose the base resistor",
  timingText: "With 1 kΩ the load gets its full 100 mA, and the Uno pin gives only 4.3 mA. With 330 Ω it also works, but the pin gives 13 mA, close to its 20 mA limit. With 10 kΩ the base current is too small and the load is starved. A rule of thumb: pick Rb so that Ib is about one tenth of the load current.",
  challenge: "<b>Challenge on your real Uno:</b> swap the 1 kΩ for 10 kΩ and touch the transistor after 30 seconds. Why does it feel warm? (Hint: a half-open transistor drops a lot of voltage while passing current.)",
  quiz: [
    { q: "Why use a transistor between the Uno and a 100 mA load?", a: ["A pin can only supply about 20 mA safely", "The Uno has no digital pins", "The load needs AC", "It makes the load smarter"], c: 0, e: "The base takes a few mA and the collector carries the load current." },
    { q: "Rb is 1 kΩ. What is the base current?", a: ["About 4.3 mA", "About 43 mA", "About 0.43 mA", "5 mA exactly"], c: 0, e: "(5 − 0.7) ÷ 1000 = 4.3 mA." },
    { q: "The transistor and Uno must share one thing. What?", a: ["GND", "5V only", "A0", "Nothing"], c: 0, e: "Without a common ground, the base signal has no reference." }
  ],
  next: "Next: a DC motor with PWM speed control and a flyback diode."
};
