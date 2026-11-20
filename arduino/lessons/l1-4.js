(window.__L = window.__L || {})["1-4"] = {
  kind: "explainer",
  num: "1.4",
  level: "Level 1 · Basics",
  title: "Your first upload: the Blink example",
  lead: "Upload a ready-made program to your Uno and watch the board respond. About 5 minutes. No wiring needed.",
  parts: "You need: your Uno connected with the board and port selected, as in Lesson 1.3.",
  learn: ["How to open the Blink example and upload it", "How to tell that an upload worked", "What to check when an upload fails"],

  sections: [
    {
      title: "Open and upload Blink",
      html: "<p>The IDE comes with ready-made programs called examples. Blink is the classic first one. Tick each step as you go.</p>",
      widget: "checklist"
    },
    {
      title: "What happens when you click Upload",
      html:
        "<p>Upload has three stages. The IDE checks and compiles your sketch into machine instructions. It then sends them over USB to the Uno, where a small program called the <b>bootloader</b> receives them and stores them in the chip's flash memory. Finally the board restarts and runs your sketch.</p>" +
        "<p>The TX and RX LEDs flicker while data travels. Press the button to see it.</p>",
      widget: "uploadsim"
    },
    {
      title: "Reading the messages",
      html:
        "<p>The Output panel at the bottom tells you what happened. <b>Done uploading</b> means success. Red text means a problem, and the first red line is the one to read. Tap a message to see what it usually means.</p>" +
        "<details><summary>not in sync, or stk500_getsync()</summary><p>The IDE could not talk to the board. Check that the board is set to Arduino Uno and the right port is selected, try a different data cable, and unplug and replug the board.</p></details>" +
        "<details><summary>Port busy, or access denied</summary><p>Something else is using the port. Close any Serial Monitor window or other IDE window, then upload again.</p></details>" +
        "<details><summary>'something' was not declared in this scope</summary><p>This is a compile error, usually a spelling or capital letter mistake. The message shows the line number to check.</p></details>" +
        "<details><summary>expected ';' before …</summary><p>A semicolon is missing at the end of the line shown or the line just above it.</p></details>"
    }
  ],

  checklist: [
    "Plug in the Uno and check that the board and port are still selected (Lesson 1.3).",
    "Choose <b>File &gt; Examples &gt; 01.Basics &gt; Blink</b>. A new window opens with the code.",
    "Click <b>Verify</b> (the tick). Wait for <b>Done compiling</b> in the Output panel.",
    "Click <b>Upload</b> (the arrow). Watch the TX and RX LEDs flicker on the board.",
    "When the Output panel says <b>Done uploading</b>, the <b>L</b> LED starts blinking once per second.",
    "Challenge: change both <b>1000</b> values to <b>200</b>, upload again, and watch the blinking speed up."
  ],

  quiz: [
    { q: "Which LEDs on the Uno flicker while a sketch is uploading?",
      a: ["Power and L", "TX and RX", "Only L", "None of them"],
      c: 1, e: "TX and RX show data travelling between the computer and the board over USB." },
    { q: "What receives the new program inside the Uno during an upload?",
      a: ["The USB port", "The bootloader", "The reset button", "The Output panel"],
      c: 1, e: "The bootloader is a small program on the chip that accepts new sketches and stores them in flash memory." },
    { q: "A red error appears after you click Upload. What should you do first?",
      a: ["Read the first error line and check its line number or message", "Ignore it and upload again", "Reinstall the IDE", "Unplug the power jack"],
      c: 0, e: "The first red line usually names the real problem. Later lines are often just a result of it." }
  ],
  next: "Next: setup() and loop(), line by line."
};
