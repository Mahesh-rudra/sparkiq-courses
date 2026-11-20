(window.__L = window.__L || {})["12-1"] = {
  num: "12.1", level: "Level 2 · Intermediate",
  title: "Temperature with the TMP36",
  lead: "Turn a voltage into degrees Celsius, and fix a sensor that reads a little off. About 10 minutes.",
  parts: "Parts: Arduino Uno, one TMP36 temperature sensor, jumper wires.",
  circuit: {
    type: "disp", kind: "sensor", dev: "TMP36", groups: 2, pinLabel: "A0 reads the TMP36 output",
    rows: [
      { u: "A0", d: "Vout (middle pin)", g: 0 },
      { u: "5V", d: "+Vs (left pin)", g: 1, t: "p" }, { u: "GND", d: "GND (right pin)", g: 1, t: "g" }
    ],
    steps: [
      "<b>Step 1 of 2.</b> Look at the flat face of the TMP36. Connect its <b>middle pin</b> to <b>A0</b>.",
      "<b>Step 2 of 2.</b> Connect the <b>left pin</b> to <b>5V</b> and the <b>right pin</b> to <b>GND</b>.",
      "<b>Circuit complete.</b> Press Run and move the temperature slider."
    ],
    math: "The TMP36 outputs 0.5 V at 0 °C and adds 10 mV for every degree. So <b>°C = (volts − 0.5) × 100</b>. At 25 °C the output is 0.75 V, and the ADC reads about 153. Plugging it in backwards can make it very hot, so check the flat face."
  },
  code: [
    "const int SENSOR = A0;",
    "",
    "void setup() {",
    "  Serial.begin(9600);",
    "}",
    "",
    "void loop() {",
    "  int raw = analogRead(SENSOR);",
    "  float volts = raw * 5.0 / 1023.0;",
    "  float tempC = (volts - 0.5) * 100.0 + {{off}};",
    "  Serial.print(tempC);",
    "  Serial.println(\" C\");",
    "  delay(500);",
    "}"
  ],
  setupLines: [4, 5],
  params: [{ id: "off", type: "number", label: "Calibration offset in °C", min: -5, max: 5, step: 0.5, value: 0 }],
  presets: [{ label: "No offset", values: { off: 0 } }, { label: "Sensor reads 2 °C low (+2)", values: { off: 2 } }, { label: "Sensor reads 3 °C high (−3)", values: { off: -3 } }],
  input: { label: "Real temperature", min: 0, max: 50, value: 25, unit: " °C" },
  channels: [{ label: "Temperature °C", top: "50", bot: "0", max: 50 }],
  graphWindow: 6000,
  idle: function () { return [0]; },
  reactive: function (inp, P, now, S) {
    var v = 0.5 + inp.val / 100, b = Math.floor(now / 100), x = Math.sin(b * 12.9898) * 43758.5453; x = x - Math.floor(x);
    var raw = Math.max(0, Math.min(1023, UNO.adcOf(v) + Math.round((x - 0.5) * 3)));
    var volts = raw * 5 / 1023, t = (volts - 0.5) * 100 + P.off;
    return { vals: [Math.max(0, Math.min(50, t))], led: 1, pill: t.toFixed(1) + " °C", lines: [8, 9, 10, 11, 12, 13],
      readout: "raw = " + raw + "  →  " + volts.toFixed(3) + " V  →  (" + volts.toFixed(3) + " − 0.5) × 100 + " + P.off + " = " + t.toFixed(1) + " °C" };
  },
  stats: function () { return [{ v: "10 mV", l: "per °C" }, { v: "0.5 V", l: "at 0 °C" }, { v: "±1 °C", l: "typical accuracy" }]; },
  timingTitle: "Experiment: calibrate",
  timingText: "Set the real temperature to 25 °C, then change the offset. A cheap sensor is often a degree or two off, so you compare it with a trusted thermometer and add the difference as an offset. Notice the last digit flickers: that is ADC noise, and 1 ADC step is about 0.5 °C, so the display cannot be more precise than that.",
  challenge: "<b>Challenge on your real Uno:</b> hold the TMP36 between two fingers. How fast does the reading rise, and where does it settle? Typical skin reading is around 30 to 34 °C.",
  quiz: [
    { q: "A TMP36 outputs 0.75 V. What is the temperature?", a: ["25 °C", "75 °C", "7.5 °C", "0.75 °C"], c: 0, e: "(0.75 − 0.5) × 100 = 25 °C." },
    { q: "Why does the reading change by about 0.5 °C per ADC step?", a: ["One ADC step is about 4.9 mV, and the sensor gives 10 mV per °C", "The sensor is broken", "The Uno rounds up", "Serial adds it"], c: 0, e: "4.9 mV ÷ 10 mV per °C is roughly 0.49 °C." },
    { q: "The sensor reads 2 °C low compared with a good thermometer. What is the simplest fix?", a: ["Add 2 to the result in code", "Change the resistor", "Use delay()", "Swap A0 for A1"], c: 0, e: "A fixed offset is the simplest calibration." }
  ],
  next: "Next: a thermostat that switches a fan on and off."
};
