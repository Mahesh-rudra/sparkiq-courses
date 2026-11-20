(window.__L = window.__L || {})["14-1"] = {
  num: "14.1", level: "Level 2 · Intermediate",
  title: "Flash, SRAM and EEPROM",
  lead: "The Uno has three kinds of memory, and only 2 KB of the one your variables live in. About 8 minutes.",
  parts: "Parts: Arduino Uno and its USB cable. Nothing else to wire.",
  circuit: {
    type: "usb", pinLabel: "USB serial link",
    steps: [
      "<b>Step 1 of 1.</b> Plug the <b>USB cable</b> into the Uno and into your computer.",
      "<b>Connected.</b> Press Run and watch the memory report."
    ],
    math: "<b>Flash</b> (32 KB) holds your program and survives power off. <b>SRAM</b> (2 KB) holds variables while the program runs and is wiped at power off. <b>EEPROM</b> (1 KB) keeps small values through power off, and you write it deliberately. An array takes <b>count × size of one item</b>: byte is 1, int is 2, long is 4. The core and Serial also use roughly 200 bytes of SRAM."
  },
  code: [
    "const int N = {{n}};",
    "",
    "{{type}} readings[N];",
    "",
    "void setup() {",
    "  Serial.begin(9600);",
    "}",
    "",
    "void loop() {",
    "  readings[0] = analogRead(A0);",
    "  Serial.println(sizeof(readings));",
    "  delay(1000);",
    "}"
  ],
  setupLines: [6, 7],
  params: [
    { id: "n", type: "number", label: "Number of readings in the array", min: 50, max: 1000, step: 50, value: 200 },
    { id: "type", type: "select", label: "Type of each reading", options: ["byte", "int", "long"], value: "int" }
  ],
  presets: [{ label: "200 ints", values: { n: 200, type: "int" } }, { label: "800 longs (too big)", values: { n: 800, type: "long" } }, { label: "800 bytes", values: { n: 800, type: "byte" } }],
  monitor: {},
  noGraph: true,
  channels: [],
  idle: function () { return []; },
  reactive: function (inp, P, now, S) {
    var size = { byte: 1, int: 2, long: 4 }[P.type] || 2, arr = Math.round(P.n) * size, total = arr + 200, pct = Math.round(total / 2048 * 100), out = "";
    if (S.t0 === undefined) { S.t0 = now; S.k = 0; }
    var k = Math.floor((now - S.t0) / 1000);
    while (S.k <= k && S.k < k + 1) { out += arr + "\n"; S.k++; }
    var over = total > 2048, tight = total > 1600;
    return { vals: [], led: 1, pill: over ? "Out of SRAM" : pct + "% of SRAM", out: out, lines: [10, 11, 12],
      readout: P.n + " × " + size + " bytes = " + arr + " bytes for the array, plus about 200 for the system = " + total + " of 2048." + (over ? "  It does not fit: the compiler stops with a 'data section exceeds' error." : tight ? "  Over 80%: the IDE warns that low memory may cause crashes." : "  Plenty of room left for local variables.") };
  },
  stats: function (P) { var size = { byte: 1, int: 2, long: 4 }[P.type] || 2, t = Math.round(P.n) * size + 200; return [{ v: t + " B", l: "SRAM in use (estimate)" }, { v: Math.max(0, 2048 - t) + " B", l: "left for local variables" }]; },
  timingTitle: "Experiment: change the type",
  timingText: "The same 200 readings take 200 bytes as <code>byte</code>, 400 as <code>int</code> and 800 as <code>long</code>. Pick 800 longs and the array alone is 3200 bytes, more than the whole 2048 bytes of SRAM. Choosing the smallest type that holds your values is the cheapest way to save memory. An analogRead (0 to 1023) needs an int, but a value divided by 4 fits in a byte.",
  challenge: "<b>Challenge on your real Uno:</b> upload the sketch with 200 ints and read the message under the compile output: 'Global variables use ... bytes'. Compare it with the estimate here.",
  quiz: [
    { q: "Which memory keeps its contents when the Uno loses power?", a: ["Flash and EEPROM", "SRAM only", "Only the USB chip", "None of them"], c: 0, e: "SRAM is wiped at power off. Flash and EEPROM are not." },
    { q: "An array of 300 ints uses how many bytes?", a: ["600", "300", "1200", "150"], c: 0, e: "An int is 2 bytes on the Uno, so 300 × 2 = 600." },
    { q: "How much SRAM does the Uno have?", a: ["2 KB", "32 KB", "1 KB", "256 KB"], c: 0, e: "2048 bytes. Flash is 32 KB and EEPROM is 1 KB." }
  ],
  next: "Next: save SRAM by keeping text in flash with F()."
};
