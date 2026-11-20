(window.__L = window.__L || {})["2-3"] = {
  kind: "explainer",
  num: "2.3",
  level: "Level 1 · Basics",
  title: "LED and resistor value",
  lead: "Work out the right resistor for any LED and supply, and learn to read its colour bands. About 6 minutes.",
  parts: "You need: nothing. If you have resistors, keep a few next to you to read their bands.",
  learn: ["How to choose a resistor for an LED", "How to read the colour bands on a resistor", "Why an LED without a resistor can burn out"],

  sections: [
    {
      title: "Why an LED needs a resistor",
      html:
        "<p>An LED drops a fixed voltage across itself when it lights, called its <b>forward voltage</b>. A red LED drops about 2 volts. Above that voltage the current rises very steeply, so an LED with no resistor draws far too much current and burns out.</p>" +
        "<p>The resistor takes up the leftover voltage and sets the current. The leftover voltage is the supply minus the LED voltage, so:</p>" +
        '<div class="formula" style="font-size:18px">R = (supply − LED voltage) ÷ current</div>'
    },
    {
      title: "Resistor calculator",
      html: "<p>Choose a supply, an LED colour and the current you want. The calculator gives the exact value and the nearest standard resistor that keeps the current at or below your target.</p>",
      widget: "ledcalc"
    },
    {
      title: "What to use with the Uno",
      html:
        "<p>With a 5 V pin and a red LED, <b>220 Ω</b> gives about 14 mA, which is bright. <b>330 Ω</b> gives about 9 mA, which is a little softer and gentler on the pin. Both are common choices.</p>" +
        "<p>Resistors show their value in colour bands. Tap to see three you will use often.</p>" +
        "<details><summary>220 Ω</summary><p>Red, red, brown, then gold for tolerance.</p></details>" +
        "<details><summary>330 Ω</summary><p>Orange, orange, brown, then gold.</p></details>" +
        "<details><summary>1 kΩ</summary><p>Brown, black, red, then gold.</p></details>" +
        "<p>The first two bands are digits and the third is how many zeros follow.</p>"
    }
  ],

  quiz: [
    { q: "Which formula gives an LED's series resistor?",
      a: ["R = supply × current", "R = (supply − LED voltage) ÷ current", "R = LED voltage ÷ supply", "R = current ÷ supply"],
      c: 1, e: "The resistor must drop the leftover voltage, and it carries the LED current." },
    { q: "A 5 V supply, a red LED (2 V) and 10 mA wanted. What is the ideal resistor?",
      a: ["30 Ω", "200 Ω", "300 Ω", "500 Ω"],
      c: 2, e: "R = (5 − 2) ÷ 0.010 = 300 Ω. The nearest standard value above it is 330 Ω." },
    { q: "What happens if the resistor is much too small?",
      a: ["The LED gets dimmer", "Too much current flows and the LED or pin can burn out", "Nothing changes", "The LED turns blue"],
      c: 1, e: "A small resistor lets a large current through, which can destroy the LED or the Uno pin." },
    { q: "Which bands show a 220 Ω resistor?",
      a: ["Red, red, brown", "Brown, black, red", "Orange, orange, brown", "Red, red, red"],
      c: 0, e: "Red is 2, red is 2, brown means one zero, so 22 followed by 0 is 220." }
  ],
  next: "Next: using a breadboard."
};
