(window.__L = window.__L || {})["3-2"] = {
  kind: "explainer",
  num: "3.2",
  level: "Level 1 · Basics",
  title: "digitalWrite: HIGH and LOW",
  lead: "Switch a pin on and off from code, and see what goes wrong if you skip pinMode. About 4 minutes.",
  parts: "You need: nothing to wire. Pin 13 and an LED, as in Lesson 3.3, are shown on screen.",
  learn: ["How digitalWrite() turns a pin HIGH or LOW", "What HIGH and LOW mean as voltages", "What goes wrong if you forget pinMode()"],

  sections: [
    {
      title: "Setting a pin",
      html:
        "<p><b>digitalWrite(pin, value)</b> sets an output pin to one of two levels.</p>" +
        "<ul><li><b>HIGH</b> is about 5 volts. It is the same as the number 1.</li>" +
        "<li><b>LOW</b> is 0 volts. It is the same as the number 0.</li></ul>" +
        "<p>The pin keeps that level until you change it, so one HIGH keeps the LED on with no further code.</p>"
    },
    {
      title: "Try it",
      html: "<p>Press HIGH and LOW. Then tick the box to leave out pinMode and see what happens.</p>",
      widget: "dwrite"
    },
    {
      title: "Handy names",
      html:
        "<p>On the Uno, <b>LED_BUILTIN</b> means pin 13, the pin with the built-in LED. You can write <b>digitalWrite(LED_BUILTIN, HIGH)</b>, which also keeps working on boards where the LED is on a different pin.</p>" +
        "<p>Order matters. A pin must be set to OUTPUT with pinMode before digitalWrite does what you expect.</p>"
    }
  ],

  quiz: [
    { q: "What voltage does digitalWrite(13, HIGH) put on the pin of an Uno?",
      a: ["0 V", "About 3.3 V", "About 5 V", "About 12 V"],
      c: 2, e: "The Uno works at 5 volts, so HIGH is about 5 V." },
    { q: "What does digitalWrite(13, 0) do?",
      a: ["The same as LOW", "The same as HIGH", "Nothing", "An error"],
      c: 0, e: "LOW is the number 0, so both set the pin to 0 volts." },
    { q: "You call digitalWrite(13, HIGH) without pinMode. What happens?",
      a: ["The LED lights fully", "The LED glows very faintly", "The board resets", "Nothing and the pin is damaged"],
      c: 1, e: "The pin is still an input, so HIGH only enables its weak internal pull-up." }
  ],
  next: "Next: delay(), making the Uno wait."
};
