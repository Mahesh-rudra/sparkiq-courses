(window.__L = window.__L || {})["1-5"] = {
  kind: "explainer",
  num: "1.5",
  level: "Level 1 · Basics",
  title: "setup() and loop(), line by line",
  lead: "Step through the Blink sketch one line at a time and see which parts run once and which repeat. About 5 minutes.",
  parts: "You need: nothing new. This is the same Blink code you uploaded in Lesson 1.4.",
  learn: ["What setup() does and why it runs only once", "What loop() does and why it repeats forever", "How to read a sketch one line at a time"],

  sections: [
    {
      title: "Two functions, two jobs",
      html:
        "<p>Every Arduino sketch has two functions.</p>" +
        "<ul><li><b>setup()</b> runs <b>once</b>, when the board powers up or is reset. Use it for preparation, such as setting a pin as an output.</li>" +
        "<li><b>loop()</b> runs <b>again and again</b>, forever. Use it for the work your project does.</li></ul>" +
        "<p>The code between the curly braces { } belongs to that function.</p>"
    },
    {
      title: "Step through Blink",
      html: "<p>Press <b>Next step</b> to run one line at a time, or <b>Auto-run</b> to watch it go. Notice that setup() runs only at the start, while loop() keeps going round.</p>",
      widget: "stepper"
    },
    {
      title: "Predict, then check",
      html:
        "<p>Think about each question first, then tap to see the answer.</p>" +
        "<details><summary>What if you delete the first delay(1000)?</summary><p>The LED would turn on and straight away off again, thousands of times a second. It would look dimly lit and steady, because the eye cannot see such fast flicker.</p></details>" +
        "<details><summary>What if you move pinMode(13, OUTPUT) into loop()?</summary><p>It would still work, but it sets the pin again on every round for no reason. Setting things up once in setup() is cleaner.</p></details>" +
        "<details><summary>What if you write digitalwrite with a small w?</summary><p>The code will not compile. Arduino is case sensitive, so the name must be exactly digitalWrite.</p></details>"
    }
  ],

  stepper: {
    code: [
      "void setup() {",
      "  pinMode(13, OUTPUT);",
      "}",
      "",
      "void loop() {",
      "  digitalWrite(13, HIGH);",
      "  delay(1000);",
      "  digitalWrite(13, LOW);",
      "  delay(1000);",
      "}"
    ],
    setup: { l: 2, note: "<b>setup() runs once.</b> pinMode(13, OUTPUT) makes pin 13 an output so it can drive the LED. This line will not run again until the board is reset." },
    loop: [
      { l: 6, led: 1, note: "<b>loop() begins.</b> digitalWrite(13, HIGH) puts 5 volts on pin 13, so the LED turns on." },
      { l: 7, note: "delay(1000) makes the Uno wait for 1000 milliseconds, which is 1 second. The LED stays on." },
      { l: 8, led: 0, note: "digitalWrite(13, LOW) puts 0 volts on pin 13, so the LED turns off." },
      { l: 9, note: "Another 1 second wait. The LED stays off." },
      { l: 10, note: "<b>The closing brace.</b> When loop() reaches its end, the Uno starts loop() again from the first line. It never stops." }
    ]
  },

  quiz: [
    { q: "How many times does setup() run?",
      a: ["Once, at power-up or reset", "Every second", "Every time loop() ends", "Only when you press a button"],
      c: 0, e: "setup() runs one time at the start. After that only loop() repeats." },
    { q: "What happens when loop() reaches its closing brace?",
      a: ["The program stops", "It runs setup() again", "It starts loop() again from the top", "The board resets"],
      c: 2, e: "loop() repeats forever, so the Uno goes straight back to its first line." },
    { q: "Where would you normally put pinMode(13, OUTPUT)?",
      a: ["Inside loop()", "Inside setup()", "After the last brace", "Before void"],
      c: 1, e: "Pin modes only need setting once, so they belong in setup()." }
  ],
  next: "Next: digital output, pinMode and digitalWrite in detail."
};
