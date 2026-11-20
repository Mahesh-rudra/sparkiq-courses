(window.__L = window.__L || {})["2-1"] = {
  kind: "explainer",
  num: "2.1",
  level: "Level 1 · Basics",
  title: "Voltage, current and resistance",
  lead: "Three ideas explain almost every circuit you will build. See how they affect each other. About 5 minutes.",
  parts: "You need: nothing. Just your imagination and a slider.",

  sections: [
    {
      title: "Three ideas, one water picture",
      html:
        "<p>Think of a circuit as water flowing through pipes.</p>" +
        '<table class="cmp"><tr><th>Idea</th><th>Water picture</th><th>Unit</th></tr>' +
        "<tr><td><b>Voltage</b> (V)</td><td>The pressure pushing the water</td><td>volt (V)</td></tr>" +
        "<tr><td><b>Current</b> (I)</td><td>How much water flows each second</td><td>ampere (A), or milliampere (mA)</td></tr>" +
        "<tr><td><b>Resistance</b> (R)</td><td>How narrow the pipe is</td><td>ohm (Ω)</td></tr></table>" +
        "<p>More pressure pushes more water through. A narrower pipe lets less water through.</p>"
    },
    {
      title: "Try it",
      html: "<p>The dots show current flowing around a loop from a battery through a resistor. Change the voltage and the resistance and watch the current and the dots.</p>",
      widget: "ohm"
    },
    {
      title: "On the Arduino Uno",
      html:
        "<ul><li>A pin that is <b>HIGH</b> sits at about 5 volts. A pin that is <b>LOW</b> sits at 0 volts.</li>" +
        "<li><b>GND</b> is the 0 volt reference that every voltage is measured against.</li>" +
        "<li>Current flows from the higher voltage, through your part, to GND.</li>" +
        "<li>A small LED needs roughly 5 to 20 mA. Too much current damages it, which is why the next lessons use a resistor.</li></ul>"
    }
  ],

  ohm: { v: 5, r: 330, formula: false },

  quiz: [
    { q: "If you raise the voltage and keep the resistance the same, what happens to the current?",
      a: ["It goes up", "It goes down", "It stays the same", "It stops"],
      c: 0, e: "More voltage pushes more current through the same resistance." },
    { q: "If you raise the resistance and keep the voltage the same, what happens to the current?",
      a: ["It goes up", "It goes down", "It stays the same", "It doubles"],
      c: 1, e: "A higher resistance is a narrower pipe, so less current flows." },
    { q: "What is the unit of resistance?",
      a: ["Volt", "Ampere", "Ohm", "Watt"],
      c: 2, e: "Resistance is measured in ohms (Ω)." }
  ],
  next: "Next: Ohm's law, the formula that links all three."
};
