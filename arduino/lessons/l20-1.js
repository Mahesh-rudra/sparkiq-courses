(window.__L = window.__L || {})["20-1"] = {
  num: "20.1", level: "Level 3 · Advanced",
  title: "Power options and current limits",
  lead: "Pick a supply for your project, and work out how hot the Uno's own regulator gets. About 12 minutes.",
  parts: "Parts: Arduino Uno. A USB cable, a 9 V battery or a 12 V adapter, depending on the option.",
  learn: ["How to choose a power supply", "How much heat the Uno's regulator makes", "Why a high input voltage wastes energy"],
  circuit: {
    type: "usb", pinLabel: "Supply input",
    steps: [
      "<b>Step 1 of 1.</b> Choose how the Uno is powered: the <b>USB cable</b>, or 7 to 12 V into the <b>barrel jack or VIN pin</b>.",
      "<b>Powered.</b> Press Run, pick the supply and set the load current your project draws from the 5 V pin."
    ],
    math: "A USB port gives 5 V and the Uno's fuse limits it to about <b>500 mA</b>. On the barrel jack and VIN, a <b>linear regulator</b> drops the extra voltage and turns it into heat: <b>P = (Vin − 5 V) × I</b>. With a typical thermal resistance of around 50 °C/W on the board, every watt raises the regulator by about 50 °C, so more than roughly 1 W of heat is a problem. The values here are typical; check your board's datasheet."
  },
  code: [
    "const float VIN = {{vin}};  // input voltage",
    "const float LOAD_mA = 300;  // current the load draws (mA)",
    "",
    "void setup() {  // runs once at start-up",
    "  Serial.begin(9600);",
    "}",
    "",
    "void loop() {  // runs again and again",
    "  float watts = (VIN - 5.0) * LOAD_mA / 1000.0;  // the regulator burns (Vin - 5 V) x current as heat",
    "  Serial.println(watts);  // print the heat in watts",
    "  delay(1000);  // once per second",
    "}"
  ],
  setupLines: [4, 5, 6],
  params: [{ id: "vin", type: "select", label: "Supply voltage into VIN (V)", options: ["5.0", "7.4", "9.0", "12.0"], value: "9.0" }],
  presets: [{ label: "USB (5 V)", values: { vin: "5.0" } }, { label: "2S Li-ion 7.4 V", values: { vin: "7.4" } }, { label: "9 V battery", values: { vin: "9.0" } }, { label: "12 V adapter", values: { vin: "12.0" } }],
  input: { label: "Load current from the 5 V pin", min: 0, max: 800, value: 300, unit: " mA" },
  monitor: {},
  noGraph: true,
  channels: [],
  idle: function () { return []; },
  reactive: function (inp, P, now, S) {
    var v = parseFloat(P.vin), I = inp.val, usb = v <= 5.0, W = usb ? 0 : Math.max(0, (v - 5) * I / 1000), rise = W * 50, k = Math.floor(now / 1000);
    if (S.k === undefined) S.k = k - 1; var out = "";
    if (S.k !== k) { S.k = k; out = W.toFixed(2) + "\n"; }
    var warn = usb ? (I > 500 ? "Over the USB 500 mA limit: the supply will droop or the fuse will trip." : "Within the 500 mA USB limit.") : (rise > 60 ? "Regulator about " + Math.round(25 + rise) + " °C: too hot to touch. Use a lower input voltage or a buck converter." : "Regulator about " + Math.round(25 + rise) + " °C: acceptable.");
    return { vals: [], led: 1, pill: usb ? "USB" : W.toFixed(2) + " W as heat", out: out, lines: [9, 10, 11], readout: usb ? "USB comes straight in at 5 V, so there is no regulator loss.  " + warn : "(" + v + " − 5) × " + I + " mA = " + W.toFixed(2) + " W lost in the regulator.  " + warn };
  },
  stats: function (P) { var v = parseFloat(P.vin); return [{ v: v <= 5 ? "500 mA" : "~1 A rating", l: v <= 5 ? "USB supply limit" : "regulator rating (heat limits it sooner)" }, { v: v <= 5 ? "100 %" : (5 / v * 100).toFixed(0) + " %", l: "linear regulator efficiency" }]; },
  timingTitle: "Experiment: voltage in, heat out",
  timingText: "At 300 mA, a 9 V input wastes 1.2 W and the regulator reaches about 85 °C; at 7.4 V it wastes 0.72 W; on 12 V it wastes 2.1 W. The extra 'burnt' power is the voltage difference times the same current. Moving the load past 500 mA on USB gives a warning too. A motor or a servo should never be fed from the 5 V pin: give it its own supply and join the grounds.",
  challenge: "<b>Challenge on your real Uno:</b> power the Uno from 12 V with an LED strip on the 5 V pin and put a finger near the regulator after a minute. What do you feel, and which supply voltage would reduce it? Check the largest current your board allows.",
  quiz: [
    { q: "Vin = 12 V, load 200 mA from 5 V. How much power does the linear regulator waste?", a: ["1.4 W", "2.4 W", "0.2 W", "7 W"], c: 0, e: "(12 − 5) × 0.2 A = 1.4 W." },
    { q: "Which part of the current limit applies on USB?", a: ["About 500 mA", "About 5 A", "100 mA", "No limit"], c: 0, e: "A standard USB port is limited to about 500 mA, and the Uno has a resettable fuse." },
    { q: "Why feed motors from their own supply?", a: ["They draw large and noisy currents that can reset the Uno", "They need a lower voltage", "The 5 V pin has no ground", "It is cheaper"], c: 0, e: "Motor surges can drag the Uno's supply down and cause resets." }
  ],
  next: "Next: linear regulators against buck converters."
};
