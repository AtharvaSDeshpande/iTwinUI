/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('LabeledInput', () => {
  const storyPath = 'LabeledInput';
  const tests = [
    'Basic',
    'Disabled',
    'Inline',
    'Hybrid Layout',
    'Negative',
    'Positive',
    'Warning',
    'With Custom Icon',
    'With Message',
  ];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('/', { qs: { mode: 'preview', story: id } });
      cy.compareSnapshot(testName);
    });
  });
});
