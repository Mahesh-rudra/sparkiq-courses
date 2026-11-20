(window.__L = window.__L || {})["2-4"] = {
  kind: "explainer",
  num: "2.4",
  level: "Level 1 · Basics",
  title: "Breadboard connections",
  lead: "Learn which holes are connected inside a breadboard so your circuits work the first time. About 5 minutes.",
  parts: "You need: nothing, but a breadboard in front of you makes it easier.",

  sections: [
    {
      title: "What is hidden inside",
      html:
        "<p>A breadboard lets you build circuits without soldering. Under the plastic, metal strips link the holes together.</p>" +
        "<ul><li>In the main area, the <b>five holes in one half of a column</b> are linked.</li>" +
        "<li>The <b>centre gap</b> separates the top half from the bottom half. They are not connected.</li>" +
        "<li>The <b>power rails</b> along the edges are linked along their whole length. Use one for 5 V and one for GND.</li></ul>" +
        "<p>Some larger boards split the rails in the middle, so check yours with a continuity test.</p>"
    },
    {
      title: "Test the connections",
      html: "<p>Tap a hole to light up everything connected to it. Tap a second hole to find out whether the two are connected.</p>",
      widget: "bboard"
    },
    {
      title: "Predict, then check",
      html:
        "<details><summary>Are A5 and E5 connected?</summary><p>Yes. They are in the same column and the same half.</p></details>" +
        "<details><summary>Are E5 and F5 connected?</summary><p>No. They are on opposite sides of the centre gap.</p></details>" +
        "<details><summary>Are A5 and A6 connected?</summary><p>No. Different columns are separate strips.</p></details>" +
        "<details><summary>Where do you place an LED?</summary><p>Put its two legs in two different columns, so each leg has its own strip to connect a wire or resistor to. If both legs share a column, the LED is shorted out.</p></details>"
    },
    {
      title: "Good habits",
      html:
        "<ul><li>Use a red wire for 5 V and a black wire for GND, and keep them the same on every project.</li>" +
        "<li>Connect the rails to the Uno first, and check the polarity before you power the board.</li>" +
        "<li>Push parts in fully. A loose part is the most common reason a circuit does not work.</li>" +
        "<li>Unplug the Uno before changing the wiring.</li></ul>"
    }
  ],

  quiz: [
    { q: "Which holes are connected in the main area of a breadboard?",
      a: ["A whole row of the board", "The five holes in one half of a column", "Every hole in the board", "Only the rail holes"],
      c: 1, e: "Each half column of five holes shares a metal strip." },
    { q: "What does the centre gap do?",
      a: ["Connects the two halves", "Separates the top half from the bottom half", "Carries power", "Holds the LED"],
      c: 1, e: "The gap isolates the two halves, which is how chips can straddle it without shorting their pins." },
    { q: "Why must an LED's two legs go in different columns?",
      a: ["It looks tidier", "Legs in the same column would be shorted together", "The LED gets hotter", "The column would break"],
      c: 1, e: "Legs in the same column are linked by the strip, so current would skip the LED entirely." }
  ],
  next: "Next: digital output, pinMode and digitalWrite in detail."
};
