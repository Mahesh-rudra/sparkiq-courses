(window.__L = window.__L || {})["2-2"] = {
  kind: "explainer",
  num: "2.2",
  level: "Level 1 · Basics",
  title: "Ohm's law",
  lead: "One formula links voltage, current and resistance. Learn it, see it work, then practise. About 6 minutes.",
  parts: "You need: nothing, but a pencil and paper help for the practice.",
  learn: ["Ohm's law: V = I x R", "How to find any one of the three from the other two", "How to check your answer makes sense"],

  sections: [
    {
      title: "The formula",
      html:
        '<div class="formula">V = I × R</div>' +
        "<p>Rearranged, it gives the other two:</p>" +
        '<div class="formula" style="font-size:17px">I = V ÷ R &nbsp;&nbsp;&nbsp; R = V ÷ I</div>' +
        "<p><b>Watch the units.</b> The formula uses volts, amperes and ohms. Change milliamps to amperes first by dividing by 1000. So 20 mA is 0.020 A.</p>"
    },
    {
      title: "See it work",
      html: "<p>Change the sliders. The line under the picture shows Ohm's law with your numbers.</p>",
      widget: "ohm"
    },
    {
      title: "A worked example",
      html:
        "<p>A 220 Ω resistor has 5 V across it. How much current flows?</p>" +
        "<p>I = V ÷ R = 5 ÷ 220 = 0.0227 A, which is <b>22.7 mA</b>.</p>" +
        "<p>The resistor also turns power into heat: P = V × I = 5 × 0.0227 = 0.114 W, or about 114 mW. A 1/4 watt resistor (250 mW) handles that easily.</p>"
    },
    {
      title: "Practice",
      html: "<p>Type your answer and press Check. You get a new question each time.</p>",
      widget: "drill"
    }
  ],

  ohm: { v: 5, r: 220, formula: true },

  quiz: [
    { q: "A 100 Ω resistor has 5 V across it. What current flows?",
      a: ["0.5 mA", "20 mA", "50 mA", "500 mA"],
      c: 2, e: "I = 5 ÷ 100 = 0.05 A, which is 50 mA." },
    { q: "Which formula gives resistance?",
      a: ["R = V × I", "R = V ÷ I", "R = I ÷ V", "R = V + I"],
      c: 1, e: "Rearranging V = I × R gives R = V ÷ I." },
    { q: "Why convert milliamps to amperes before using the formula?",
      a: ["It looks neater", "The formula expects amperes, and 1 mA is 0.001 A", "Milliamps are not real units", "Resistors need it"],
      c: 1, e: "Ohm's law works in volts, amperes and ohms, so milliamps must be divided by 1000." }
  ],
  next: "Next: choosing the right resistor for an LED."
};
