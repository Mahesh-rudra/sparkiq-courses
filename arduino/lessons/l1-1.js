(window.__L = window.__L || {})["1-1"] = {
  kind: "explainer",
  num: "1.1",
  level: "Level 1 · Basics",
  title: "What is a microcontroller?",
  lead: "Meet the tiny computer inside the Arduino Uno and what it can do. About 4 minutes, nothing to wire.",
  parts: "Parts needed: none. If you have an Uno, keep it next to you for the board tour.",

  sections: [
    {
      title: "A tiny computer on one chip",
      html:
        "<p>A microcontroller is a small computer on a single chip. It has a processor, memory for your program, memory for your variables, and pins that connect it to the outside world.</p>" +
        "<p>It runs one program. The program starts as soon as power is applied and keeps running until power is removed.</p>" +
        '<table class="cmp"><tr><th></th><th>Laptop</th><th>Arduino Uno chip</th></tr>' +
        "<tr><td>Speed</td><td>Billions of steps a second</td><td>16 million steps a second (16 MHz)</td></tr>" +
        "<tr><td>Memory</td><td>Gigabytes of RAM</td><td>2 KB of RAM, 32 KB for the program</td></tr>" +
        "<tr><td>Programs</td><td>Many at the same time</td><td>One, running forever</td></tr>" +
        "<tr><td>Screen and keyboard</td><td>Built in</td><td>None. It uses pins instead</td></tr></table>"
    },
    {
      title: "Sense, think, act",
      html:
        "<p>Every microcontroller project follows the same three steps. It <b>senses</b> something through an input pin, <b>thinks</b> by running your code, and <b>acts</b> through an output pin.</p>" +
        "<p>Here is a night lamp. Move the slider to change the light and watch the three steps.</p>",
      widget: "senseact"
    },
    {
      title: "Meet the Arduino Uno",
      html:
        "<p>The Uno is a board built around one microcontroller chip. It adds a USB port, a power jack and pins you can plug wires into.</p>",
      widget: "uno"
    },
    {
      title: "Where microcontrollers hide",
      html:
        "<p>You already use them every day, often without noticing:</p>" +
        "<ul><li>Washing machines and microwave ovens</li><li>TV and air conditioner remotes</li><li>Cars, which contain many of them</li><li>Fitness bands, toys and electric toothbrushes</li></ul>" +
        "<p>In this course you will program one yourself, starting with a blinking LED.</p>"
    }
  ],

  senseact: { sensor: "Light level", value: 70, threshold: 40, unit: "%" },

  quiz: [
    { q: "What are the three steps of almost every microcontroller project?",
      a: ["Plug, power, play", "Sense, think, act", "Read, write, print", "Input, memory, display"],
      c: 1, e: "The chip senses through an input pin, thinks by running your code, and acts through an output pin." },
    { q: "Which part of the Uno board is the microcontroller itself?",
      a: ["The USB port", "The power jack", "The ATmega328P chip", "The reset button"],
      c: 2, e: "The ATmega328P is the chip that holds the processor and memory. The rest of the board supports it." },
    { q: "How many programs does the Uno chip run at once?",
      a: ["One, running forever", "As many as you upload", "Two", "None until you press reset"],
      c: 0, e: "A microcontroller runs the single program stored in it, starting at power-up and continuing until power is removed." }
  ],
  next: "Next: a full tour of the Uno board and its pins."
};
