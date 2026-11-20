(window.__L = window.__L || {})["16-1"] = {
  num: "16.1", level: "Level 3 · Advanced",
  title: "ADC reference voltage and resolution",
  lead: "Get four times more detail from a small sensor signal by changing the ADC's reference. About 12 minutes.",
  parts: "Parts: Arduino Uno, an LM35 temperature sensor (10 mV per °C), jumper wires.",
  circuit: {
    type: "disp", kind: "sensor", dev: "LM35", groups: 2, pinLabel: "A0 reads the LM35",
    rows: [
      { u: "A0", d: "Vout (middle pin)", g: 0 },
      { u: "5V", d: "+Vs (left pin)", g: 1, t: "p" }, { u: "GND", d: "GND (right pin)", g: 1, t: "g" }
    ],
    steps: [
      "<b>Step 1 of 2.</b> With the flat face towards you, connect the LM35's <b>middle pin</b> to <b>A0</b>.",
      "<b>Step 2 of 2.</b> Connect the <b>left pin</b> to <b>5V</b> and the <b>right pin</b> to <b>GND</b>.",
      "<b>Circuit complete.</b> Press Run, move the temperature slider, and switch the reference."
    ],
    math: "The ADC turns 0 V up to its <b>reference voltage</b> into 0 to 1023. With the default 5 V reference, one step is 5 ÷ 1023 = 4.9 mV, which is 0.49 °C on an LM35. The Uno also has a 1.1 V internal reference: one step is 1.1 ÷ 1023 = 1.07 mV, which is 0.11 °C, but anything above 1.1 V (110 °C) is clipped. The number in your maths must match the reference you chose."
  },
  code: [
    "void setup() {",
    "  Serial.begin(9600);",
    "  analogReference({{ref}});",
    "}",
    "",
    "void loop() {",
    "  int raw = analogRead(A0);",
    "  float volts = raw * {{vref}} / 1023.0;",
    "  float tempC = volts * 100.0;",
    "  Serial.println(tempC);",
    "  delay(500);",
    "}"
  ],
  setupLines: [1, 2, 3, 4],
  params: [
    { id: "ref", type: "select", label: "analogReference()", options: ["DEFAULT", "INTERNAL"], value: "DEFAULT" },
    { id: "vref", type: "select", label: "Reference used in the maths (V)", options: ["5.0", "1.1"], value: "5.0" }
  ],
  presets: [{ label: "Default 5 V", values: { ref: "DEFAULT", vref: "5.0" } }, { label: "Internal 1.1 V", values: { ref: "INTERNAL", vref: "1.1" } }, { label: "Mismatch (bug)", values: { ref: "INTERNAL", vref: "5.0" } }],
  input: { label: "Real temperature", min: 0, max: 50, value: 25, unit: " °C" },
  channels: [{ label: "Reported °C", top: "100", bot: "0", max: 100 }],
  graphWindow: 6000,
  idle: function () { return [0]; },
  reactive: function (inp, P, now, S) {
    var actual = P.ref === "INTERNAL" ? 1.1 : 5.0, vm = parseFloat(P.vref) || 5, v = inp.val / 100;
    var b = Math.floor(now / 100), x = Math.sin(b * 12.9898) * 43758.5453; x = x - Math.floor(x);
    var raw = Math.max(0, Math.min(1023, Math.floor(v / actual * 1023 + 0.5 + (x - 0.5) * 1.2)));
    var volts = raw * vm / 1023, t = volts * 100, step = actual / 1023 * 100, ok = Math.abs(actual - vm) < 0.01;
    return { vals: [Math.min(100, t)], led: 1, pill: t.toFixed(1) + " °C  (raw " + raw + ")", lines: [7, 8, 9, 10, 11],
      readout: "Reference " + actual + " V: one ADC step = " + step.toFixed(2) + " °C.  raw = " + raw + "  →  " + raw + " × " + vm + " ÷ 1023 = " + volts.toFixed(3) + " V  →  " + t.toFixed(1) + " °C." + (ok ? "" : "  The maths uses " + vm + " V but the ADC uses " + actual + " V, so the answer is wrong by a factor of " + (vm / actual).toFixed(2) + ".") };
  },
  stats: function (P) { var a = P.ref === "INTERNAL" ? 1.1 : 5.0; return [{ v: (a / 1023 * 100).toFixed(2) + " °C", l: "per ADC step" }, { v: a === 1.1 ? "110 °C" : "500 °C", l: "full-scale reading" }]; },
  timingTitle: "Experiment: resolution against range",
  timingText: "At 25 °C the LM35 gives only 0.25 V. With the 5 V reference that is raw 51, and the reading moves in 0.49 °C steps. Switch to INTERNAL and the same 0.25 V is raw 232, in 0.11 °C steps: four and a half times finer. Now try the mismatch preset: the ADC uses 1.1 V but the maths still divides by 5 V, and the result is out by a factor of 4.5. Always change both together. After changing the reference, the first reading can be inaccurate, so discard it.",
  challenge: "<b>Challenge on your real Uno:</b> upload both versions and warm the sensor with a finger. Which one shows smaller changes? Why must you never connect an external voltage to the AREF pin while using analogReference(INTERNAL)?",
  quiz: [
    { q: "What is the size of one ADC step with the 1.1 V reference?", a: ["About 1.07 mV", "About 4.9 mV", "About 11 mV", "About 0.1 V"], c: 0, e: "1.1 V ÷ 1023 is about 1.07 mV." },
    { q: "With the 1.1 V reference, what happens to a 2 V input?", a: ["It reads 1023, because it is clipped", "It reads 2000", "It damages the Uno at once", "It reads 0"], c: 0, e: "Anything at or above the reference reads full scale. Never exceed 5 V on a pin, though." },
    { q: "You switch to INTERNAL but keep dividing by 5.0. What happens?", a: ["The result is about 4.5 times too large", "Nothing: the ADC adjusts", "The result is 4.5 times too small", "analogRead fails"], c: 0, e: "The ADC counts against 1.1 V, so 5.0 ÷ 1.1 is about 4.5." }
  ],
  next: "Next: smoothing noisy readings with a moving average."
};
