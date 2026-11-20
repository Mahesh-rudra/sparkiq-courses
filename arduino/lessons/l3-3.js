(window.__L = window.__L || {})["3-3"] = {
  num: "3.3",
  level: "Level 1 · Basics",
  title: "Make an LED blink",
  lead: "Wire the circuit, run the code, then change the timing. About 4 minutes.",
  parts: "Parts: Arduino Uno, 220 ohm resistor, LED, breadboard, 2 jumper wires.",
  learn: ["How to wire an LED with a resistor to pin 13", "How setup(), loop() and delay() make it blink", "How the delay values change the blink rate"],

  // Circuit card. prewired:true skips the step-by-step wiring.
  circuit: {
    pin: 13,
    resistor: "220 Ω",
    steps: [
      "<b>Step 1 of 3.</b> Connect Uno <b>pin 13</b> to one end of the <b>220 Ω resistor</b>.",
      "<b>Step 2 of 3.</b> Connect the other end of the resistor to the LED's <b>long leg</b> (anode, +).",
      "<b>Step 3 of 3.</b> Connect the LED's <b>short leg</b> (cathode, −) to <b>GND</b> to complete the loop.",
      "<b>Circuit complete.</b> Go to step 2 and press Run."
    ],
    math: "With the resistor: (5 V − about 2 V across the LED) ÷ 220 Ω ≈ 14 mA, safe for the LED and the pin."
  },

  // Code lines. {{id}} becomes an editable number box. // starts a comment.
  code: [
    "void setup() {  // runs once, when the Uno starts",
    "  pinMode(13, OUTPUT);  // pin 13 sends voltage out",
    "}",
    "",
    "void loop() {  // runs again and again, forever",
    "  digitalWrite(13, HIGH);  // LED on",
    "  delay({{d1}});  // wait, in milliseconds",
    "  digitalWrite(13, LOW);   // LED off",
    "  delay({{d2}});  // wait, then loop() starts over",
    "}"
  ],
  setupLines: [2],
  params: [
    { id: "d1", label: "First delay in milliseconds", value: 1000, min: 50, max: 3000, step: 50 },
    { id: "d2", label: "Second delay in milliseconds", value: 1000, min: 50, max: 3000, step: 50 }
  ],

  // One pass of loop(): which line(s) run, the pin level, and for how long.
  timeline: function (p) {
    var f1 = Math.min(80, p.d1 * 0.3), f2 = Math.min(80, p.d2 * 0.3);
    return [
      { line: 6, pin: 1, ms: f1 },
      { line: 7, pin: 1, ms: p.d1 - f1 },
      { line: 8, pin: 0, ms: f2 },
      { line: 9, pin: 0, ms: p.d2 - f2 }
    ];
  },
  graphWindow: 4000,

  timingTitle: "Change the timing",
  timingText: "Edit the numbers in the code, or try a preset. Delays are in milliseconds (1000 ms = 1 second).",
  presets: [
    { label: "1000 / 1000", values: { d1: 1000, d2: 1000 } },
    { label: "200 / 200", values: { d1: 200, d2: 200 } },
    { label: "100 / 900", values: { d1: 100, d2: 900 } },
    { label: "2000 / 500", values: { d1: 2000, d2: 500 } }
  ],
  stats: function (p) {
    var c = p.d1 + p.d2;
    return [
      { v: String(Math.round(1000 / c * 100) / 100), l: "blinks per second" },
      { v: Math.round(p.d1 / c * 100) + "%", l: "of the time the LED is on" }
    ];
  },
  challenge: "<b>Challenge on your real Uno:</b> make the LED blink twice quickly, pause for one second, then repeat.",

  quiz: [
    { q: "What does pinMode(13, OUTPUT) do?",
      a: ["Reads a button on pin 13", "Sets pin 13 to send voltage out", "Turns the LED on", "Waits for 13 milliseconds"],
      c: 1, e: "pinMode only sets the direction of the pin. digitalWrite is what actually turns the voltage on or off." },
    { q: "The LED turns on but never blinks. Which line is most likely missing?",
      a: ["pinMode(13, OUTPUT);", "void setup() {", "digitalWrite(13, LOW);", "Serial.begin(9600);"],
      c: 2, e: "Without a LOW (and its delay), the pin stays at 5 V, so the LED never goes off." },
    { q: "Both delays are 250 ms. How many blinks per second?",
      a: ["1", "2", "4", "250"],
      c: 1, e: "250 ms on plus 250 ms off is a 0.5 second cycle, so there are 2 blinks every second." }
  ],
  next: "Next: blink patterns and SOS."
};
