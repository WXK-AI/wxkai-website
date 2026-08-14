const NON_TEXT_INPUT = new Set([
  'button',
  'submit',
  'reset',
  'checkbox',
  'radio',
  'file',
  'hidden',
  'range',
  'color',
  'image',
])

export function isTypingTarget(node) {
  if (!node || node === document.body || node === document.documentElement) {
    return false
  }

  if (node.isContentEditable) return true

  const field = node.closest?.('input, textarea, select, [contenteditable="true"]')
  if (!field) return false

  if (field.tagName === 'INPUT') {
    const type = (field.getAttribute('type') || 'text').toLowerCase()
    if (NON_TEXT_INPUT.has(type)) return false
  }

  return true
}
