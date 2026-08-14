export const SECTIONS = [
  { id: 'half-title', title: 'Half-title', roman: null },
  { id: 'contents', title: 'Contents', roman: null },
  { id: 'preface', title: 'Prefatory note', roman: null },
  { id: 'particulars', title: 'Particulars', roman: null },
  { id: 'i', title: 'I. GenGuard', roman: 'I' },
  { id: 'ii', title: 'II. Langfuse Menubar', roman: 'II' },
  { id: 'iii', title: 'III. Secure Software Hardening', roman: 'III' },
  { id: 'iv', title: 'IV. Razer Viper Control', roman: 'IV' },
  { id: 'v', title: 'V. Safe Ransomware Behaviour Lab', roman: 'V' },
  { id: 'colophon', title: 'Colophon', roman: null },
]

export const ROMANS = ['I', 'II', 'III', 'IV', 'V']

export const CONTENTS = [
  {
    n: '00',
    href: '#particulars',
    title: 'Particulars',
    descriptor: 'Identity, study, and the recorded places.',
  },
  {
    n: '01',
    href: '#i',
    title: 'GenGuard',
    descriptor: 'Local redaction before prompts or files leave the browser.',
  },
  {
    n: '02',
    href: '#ii',
    title: 'Langfuse Menubar',
    descriptor: 'Read-only observability; prompt bodies withheld.',
  },
  {
    n: '03',
    href: '#iii',
    title: 'Secure Software Hardening',
    descriptor: 'Twenty-eight findings; three remediations.',
  },
  {
    n: '04',
    href: '#iv',
    title: 'Razer Viper Control',
    descriptor: 'Independent IOHID control. Not affiliated with Razer.',
  },
  {
    n: '05',
    href: '#v',
    title: 'Safe Ransomware Behaviour Lab',
    descriptor: 'Isolated machines. Fake records only.',
  },
  {
    n: '06',
    href: '#colophon',
    title: 'Colophon',
    descriptor: 'Address, and what this document does not do.',
  },
]
