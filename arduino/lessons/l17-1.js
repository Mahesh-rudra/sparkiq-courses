(window.__L = window.__L || {})["17-1"] = {
  num: "17.1", level: "Level 3 · Advanced",
  title: "External interrupts",
  lead: "Catch a pulse that happens while your loop() is busy, using an interrupt on pin 2. About 12 minutes.",
  parts: "Parts: Arduino Uno, a pushbutton or a signal source, jumper wires, USB cable.",
  circuit: {
    type: "usb", pinLabel: "USB serial link",
    steps: [
      "<b>Step 1 of 1.</b> Plug the <b>USB cable</b> into the Uno. Wire a button between <b>pin 2</b> and <b>GND</b> (the code uses INPUT_PULLUP).",
      "<b>Connected.</b> Press Run, set how long loop() is busy, and change the pulse rate."
    ],
    math: "A normal check with <code>digitalRead()</code> only sees the pin when loop() gets to it. If loop() is busy for 200 ms, any pulse shorter than that can be missed. An <b>interrupt</b> makes the hardware pause loop(), run a short function (the ISR), then resume. On the Uno only <b>pin 2</b> (INT0) and <b>pin 3</b> (INT1) support attachInterrupt()."
  },
  code: [
    "volatile unsigned int pulses = 0;",
    "",
    "void onPulse() {",
    "  pulses++;",
    "}",
    "",
    "void setup() {",
    "  Serial.begin(9600);",
    "  pinMode(2, INPUT_PULLUP);",
    "  {{mode}}",
    "}",
    "",
    "void loop() {",
    "  delay({{busy}});",
    "  Serial.println(pulses);",
    "}"
  ],
  setupLines: [8, 9, 10, 11],
  params: [
    { id: "mode", type: "select", label: "How pulses are counted", options: ["attachInterrupt(digitalPinToInterrupt(2), onPulse, FALLING);", "// no interrupt: pulses never counted"], value: "attachInterrupt(digitalPinToInterrupt(2), onPulse, FALLING);" },
    { id: "busy", type: "number", label: "loop() busy time (ms)", min: 100, max: 1000, step: 100, value: 500 }
  ],
  presets: [{ label: "Interrupt", values: { mode: "attachInterrupt(digitalPinToInterrupt(2), onPulse, FALLING);", busy: 500 } }, { label: "No interrupt", values: { mode: "// no interrupt: pulses never counted", busy: 500 } }],
  input: { label: "Pulses per second", min: 0, max: 50, value: 10, unit: " /s" },
  monitor: {},
  noGraph: true,
  channels: [],
  idle: function () { return []; },
  reactive: function (inp, P, now, S) {
    var busy = Math.max(100, P.busy), on = P.mode.indexOf("attach") === 0;
    if (S.t === undefined) { S.t = 0; S.total = 0; S.next = busy; S.acc = 0; S.last = now; }
    var dt = Math.max(0, now - S.last); S.last = now; S.t += dt; S.acc += dt / 1000 * inp.val;
    var whole = Math.floor(S.acc); S.acc -= whole; S.total += whole;
    var out = "", g = 0;
    while (S.t >= S.next && g++ < 3) { out += (on ? S.total % 65536 : 0) + "\n"; S.next += busy; }
    return { vals: [], led: 1, pill: (on ? S.total : 0) + " counted", out: out, lines: [14, 15, 3, 4],
      readout: "Real pulses so far: " + S.total + ".  " + (on ? "The ISR counts every one, even while delay(" + busy + ") is running." : "Without the interrupt nothing counts. Even a digitalRead() in loop() would only sample once every " + busy + " ms, so at " + inp.val + " pulses/s it would miss about " + Math.max(0, Math.round(inp.val * busy / 1000 - 1)) + " per look.") };
  },
  stats: function (P) { return [{ v: "2 and 3", l: "interrupt pins on the Uno" }, { v: "~4 µs", l: "interrupt latency" }]; },
  timingTitle: "Experiment: busy loop, missed pulses",
  timingText: "Compare the two presets at 10 pulses per second. With the interrupt, every pulse is counted although loop() spends 500 ms inside delay(). Without it, nothing is counted. Modes: <code>FALLING</code> (high to low), <code>RISING</code>, <code>CHANGE</code> and <code>LOW</code>. A mechanical button also bounces, so one press can give several pulses: a button needs debouncing, which you will do in Lesson 19.4.",
  challenge: "<b>Challenge on your real Uno:</b> connect a button and press it ten times. Do you get exactly ten? If not, why? Then try RISING and CHANGE and predict the count before you test.",
  quiz: [
    { q: "Which Uno pins support attachInterrupt()?", a: ["2 and 3", "Any digital pin", "A0 and A1", "0 and 1"], c: 0, e: "The Uno has two external interrupts: INT0 on pin 2 and INT1 on pin 3." },
    { q: "Why declare a variable shared with an ISR as volatile?", a: ["So the compiler re-reads it from memory every time", "To make it faster", "To save RAM", "So it survives reset"], c: 0, e: "Otherwise the compiler may keep a copy in a register and never see the ISR's change." },
    { q: "loop() is stuck in delay(500). What happens to a pulse on pin 2 with an interrupt?", a: ["The ISR still runs and counts it", "It is lost", "It is queued until delay ends and then missed", "The Uno resets"], c: 0, e: "Interrupts are handled by hardware, even during delay()." }
  ],
  next: "Next: the rules for writing a safe interrupt routine."
};
