(window.__L = window.__L || {})["3-1"] = {
  kind: "explainer",
  num: "3.1",
  level: "Level 1 · Basics",
  title: "pinMode: input or output?",
  lead: "Every pin must be told whether it sends or listens. Learn the three modes and when to use each. About 5 minutes.",
  parts: "You need: nothing to wire. Just follow along.",
  learn: ["The three pin modes: OUTPUT, INPUT and INPUT_PULLUP", "When to use each one", "How to set a pin up with pinMode()"],

  sections: [
    {
      title: "Pins have a direction",
      html:
        "<p>A digital pin can either <b>send</b> a voltage out or <b>listen</b> for one coming in. You tell the Uno which one with <b>pinMode(pin, mode)</b>.</p>" +
        "<p>You normally write it once in <b>setup()</b>, because the direction rarely changes.</p>"
    },
    {
      title: "Try the three modes",
      html: "<p>Tap a mode and watch the arrow and the part on the pin change.</p>",
      widget: "pinmode"
    },
    {
      title: "Which mode for which part?",
      html:
        '<table class="cmp"><tr><th>Part</th><th>Mode</th></tr>' +
        "<tr><td>LED, buzzer</td><td>OUTPUT</td></tr>" +
        "<tr><td>Push button wired from the pin to GND</td><td>INPUT_PULLUP</td></tr>" +
        "<tr><td>Sensor module with its own digital output</td><td>INPUT</td></tr></table>" +
        "<p>Pins start as INPUT when the board powers up, so any pin you want to drive must be set to OUTPUT first.</p>"
    },
    {
      title: "Predict, then check",
      html:
        "<details><summary>What if you write digitalWrite(13, HIGH) but forget pinMode?</summary><p>The pin stays an input. HIGH only switches on its internal pull-up, so the LED glows very faintly. The next lesson lets you try it.</p></details>" +
        "<details><summary>Can you change a pin's mode while the program runs?</summary><p>Yes. pinMode can be called again at any time, although most projects set each pin once.</p></details>"
    }
  ],

  quiz: [
    { q: "Which mode makes a pin send voltage out?",
      a: ["INPUT", "OUTPUT", "INPUT_PULLUP", "ANALOG"],
      c: 1, e: "OUTPUT lets the pin drive a part, such as an LED." },
    { q: "A button is wired between a pin and GND, with no extra resistor. Which mode should the pin use?",
      a: ["OUTPUT", "INPUT", "INPUT_PULLUP", "None, it works by default"],
      c: 2, e: "INPUT_PULLUP uses the built-in resistor to hold the pin HIGH until the button connects it to GND." },
    { q: "Where does pinMode normally go?",
      a: ["Inside loop()", "Inside setup()", "After the last brace", "Inside delay()"],
      c: 1, e: "Directions are set once at the start, so setup() is the usual place." }
  ],
  next: "Next: digitalWrite, setting a pin HIGH or LOW."
};
