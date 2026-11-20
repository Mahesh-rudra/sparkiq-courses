(window.__L = window.__L || {})["21-1"] = {
  num: "21.1", level: "Level 3 · Advanced",
  title: "HC-05 Bluetooth control",
  lead: "Switch an LED from your phone through an HC-05 module, and protect its 3.3 V input. About 14 minutes.",
  parts: "Parts: Arduino Uno, an HC-05 Bluetooth module, 1 kΩ and 2 kΩ resistors, an LED with a 220 Ω resistor on pin 13, jumper wires, a phone with a Bluetooth terminal app.",
  circuit: {
    type: "disp", kind: "sensor", dev: "HC-05", groups: 4, pinLabel: "Pins 10 and 11 (SoftwareSerial)",
    rows: [
      { u: "Uno pin 10", d: "HC-05 TXD", g: 0 },
      { u: "Uno pin 11", d: "HC-05 RXD, through a divider", g: 1 },
      { u: "5V", d: "HC-05 VCC", g: 2, t: "p" }, { u: "GND", d: "HC-05 GND", g: 3, t: "g" }
    ],
    steps: [
      "<b>Step 1 of 4.</b> Connect the HC-05's <b>TXD</b> to Uno <b>pin 10</b>. A 3.3 V output is read as HIGH by the Uno, so no divider is needed in this direction.",
      "<b>Step 2 of 4.</b> Connect Uno <b>pin 11</b> to a <b>1 kΩ</b> resistor, then to <b>RXD</b>, and from RXD a <b>2 kΩ</b> resistor to GND. This divider turns 5 V into about 3.3 V.",
      "<b>Step 3 of 4.</b> Connect <b>VCC</b> to <b>5V</b> (most HC-05 modules have a regulator).",
      "<b>Step 4 of 4.</b> Connect <b>GND</b> to <b>GND</b>.",
      "<b>Circuit complete.</b> Press Run, choose the baud rate and send commands from the slider."
    ],
    math: "The HC-05's RXD pin is 3.3 V. The divider gives <b>Vout = 5 V × 2 kΩ ÷ (1 kΩ + 2 kΩ) = 3.33 V</b>. In normal (data) mode the module defaults to <b>9600 baud</b>; its AT-command mode uses <b>38400</b>. Pair with the phone first (the PIN is usually 1234 or 0000), then open a Bluetooth terminal app and send characters."
  },
  code: [
    "#include <SoftwareSerial.h>",
    "SoftwareSerial bt(10, 11);",
    "",
    "void setup() {",
    "  pinMode(13, OUTPUT);",
    "  bt.begin({{baud}});",
    "}",
    "",
    "void loop() {",
    "  if (bt.available()) {",
    "    char c = bt.read();",
    "    if (c == '1') digitalWrite(13, HIGH);",
    "    if (c == '0') digitalWrite(13, LOW);",
    "  }",
    "}"
  ],
  setupLines: [5, 6, 7],
  params: [{ id: "baud", type: "select", label: "bt.begin baud", options: ["9600", "38400", "115200"], value: "9600" }],
  presets: [{ label: "9600 (data mode)", values: { baud: "9600" } }, { label: "38400 (AT mode rate)", values: { baud: "38400" } }],
  input: { label: "Phone sends: 0 = '0', 1 = '1'", min: 0, max: 1, value: 0, unit: "" },
  monitor: {},
  noGraph: true,
  channels: [],
  idle: function () { return []; },
  reactive: function (inp, P, now, S) {
    var ok = parseInt(P.baud, 10) === 9600, v = inp.val >= 1 ? 1 : 0, out = "";
    if (S.prev === undefined) { S.prev = v; S.led = 0; }
    if (v !== S.prev) { S.prev = v; if (ok) { S.led = v; out = "LED " + (v ? "ON" : "OFF") + "\n"; } else { out = "(received bytes are garbled, so no command matches)\n"; } }
    return { vals: [], led: ok ? S.led : 0, pill: ok ? (S.led ? "LED on" : "LED off") : "no link", out: out, lines: out ? [10, 11, 12, 13] : [9, 10],
      readout: ok ? "The phone's '" + v + "' arrives as one byte; the sketch compares it and switches pin 13. The divider gives " + (5 * 2 / 3).toFixed(2) + " V at RXD." : "The module talks at 9600 baud but the sketch listens at " + P.baud + ". The bits are sampled at the wrong moments, so '1' and '0' never match. (38400 is for AT commands only.)" };
  },
  stats: function () { return [{ v: "3.33 V", l: "at RXD with the 1 kΩ + 2 kΩ divider" }, { v: "~10 m", l: "typical range" }]; },
  timingTitle: "Experiment: the baud rate",
  timingText: "At 9600 baud each press of the slider switches the LED, as if the phone had sent '1' or '0'. Switch to 38400 and nothing responds: the module and the Uno disagree on the speed. If you ever need to set the name or PIN, hold the HC-05's button while powering it to enter AT mode at 38400 baud. Never connect Uno's 5 V pin straight to RXD: it works for a while, then the module fails.",
  challenge: "<b>Challenge on your real Uno:</b> add the reply <code>bt.println(\"LED on\");</code> so the phone gets a confirmation. What happens if you send 'A'? Add an <code>else</code> that replies 'unknown command'.",
  quiz: [
    { q: "Why does the Uno's TX line need a divider before the HC-05's RXD?", a: ["RXD is a 3.3 V input", "TXD is too slow", "It sets the baud rate", "The Uno sends 12 V"], c: 0, e: "A 5 V signal on a 3.3 V pin can damage it over time." },
    { q: "A 1 kΩ in series and 2 kΩ to ground divide 5 V to about what?", a: ["3.3 V", "2.5 V", "1.7 V", "4 V"], c: 0, e: "5 × 2 ÷ 3 = 3.33 V." },
    { q: "What is the data-mode default baud rate of an HC-05?", a: ["9600", "38400", "115200", "1200"], c: 0, e: "Data mode defaults to 9600; AT mode uses 38400." }
  ],
  next: "Next: understand commands sent from a phone app."
};
