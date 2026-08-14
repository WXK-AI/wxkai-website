export const person = {
  name: 'Wong Xin Kai',
  degree: 'B.Sc. (Hons) Computer Science (Cyber Security)',
  school: 'Asia Pacific University',
  place: 'Malaysia',
  email: 'hello@wxkai.ccwu.cc',
  github: 'https://github.com/WXK-AI',
  linkedin: 'https://www.linkedin.com/in/wong-xin-kai-962a6a174/',
}

export const particulars = {
  status: 'Third-year cybersecurity student.',
  education: [
    'B.Sc. (Hons) Computer Science (Cybersecurity), Asia Pacific University, 2023–present. CGPA 3.84 / 4.0 (Year 3 Semester 2).',
    'Foundation in Computer and Technology, APU, 2022–2023. CGPA 3.93 / 4.0.',
  ],
  coursework: [
    'CCNA Switching, Routing, and Wireless Essentials, December 2024.',
  ],
  results: [
    'ICTF 2026, 5th.',
    'ICTF 2024, 7th.',
  ],
  appointment: 'Huawei Network Engineer Internship, May 2025.',
  languages: 'English fluent. Chinese fluent. Bahasa Malaysia basic.',
}

export const particularsIndex = [
  { id: 'particulars-status', href: '#particulars', label: 'Third-year cybersecurity student' },
  { id: 'particulars-degree', href: '#particulars-education', label: 'B.Sc. (Hons) Computer Science (Cybersecurity)' },
  { id: 'particulars-foundation', href: '#particulars-education', label: 'Foundation in Computer and Technology' },
  { id: 'particulars-ccna', href: '#particulars-coursework', label: 'CCNA Switching, Routing, and Wireless Essentials' },
  { id: 'particulars-ictf-2026', href: '#particulars-results', label: 'ICTF 2026, 5th' },
  { id: 'particulars-ictf-2024', href: '#particulars-results', label: 'ICTF 2024, 7th' },
  { id: 'particulars-huawei', href: '#particulars-appointment', label: 'Huawei Network Engineer Internship' },
  { id: 'particulars-languages-line', href: '#particulars-languages', label: 'English, Chinese, Bahasa Malaysia' },
]

export const indexActions = [
  { id: 'print', label: 'Print this copy' },
  { id: 'copy', label: 'Copy address' },
]

export const preface = [
  'This is a record of built tools and limited academic work.',
  'It is not a catalogue of claims.',
  'Figures are written as recorded.',
  'Where a repository is private, a remediation was scoped, or a release is unnotarized, the limit is marked in the margin.',
]

export const genguard = {
  title: 'GenGuard',
  abstract: [
    'GenGuard is a privacy-first Chrome extension.',
    'It detects and redacts personally identifiable information locally, before prompts or files reach ChatGPT or Gemini.',
  ],
  method: [
    'Three detectors run on the device: regular expressions, an ONNX named-entity model, and Tesseract.js OCR.',
    'The extension scores risk, highlights matches in the page, presents a warning modal, and caches models.',
    'It is built with React, TypeScript, Vite, Manifest V3, and ONNX Runtime Web.',
  ],
  measuredIntro:
    'Evaluated with 33 respondents. The figures below are from a 2,000-row unseen test subset, plus measured model size and latency.',
  metrics: [
    { label: 'Respondents', value: '33' },
    { label: 'Test subset', value: '2,000 rows, unseen' },
    { label: 'Precision', value: '0.938156' },
    { label: 'Recall', value: '0.997587' },
    { label: 'F1', value: '0.966959' },
    { label: 'Quantized F1', value: 'Same as tested' },
    { label: 'Model size', value: '1061.98 MB → 308.27 MB' },
    { label: 'Size reduction', value: '70.97%' },
    { label: 'Inference', value: '83.302–87.739 ms' },
    { label: 'OCR', value: '314.6 ms average' },
  ],
  limits: 'Repository is private. This page does not run the shipped ONNX model.',
  plateCaption:
    'Plate I. Local model runtime. NER (ONNX) and Tesseract.js OCR, both marked Ready.',
  plateAlt:
    'GenGuard Model tab. NER model and Image OCR panels, both marked Ready.',
  specimenCaption:
    'Demonstration pattern matcher. The shipped extension also runs ONNX NER and OCR.',
  pulledMetric: 'F1 0.966959',
}

export const langfuse = {
  title: 'Langfuse Menubar',
  paragraphs: [
    'Langfuse Menubar is a public Swift macOS menu-bar dashboard.',
    'It monitors LLM observability at a glance: cost, tokens, latency, errors, and model usage.',
    'Credentials are stored in Keychain.',
    'The client is read-only and does not display prompt or completion content.',
  ],
  fields: ['Cost', 'Tokens', 'Latency', 'Errors', 'Model usage'],
  github: 'https://github.com/WXK-AI/langfuse-menubar',
  blankCaption: 'Prompt and completion are not read.',
  figureCaption: 'Specified menubar fields. Account figures are not reproduced here.',
}

export const hardening = {
  title: 'Secure Software Hardening',
  paragraphs: [
    'An academic security case study performed on an existing open-source PHP inventory system.',
    'The original system is not his.',
    'The initial assessment found 28 issues: 10 critical, 9 high, 6 medium, 3 low.',
    'The scoped remediation work fixed exactly three issues: stored XSS, unauthenticated password reset, and MD5 password hashing.',
    'Before/after proof was recorded and the changes were retested.',
    'This chapter does not claim the other twenty-five were fixed.',
  ],
  countLine: 'Three issues were fixed. Twenty-five were not.',
  ledger: '28 issues — 10 critical, 9 high, 6 medium, 3 low.',
  unnamedNote:
    'Only the three remediations are named in the published record. The other twenty-five findings are listed so the unfixed majority stays visible.',
}

export const viper = {
  title: 'Razer Viper Control',
  paragraphs: [
    'Razer Viper Control is a public independent Swift macOS utility for DPI, polling rate, profiles, remapping, diagnostics, and IOHID device control.',
    'It is a community project.',
    'Test releases are unnotarized.',
  ],
  affiliation: 'Independent. Not affiliated with Razer.',
  github: 'https://github.com/WXK-AI/razer-viper-control',
  spec: [
    { label: 'Utility', value: 'Independent Swift, macOS' },
    { label: 'Control', value: 'DPI, polling, profiles, remapping, diagnostics' },
    { label: 'Bus', value: 'IOHID' },
    { label: 'Release', value: 'Test builds, unnotarized' },
  ],
  dpiSteps: [400, 800, 1600, 3200],
  pollingHz: 1000,
}

export const lab = {
  title: 'Safe Ransomware Behaviour Lab',
  paragraphs: [
    'A defensive academic lab across three isolated virtual machines.',
    'The exercise used fake healthcare data, Wazuh, and Sysmon.',
    'Behaviours and TTPs were emulated, mitigations were applied, and the exercise was rerun.',
    'No real ransomware. No real patient data.',
  ],
  tokenLabel: 'fake healthcare record',
  isolationNote: 'No real ransomware. No real patient data.',
}

export const colophon = {
  doesNot: [
    'This document does not submit a form.',
    'It does not run analytics.',
    'It does not send a prompt outbound.',
  ],
}

export const microcopy = {
  threeFixed: 'Three issues were fixed. Twenty-five were not.',
  repoPrivate: 'Repository is private.',
  independent: 'Independent. Not affiliated with Razer.',
  noReal: 'No real ransomware. No real patient data.',
  notInScope: 'Not in scope',
  isolated: 'Isolated.',
  entryRefused: 'Isolated. Entry refused.',
}
