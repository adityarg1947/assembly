const copyIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"></path></svg>';

const practicals = [
  {
    number: 2,
    title: 'Addition of two 8-bit numbers',
    aim: 'Write an assembly language program to perform addition of two 8 bit number stored at memory location 2050H and 2051H. Result stored at 2052H and if carry is present then stored at 2053H.',
    code: `LDA 2050H
MOV B,A
LDA 2051H
ADD B
STA 2052H
MVI A,00H
JNC LOOP
INR A
LOOP: STA 2053H
HLT`
  },
  {
    number: 3,
    title: 'Addition of two 16-bit numbers',
    aim: 'Write a program for addition of two 16 bit number stored at 3001H and 3002H. Store the result in 3004H.',
    code: `LDA 3001H
MOV B,A
LDA 3003H
ADD B
STA 3005H
LDA 3002H
MOV B,A
LDA 3004H
ADD B
STA 3006H
HLT`,
    note: 'The aim and program addresses differ in the supplied practical material. The code follows the printed program.'
  },
  {
    number: 4,
    title: 'Subtraction of two 8-bit numbers',
    aim: 'Write an assembly language program to perform subtraction of two 8-bit numbers stored at memory locations 2050H and 2051H. Store the result at 2052H. When borrow is generated, store the carry indicator at 2053H.',
    code: `LXI H,2050H
MOV A,M
INX H
SUB M
INX H
MOV M,A
INX H
MVI A,00H
JNC STORE
MVI A,01H
STORE: MOV M,A
HLT`
  },
  {
    number: 5,
    title: 'Multiplication using successive addition',
    aim: 'Write an assembly language program to multiply two 8-bit data using successive addition. The numbers are stored at 3000H and 3001H. Store the result from 3002H onwards.',
    code: `LXI H,3000H
MOV B,M
INX H
MOV C,M
MVI D,00H
MOV E,C
ORA E
JZ STORE
MVI A,00H
LOOP: ADD B
JNC SKIP
INR D
SKIP: DCR C
JNZ LOOP
STORE: STA 3002H
MOV A,D
STA 3003H
HLT`
  },
  {
    number: 6,
    title: 'Arrange five 8-bit numbers in ascending order',
    aim: 'Write an assembly language program in 8085 to arrange five 8-bit numbers in ascending order stored at memory locations starting from 3000H.',
    code: `MVI B,04H

START: LXI H,3000H
       MVI C,04H

LOOP:  MOV A,M
       INX H
       CMP M
       JC LOOP1
       JZ LOOP1

       MOV D,M
       MOV M,A
       DCX H
       MOV M,D
       INX H

LOOP1: DCR C
       JNZ LOOP

       DCR B
       JNZ START
       HLT`
  },
  {
    number: 7,
    title: 'Find the larger number',
    aim: 'Write an assembly language program to find the larger number from two numbers stored at memory locations 2501H and 2502H. Store the result at 2503H.',
    code: `LXI H,2501H
MOV A,M
INX H
CMP M
JNC STORE
MOV A,M
STORE: INX H
MOV M,A
HLT`
  },
  {
    number: 8,
    title: 'Find the smallest number',
    aim: 'Write an assembly language program to find the smallest number from numbers stored at memory locations 1000H and 1001H. Store the result at 2000H.',
    code: `LXI H,1000H
MOV A,M
INX H
CMP M
JC STORE
MOV A,M
STORE: STA 2000H
HLT`
  },
  {
    number: 9,
    title: 'Transfer 10 bytes between memory locations',
    aim: 'Write a program to transfer 10 bytes of data from memory location 2400H to 2500H.',
    code: `LXI H,2400H
LXI D,2500H
MVI C,0AH

BACK: MOV A,M
      STAX D
      INX H
      INX D
      DCR C
      JNZ BACK
      HLT`
  },
  {
    number: 10,
    title: 'Generate Fibonacci numbers',
    aim: 'Write an assembly language program to generate Fibonacci numbers at memory locations starting from 3000H (0,1,1,2,3,5,8,13,21,...).',
    code: `LXI H,3000H
MVI C,0AH
MVI A,00H
MOV M,A
INX H
DCR C
MVI B,01H
MOV M,B
INX H
DCR C

LOOP: ADD B
      MOV M,A
      INX H
      MOV D,A
      MOV A,B
      MOV B,D
      DCR C
      JNZ LOOP
      HLT`
  }
];

const list = document.getElementById('practicals');

if (list) {
  list.innerHTML = '';

  practicals.forEach((item) => {
    const article = document.createElement('article');
    article.className = 'practical';

    const button = document.createElement('button');
    button.className = 'practical-toggle';
    button.type = 'button';
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = `
      <span class="chevron" aria-hidden="true"></span>
      <span>Practical ${item.number}: ${item.title}</span>
    `;

    const content = document.createElement('div');
    content.className = 'practical-content';
    content.hidden = true;

    const aimLabel = document.createElement('p');
    aimLabel.className = 'aim-label';
    aimLabel.textContent = 'Aim';

    const aim = document.createElement('p');
    aim.className = 'aim';
    aim.textContent = item.aim;

    const panel = document.createElement('div');
    panel.className = 'code-panel';

    const toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';

    const language = document.createElement('span');
    language.textContent = 'ASSEMBLY CODE';

    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'copy-button';
    copy.innerHTML = `${copyIcon}<span>Copy code</span>`;

    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = item.code;

    pre.appendChild(code);
    toolbar.append(language, copy);
    panel.append(toolbar, pre);
    content.append(aimLabel, aim, panel);

    if (item.note) {
      const note = document.createElement('p');
      note.className = 'source-note';
      note.textContent = item.note;
      content.appendChild(note);
    }

    button.addEventListener('click', () => {
      const isOpen = !content.hidden;
      content.hidden = isOpen;
      article.classList.toggle('open', !isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));
    });

    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(item.code);
        copy.innerHTML = `${copyIcon}<span>Copied!</span>`;
      } catch {
        const selection = document.createElement('textarea');
        selection.value = item.code;
        selection.style.position = 'fixed';
        selection.style.opacity = '0';
        document.body.appendChild(selection);
        selection.select();

        const success = document.execCommand('copy');
        selection.remove();

        copy.innerHTML = `${copyIcon}<span>${success ? 'Copied!' : 'Select and copy'}</span>`;
      }

      window.setTimeout(() => {
        copy.innerHTML = `${copyIcon}<span>Copy code</span>`;
      }, 1600);
    });

    article.append(button, content);
    list.appendChild(article);
  });
}