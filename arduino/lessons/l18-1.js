(window.__L = window.__L || {})["18-1"] = {
  num: "18.1", level: "Level 3 · Advanced",
  title: "UART between two boards",
  lead: "Send text from one Uno to another over two wires, and see what a baud-rate mismatch does. About 12 minutes.",
  parts: "Parts: two Arduino Uno boards, three jumper wires, two USB cables.",
  circuit: {
    type: "disp", kind: "sensor", dev: "Second Uno (receiver)", groups: 3, pinLabel: "Sender pin 11 and pin 10",
    rows: [
      { u: "Sender pin 11 (TX)", d: "Receiver pin 10 (RX)", g: 0 },
      { u: "Sender pin 10 (RX)", d: "Receiver pin 11 (TX)", g: 1 },
      { u: "Sender GND", d: "Receiver GND", g: 2, t: "g" }
    ],
    steps: [
      "<b>Step 1 of 3.</b> Connect the sender's <b>pin 11</b> to the receiver's <b>pin 10</b>. TX always goes to RX.",
      "<b>Step 2 of 3.</b> Connect the sender's <b>pin 10</b> to the receiver's <b>pin 11</b>.",
      "<b>Step 3 of 3.</b> Join the two <b>GND</b> pins. Both boards must share a ground.",
      "<b>Circuit complete.</b> Press Run and choose the receiver's baud rate."
    ],
    math: "UART has no clock wire. Both sides agree on a <b>baud rate</b>, and the receiver samples each bit in the middle of where it expects it. Each byte is 10 bits (start, 8 data, stop), so at 9600 baud it takes 10 ÷ 9600 = 1.04 ms. If the two rates differ by more than about 3 to 5%, the sampling drifts out of the bit and the text turns to garbage. Avoid pins 0 and 1 for this: they are shared with the USB link."
  },
  code: [
    "#include <SoftwareSerial.h>",
    "SoftwareSerial link(10, 11);",
    "",
    "void setup() {",
    "  Serial.begin(9600);",
    "  link.begin({{baud}});",
    "}",
    "",
    "void loop() {",
    "  if (link.available()) {",
    "    Serial.write(link.read());",
    "  }",
    "}"
  ],
  setupLines: [5, 6, 7],
  params: [{ id: "baud", type: "select", label: "Receiver baud (sender uses 9600)", options: ["9600", "4800", "19200", "9800"], value: "9600" }],
  presets: [{ label: "Match", values: { baud: "9600" } }, { label: "Half speed", values: { baud: "4800" } }, { label: "Double speed", values: { baud: "19200" } }, { label: "2% off", values: { baud: "9800" } }],
  monitor: {},
  noGraph: true,
  channels: [],
  idle: function () { return []; },
  reactive: function (inp, P, now, S) {
    var b = parseInt(P.baud, 10), err = Math.abs(b - 9600) / 9600 * 100, ok = err < 3, msg = "Hello Uno!\n";
    var k = Math.floor(now / 1200); if (S.k === undefined) S.k = k - 1;
    var out = "";
    if (S.k !== k) { S.k = k; if (ok) out = msg; else { for (var i = 0; i < msg.length - 1; i++) { var x = Math.sin((k * 11 + i) * 12.9898) * 43758.5453; x = x - Math.floor(x); out += String.fromCharCode(33 + Math.floor(x * 90)); } out += "\n"; } }
    return { vals: [], led: 1, pill: ok ? "link OK" : "garbage", out: out, lines: out ? [10, 11, 12] : [9, 10],
      readout: "Sender 9600 baud, receiver " + b + " baud: rate error " + err.toFixed(1) + "%.  " + (ok ? "Within tolerance (about 3%), so every bit is sampled correctly." : "Too far off: the receiver samples at the wrong moments, so bits are misread. A common cause of strange characters.") + "  One byte takes " + (10000 / b).toFixed(2) + " ms at " + b + " baud." };
  },
  stats: function (P) { var b = parseInt(P.baud, 10); return [{ v: Math.round(b / 10) + " B/s", l: "throughput at this baud" }, { v: (10000 / b).toFixed(2) + " ms", l: "time per byte" }]; },
  timingTitle: "Experiment: the baud-rate tolerance",
  timingText: "At 9600 on both sides the message arrives clean. At half or double speed you get garbage straight away. At 9800 baud, which is 2% off, the text still gets through, because the error is under the tolerance; a few more percent and it would fail. SoftwareSerial is reliable to about 57600 baud on the Uno and cannot receive on two ports at once. Also, the Uno's hardware pins 0 and 1 are already used by USB.",
  challenge: "<b>Challenge on your real Uno:</b> make the sender transmit a number from an analog pin every 500 ms as text, such as <code>link.println(analogRead(A0));</code>. On the receiver, use <code>link.parseInt()</code> to turn it back into a number. What happens if a byte is lost in the middle?",
  quiz: [
    { q: "How are two UART devices connected?", a: ["TX to RX, RX to TX, and a shared GND", "TX to TX and RX to RX", "TX to RX only, with no ground", "One wire carries both directions"], c: 0, e: "Each side's transmitter goes to the other side's receiver, and the grounds are joined." },
    { q: "How many bits are sent for one data byte with 8N1?", a: ["10", "8", "9", "16"], c: 0, e: "A start bit, 8 data bits and a stop bit." },
    { q: "Why should you avoid pins 0 and 1 for a second device?", a: ["They are used by the USB serial link", "They are analog pins", "They have no pull-up", "They are too slow"], c: 0, e: "Using them can block uploading and mix up the two data streams." }
  ],
  next: "Next: I2C, and a scanner that finds every device on the bus."
};
