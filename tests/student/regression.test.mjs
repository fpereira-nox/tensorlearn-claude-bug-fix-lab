import test from 'node:test';
import assert from 'node:assert/strict';
import { getClaim } from '../../src/claims.mjs';

// Incident: viewer user-4 received claim-B, owned by user-42, because ownership
// was checked as a prefix ("user-42".startsWith("user-4")) instead of exact equality.
test('viewer user-4 does not receive claim-B owned by user-42', () => {
  const claimB = { id: 'claim-B', ownerId: 'user-42', status: 'pending' };
  assert.equal(getClaim([claimB], 'user-4', 'claim-B'), null);
  assert.deepEqual(getClaim([claimB], 'user-42', 'claim-B'), claimB);
});
