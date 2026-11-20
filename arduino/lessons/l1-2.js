(function () {
  function P(name, d, tags) { return { name: name, d: d, tags: tags || [] }; }
  var pins = [
    P("D0", "Digital pin 0, also Serial RX. It is shared with the USB connection, so avoid it for your own parts while uploading and printing.", ["comm"]),
    P("D1", "Digital pin 1, also Serial TX. It is shared with the USB connection, so avoid it for your own parts while uploading and printing.", ["comm"]),
    P("D2", "Digital input or output. Also an external interrupt pin (INT0), which can react instantly to a change.", ["irq"]),
    P("D3", "Digital input or output. Also PWM and an external interrupt pin (INT1).", ["pwm", "irq"]),
    P("D4", "A general digital input or output.", []),
    P("D5", "Digital input or output with PWM.", ["pwm"]),
    P("D6", "Digital input or output with PWM.", ["pwm"]),
    P("D7", "A general digital input or output.", []),
    P("D8", "A general digital input or output.", []),
    P("D9", "Digital input or output with PWM.", ["pwm"]),
    P("D10", "Digital input or output with PWM. Also SPI chip select (SS).", ["pwm", "comm"]),
    P("D11", "Digital input or output with PWM. Also SPI data out (MOSI).", ["pwm", "comm"]),
    P("D12", "Digital input or output. Also SPI data in (MISO).", ["comm"]),
    P("D13", "Digital input or output. Also SPI clock (SCK). The built-in L LED is connected to this pin.", ["comm"]),
    P("A0", "Analog input that reads 0 to 5 V as 0 to 1023. It can also be used as digital pin 14.", ["analog"]),
    P("A1", "Analog input that reads 0 to 5 V as 0 to 1023. It can also be used as digital pin 15.", ["analog"]),
    P("A2", "Analog input that reads 0 to 5 V as 0 to 1023. It can also be used as digital pin 16.", ["analog"]),
    P("A3", "Analog input that reads 0 to 5 V as 0 to 1023. It can also be used as digital pin 17.", ["analog"]),
    P("A4", "Analog input. Also the I2C data line (SDA), and usable as digital pin 18.", ["analog", "comm"]),
    P("A5", "Analog input. Also the I2C clock line (SCL), and usable as digital pin 19.", ["analog", "comm"])
  ];

  (window.__L = window.__L || {})["1-2"] = {
    kind: "explainer",
    num: "1.2",
    level: "Level 1 · Basics",
    title: "Tour of the Arduino Uno board",
    lead: "Learn what every part of the board does and what each pin can do. About 5 minutes. Nothing to wire.",
    parts: "You need: nothing, but have your Uno next to you and find each part as you read.",
    learn: ["The main parts of the Uno board and what each one does", "What the digital, analog and power pins are for", "How to find pin 13, GND and 5V on the board"],

    sections: [
      {
        title: "The parts of the board",
        html: "<p>Tap a part of the picture, or a button below it. Then find the same part on your real board.</p>",
        widget: "uno2"
      },
      {
        title: "Pin explorer",
        html:
          "<p>The Uno has 14 digital pins (D0 to D13) and 6 analog pins (A0 to A5). Not every pin can do everything. Tap a pin to see its abilities, or tap a filter to light up all the pins that share one.</p>",
        widget: "pins"
      },
      {
        title: "Rules to remember",
        html:
          "<ul><li>The Uno works at <b>5 volts</b>. HIGH means about 5 V and LOW means 0 V.</li>" +
          "<li>Keep each pin to about <b>20 mA</b> or less. That is fine for an LED with a resistor, but too much for a motor, which needs a driver.</li>" +
          "<li>Pins <b>0 and 1</b> are shared with USB. Leave them free until you know why you need them.</li>" +
          "<li>A pin with a <b>~</b> printed next to it supports PWM.</li>" +
          "<li>Always connect <b>GND</b> between your board and any part that has its own power.</li></ul>"
      }
    ],

    pins: pins,

    quiz: [
      { q: "Which pins support PWM on the Uno?",
        a: ["0, 1, 2, 3, 4, 5", "3, 5, 6, 9, 10, 11", "2, 4, 7, 8, 12, 13", "All of them"],
        c: 1, e: "The pins marked with a tilde (~) are 3, 5, 6, 9, 10 and 11." },
      { q: "What does the voltage regulator do?",
        a: ["Stores your program", "Turns the 7 to 12 V input down to a steady 5 V", "Talks to the computer", "Keeps time"],
        c: 1, e: "It steps the power jack input down to the 5 V the chip and your parts use." },
      { q: "Which pin is connected to the built-in L LED?",
        a: ["Pin 1", "Pin 7", "Pin 13", "A0"],
        c: 2, e: "The L LED is wired to digital pin 13, which is why Blink works with no wiring." },
      { q: "Which two pins should you avoid for your own parts while uploading?",
        a: ["2 and 3", "0 and 1", "12 and 13", "A4 and A5"],
        c: 1, e: "Pins 0 and 1 are shared with the USB connection used for uploads and Serial messages." }
    ],
    next: "Next: installing the IDE and connecting your Uno."
  };
})();
