const REMEDIATED = {
  3: {
    id: 'xss',
    name: 'Stored XSS',
    before: 'Stored input could execute when rendered to another user.',
    after: 'The stored XSS path was closed. Before/after proof was kept and the change was retested.',
  },
  11: {
    id: 'reset',
    name: 'Unauthenticated password reset',
    before: 'A password could be reset without proving the requester was authenticated.',
    after: 'The unauthenticated reset was closed. Before/after proof was kept and the change was retested.',
  },
  18: {
    id: 'md5',
    name: 'MD5 password hashing',
    before: 'Passwords were stored with MD5.',
    after: 'MD5 password hashing was replaced. Before/after proof was kept and the change was retested.',
  },
}

export const findings = Array.from({ length: 28 }, (_, index) => {
  const number = index + 1
  const remediated = REMEDIATED[number]
  if (remediated) {
    return {
      number,
      status: 'remediated',
      ...remediated,
    }
  }
  return {
    number,
    id: `open-${number}`,
    name: 'Unnamed in this record',
    status: 'open',
  }
})

export const remediatedCount = findings.filter((finding) => finding.status === 'remediated').length
