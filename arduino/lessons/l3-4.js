(window.__L = window.__L || {})["3-4"] = {
  num: "3.4",
  level: "Level 1 · Basics",
  title: "delay(): making the Uno wait",
  lead: "delay() pauses the program, which is useful and also a trap. See why the Uno cannot read a button while it waits. About 5 minutes.",
  parts: "Parts: the LED circuit from Lesson 3.3 and the push button from Lesson 4.3.",
  learn: ["What delay() really does", "Why the Uno cannot read a button while it waits", "Why long delays make a program feel stuck"],

  circuit: {
    type: "button",
    prewired: true,
    pin: 13,
    pinIn: 2,
    resistor: "220 Ω",
    steps: ["", "", "<b>Same circuit as Lesson 4.3.</b> Press Run, then hold the button and watch how long the LED takes to react."],
    math: "delay(1000) pauses the program for 1000 milliseconds, which is 1 second. While it waits, the Uno does nothing else. It cannot read the button, so a press is only noticed when the delay ends."
  },

  code: [
    "void setup() {  // runs once at start-up",
    "  pinMode(13, OUTPUT);  // pin 13 drives the LED",
    "  pinMode(2, INPUT_PULLUP);  // pin 2 reads the button",
    "}",
    "",
    "void loop() {  // runs again and again",
    "  if (digitalRead(2) == LOW) {  // LOW means the button is pressed",
    "    digitalWrite(13, LOW);  // pressed: keep the LED off",
    "  } else {",
    "    digitalWrite(13, HIGH);  // not pressed: blink",
    "    delay({{wait}});  // wait (the Uno does nothing else now)",
    "    digitalWrite(13, LOW);  // LED off",
    "    delay({{wait}});  // wait again",
    "  }",
    "}"
  ],
  setupLines: [2, 3],
  params: [
    { id: "wait", type: "select", label: "Delay in milliseconds", options: ["100", "500", "1000", "2000"], value: "1000" }
  ],

  channels: [{ label: "Pin 2 (button)" }, { label: "Pin 13 (LED)" }],
  graphWindow: 6000,
  idle: function (inp) { return [inp.btn ? 0 : 1, 0]; },

  reactive: function (inp, P, now, S) {
    var W = parseInt(P.wait, 10) || 1000;
    if (S.init !== 1) { S.init = 1; S.state = "check"; S.until = 0; S.led = 0; S.pressAt = null; S.prev = false; S.resp = null; }
    if (inp.btn && !S.prev) { S.pressAt = now; S.resp = null; }
    S.prev = inp.btn;
    var pin = inp.btn ? 0 : 1, lines = [], ro = "";

    if (S.state === "check") {
      if (pin === 0) {
        S.led = 0; lines = [7, 8];
        if (S.resp === null && S.pressAt !== null) S.resp = now - S.pressAt;
        ro = "Button read: pressed, LED stays off. The Uno reacted after " + Math.round(S.resp || 0) + " ms.";
      } else {
        S.led = 1; S.state = "on"; S.until = now + W; lines = [10, 11];
        ro = "Button not pressed, so the LED blinks.";
      }
    } else if (S.state === "on") {
      lines = [11]; if (now >= S.until) { S.state = "off"; S.led = 0; S.until = now + W; lines = [12, 13]; }
    } else if (S.state === "off") {
      lines = [13]; if (now >= S.until) { S.state = "check"; }
    }
    if (S.state === "on" || S.state === "off") {
      ro = inp.btn ? "Button held, but the Uno is stuck in delay() and cannot see it yet." : "In delay(): the Uno is waiting and not reading the button.";
    }
    return { vals: [pin, S.led], led: S.led, lines: lines, readout: ro };
  },

  timingTitle: "Experiment: the delay length",
  timingText: "Press Run, then hold the button while the LED is mid-blink. Try the delay at 100, 500, 1000 and 2000 and see how long the Uno takes to notice. The longer the delay, the longer the Uno is deaf to the button. Lesson 4.5 shows a way around this with millis().",
  challenge: "<b>Challenge on your real Uno:</b> make the LED blink with a 300 ms delay, and measure how long it takes to react to a button held at a random moment. It will vary between 0 and 600 ms.",

  quiz: [
    { q: "What does delay(1000) do?",
      a: ["Waits 1000 seconds", "Waits 1000 milliseconds, or 1 second", "Repeats the code 1000 times", "Sets pin 1000"],
      c: 1, e: "delay takes a time in milliseconds. 1000 ms is 1 second." },
    { q: "While the Uno is inside delay(), what does it do?",
      a: ["Reads buttons faster", "Nothing else, it just waits", "Runs setup() again", "Turns the LED off"],
      c: 1, e: "delay() blocks the program, so nothing else runs until it finishes." },
    { q: "Why is a long delay a problem when you also want to read a button?",
      a: ["It uses too much power", "The press is only noticed after the delay ends", "The button breaks", "The LED gets brighter"],
      c: 1, e: "A press during the delay is not seen until the program reaches digitalRead again." }
  ],
  next: "Next: blink patterns and SOS."
};
