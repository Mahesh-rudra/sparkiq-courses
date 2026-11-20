(window.__L = window.__L || {})["1-3"] = {
  kind: "explainer",
  num: "1.3",
  level: "Level 1 · Basics",
  title: "Install the Arduino IDE and connect your Uno",
  lead: "Set up the free software, plug in the board, and choose the right board and port. About 6 minutes. Your first upload comes in the next lesson.",
  parts: "You need: a computer (Windows, macOS or Linux), an Arduino Uno, and a USB cable that carries data.",
  learn: ["How to install the Arduino IDE", "How to connect the Uno with a USB cable", "How to choose the right board and port"],

  sections: [
    {
      title: "What the IDE does",
      html:
        "<p>The Arduino IDE (Integrated Development Environment) is the program you write code in. It also checks your code, turns it into instructions the chip understands, and sends it to the board over USB.</p>" +
        "<p>A program in Arduino is called a <b>sketch</b>. The IDE is free.</p>"
    },
    {
      title: "Install and connect",
      html: "<p>Tick each step as you finish it.</p>",
      widget: "checklist"
    },
    {
      title: "Tour of the IDE",
      html: "<p>This is a simplified picture of the IDE window. Tap each part to see what it does.</p>",
      widget: "ide"
    },
    {
      title: "If the port does not appear",
      html:
        "<p>This is the most common first problem. Tap a fix to open it.</p>" +
        "<details><summary>Try a different USB cable</summary><p>Some cables only charge and carry no data. A cable that came with a phone or a board usually works.</p></details>" +
        "<details><summary>Install the CH340 driver (clone boards)</summary><p>Many low-cost Uno clones use a CH340 chip for USB. Search for the CH340 driver for your system, install it, then unplug and replug the board.</p></details>" +
        "<details><summary>Try another USB port</summary><p>Plug straight into the computer instead of a hub, and try a different port.</p></details>" +
        "<details><summary>Close other programs using the port</summary><p>Another IDE window or a serial terminal can hold the port. Close them and plug the board in again.</p></details>" +
        "<details><summary>Linux: permission denied</summary><p>Add your user to the dialout group, then log out and log in again. The port usually appears as /dev/ttyACM0, or /dev/ttyUSB0 for clones.</p></details>"
    }
  ],

  checklist: [
    "Open <b>arduino.cc/en/software</b> and download <b>Arduino IDE 2</b> for your system.",
    "Run the installer and accept the defaults. On Windows, allow any driver prompts.",
    "Open the Arduino IDE.",
    "Plug the Uno into your computer with the USB cable. The power LED on the board should light up.",
    "Choose the board: select <b>Arduino Uno</b> in the board menu at the top of the IDE.",
    "Choose the port: pick the one that appears when the Uno is plugged in (COM3 or similar on Windows, usbmodem on macOS, ttyACM0 on Linux)."
  ],

  quiz: [
    { q: "What is a program called in the Arduino IDE?",
      a: ["A script", "A sketch", "A module", "An app"],
      c: 1, e: "Arduino programs are called sketches." },
    { q: "What is the difference between Verify and Upload?",
      a: ["There is none", "Verify checks and compiles the code, Upload also sends it to the board", "Upload only saves the file", "Verify sends the code to the board"],
      c: 1, e: "Verify compiles and checks for errors. Upload does that and then sends the result to the Uno." },
    { q: "The board is plugged in but no port appears. What should you try first?",
      a: ["Reinstall your operating system", "A different USB cable that carries data", "Press Verify", "Change the board to Mega"],
      c: 1, e: "Charge-only cables are a very common cause. A data cable is the quickest thing to test." }
  ],
  next: "Next: your first upload, the Blink example."
};
