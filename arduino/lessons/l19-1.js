(window.__L = window.__L || {})["19-1"] = {
  num: "19.1", level: "Level 3 · Advanced",
  title: "State machines",
  lead: "Structure a sequence of steps as named states, so the code always knows what it is doing. About 12 minutes.",
  parts: "Parts: Arduino Uno and USB cable.",
  learn: ["What a state machine is", "How named states make the code clear", "How to move from state to state with timing"],
  circuit: {
    type: "usb", pinLabel: "USB serial link",
    steps: [
      "<b>Step 1 of 1.</b> Plug the <b>USB cable</b> into the Uno.",
      "<b>Connected.</b> Press Run and change the wash time."
    ],
    math: "A <b>state machine</b> has a fixed list of <b>states</b>, a variable that holds the current one, and rules for moving to the next. Instead of a long chain of <code>delay()</code> calls, each pass of <code>loop()</code> checks the current state and asks: has its time run out? If so, switch. That keeps loop() fast, makes the sequence easy to extend, and lets you add events such as a button that jumps straight to a state."
  },
  code: [
    "enum State { FILL, WASH, DRAIN, DONE };  // the list of states the machine can be in",
    "State state = FILL;  // the current state",
    "unsigned long entered = 0;  // when we entered this state",
    "const unsigned long WASH_MS = {{wash}};  // how long the WASH state lasts",
    "",
    "void go(State s) {  // go(s) switches to a new state",
    "  state = s;  // remember the new state",
    "  entered = millis();  // restart the state's timer",
    "  Serial.println(s);  // print the state number",
    "}",
    "",
    "void setup() {  // runs once at start-up",
    "  Serial.begin(9600);",
    "  go(FILL);  // start in FILL",
    "}",
    "",
    "void loop() {  // runs again and again",
    "  unsigned long t = millis() - entered;  // time spent in this state so far",
    "  if (state == FILL && t > 1500) go(WASH);  // FILL for 1.5 s, then WASH",
    "  else if (state == WASH && t > WASH_MS) go(DRAIN);  // WASH lasts WASH_MS, then DRAIN",
    "  else if (state == DRAIN && t > 1500) go(DONE);  // DRAIN for 1.5 s, then DONE",
    "  else if (state == DONE && t > 1000) go(FILL);  // DONE for 1 s, then start again",
    "}"
  ],
  setupLines: [13, 14, 15],
  params: [{ id: "wash", type: "select", label: "WASH_MS", options: ["2000", "4000", "8000"], value: "4000" }],
  presets: [{ label: "Short wash", values: { wash: "2000" } }, { label: "Normal", values: { wash: "4000" } }, { label: "Long wash", values: { wash: "8000" } }],
  monitor: {},
  noGraph: true,
  channels: [],
  idle: function () { return []; },
  reactive: function (inp, P, now, S) {
    var W = parseInt(P.wash, 10), dur = [1500, W, 1500, 1000], names = ["FILL", "WASH", "DRAIN", "DONE"];
    if (S.st === undefined) { S.st = 0; S.t0 = 0; S.sent = false; }
    var out = "", g = 0;
    if (!S.sent) { out += "0\n"; S.sent = true; }
    while (now - S.t0 > dur[S.st] && g++ < 3) { S.t0 += dur[S.st]; S.st = (S.st + 1) % 4; out += S.st + "\n"; }
    var lines = [[19, 7, 8, 9], [20, 7, 8, 9], [21, 7, 8, 9], [22, 7, 8, 9]][S.st];
    var cyc = 1500 + W + 1500 + 1000;
    return { vals: [], led: 1, pill: names[S.st], out: out, lines: now - S.t0 < 100 ? lines : [18, 19, 20, 21, 22],
      readout: "State " + S.st + " = " + names[S.st] + ", time in state " + Math.round(now - S.t0) + " ms of " + dur[S.st] + " ms.  The printed number is the enum value (FILL 0, WASH 1, DRAIN 2, DONE 3).  A full cycle takes " + (cyc / 1000).toFixed(1) + " s, and loop() never blocks, so a button could be checked on every pass." };
  },
  stats: function (P) { return [{ v: "4", l: "states" }, { v: ((1500 + parseInt(P.wash, 10) + 2500) / 1000).toFixed(1) + " s", l: "one full cycle" }]; },
  timingTitle: "Experiment: change one number",
  timingText: "Change WASH_MS and only the WASH state is longer: the other steps and all the logic stay the same. That is the benefit of a state machine. Notice that the code uses no <code>delay()</code> at all, so adding an emergency-stop button means one extra line: <code>if (digitalRead(2) == LOW) go(DRAIN);</code>. With delays, the button would be ignored for seconds.",
  challenge: "<b>Challenge on your real Uno:</b> add a fifth state, SPIN, between DRAIN and DONE. Which lines change? Then print the state name with a <code>switch</code> instead of the number.",
  quiz: [
    { q: "What does a state machine always keep in a variable?", a: ["The current state", "The next ten states", "A list of delays", "The last button press"], c: 0, e: "The current state is the single source of truth for what the program is doing." },
    { q: "Why is a state machine better than a chain of delay() calls?", a: ["loop() stays free to react to other events", "It uses less flash", "It is shorter", "delay() does not work in loop"], c: 0, e: "Delays block everything else. A state machine only checks the time." },
    { q: "What does `entered = millis();` record?", a: ["When the current state began", "The total run time", "The previous state", "The wash time"], c: 0, e: "Elapsed time in the state is millis() − entered." }
  ],
  next: "Next: run several tasks at once without delay()."
};
