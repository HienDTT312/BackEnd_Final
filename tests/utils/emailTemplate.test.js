const { email } = require('../../src/configs/config');
const emailTemplate = require('../../src/utils/emailTemplate');

test('Test emailtemplate', () => {
  const slug = 'account_created'
  const createdAccount = emailTemplate.accountCreatedTemplate('name', 'username', '123123');
  const productComment = emailTemplate.productCommentTemplate('name', 'username', '123123',1,1);
  const productCreated = emailTemplate.productCreatedTemplate('name', 'username', '123123','123123','test');
  const resetPassword = emailTemplate.resetPasswordTemplate('name', 'username', '123123','13123');

  expect(createdAccount).not.toBe(null);
  expect(productComment).not.toBe(null);
  expect(productCreated).not.toBe(null);
  expect(resetPassword).not.toBe(null);
})
