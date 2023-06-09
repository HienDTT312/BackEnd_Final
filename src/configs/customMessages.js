module.exports = {
    errors: {
      accountCreationFailed: 'The requested action could not be completed',
      accountLimitReached: (number) => `You cannot have more than ${number} active accounts`,
      internalError: 'Something went wrong please try again',
      invalidToken: 'Invalid token',
      missingBody: 'Missing body of the request',
      requiredNamespace: 'CLS namespace required',
      accountNotFound: 'Ctrader account not found',
      transferAccountsNotFound: 'Source ctrader account or destination ctrader account not found',
      virtualAccountNotFound: 'Virtual ctrader account not found Create an ctrader account before proceeding with the deposit',
      virtualAccountMoreThanOne: 'A virtual ctrader accounts needs to be selected, as more than one were found',
      depositNotFound: 'Deposit not found',
      depositAccountNotFound: 'CTRADER account for the provided deposit not found',
      withdrawalNotFound: 'Withdrawal not found',
      withdrawalFailedNotEnoughMoney: 'Withdrawal failed. Not enough money',
      transactionNotFound: 'Transaction not found',
      transferNotFound: 'Transfer request not found',
      transactionAccountNotFound: 'CTRADER Account for the provided transaction not found',
      incorrectID: 'The id given is not of correct format or type',
      missingIdOrType: 'Property \'user_id\' is missing from token or \'user_type\' is not valid',
      ctraderIdRequired: 'The ctrader Id is required',
      passwordMissingOrNotMatching: 'You either provided no password or the passwords are not matching',
      passwordWrongFormat: 'Password should be 6-8 characters long, have at least 1 capital letter, 1 small letter and 1 number',
      tokenMissingOrExpired: 'The provided token is missing or it has expired',
      transactionCommentCannotBeGenerated: 'One of the required parameters required for ctrader comment is missing or is not valid',
      noCtraderAccountsFound: 'No accounts found for this user',
      insufficientFunds: 'Your current balance is less than the amount you are trying to withdraw',
      cantGetUserInfo: 'Can\'t get user info',
      partnerCantDepositInToVirtualAccount: 'Partner can\'t deposit in to virtual account',
      partnerCannotCreateCtraderAccount: 'User is not allowed to create ctrader account directly when the user_type is Partner',
      partnerCannotCreateDemoCtraderAccount: 'User is not allowed to create Demo ctrader account directly when the user_type is Partner',
      userNotFound: 'User not found',
      cyNotAllowed: 'User with CY regulator is not allowed to register Pamm Account',
      pammAccountNotAllowed: 'PAMM account not allowed',
      notAllowedPamm: 'You are not allowed a PAMM account at this moment',
      microAccountNotAllowed: 'Micro account not allowed',
      virtualAccountNotAllowed: 'You already have a real account and you cannot create a virtual account',
      fundAccountFailed: 'Fund Account failed',
      tradingHistoryNotFound: 'Trading History not found',
      unauthorizedActionInThisEnvironment: (env) => `This is an unauthorized action in ${env} environment`,
      failedToGetAccountBalance: 'Failed to get account balance',
      failedToWithdrawFromAccount: 'Failed to withdraw from account',
      failToPublishCTRADERTransferWithdraw: 'Fail to Publish to CTRADER API Transfer Withdrawal',
      failToPublishCTRADERTransferDeposit: 'Fail to Publish to CTRADER API Transfer Deposit',
      notAllowedDueToPlatformConfig: 'Account unable to be created due to platform configuration',
      referralNotFound: 'Referral not found',
      noTokenInParam: 'Reset password route was called without a token',
      tokenMissingOrExpired: 'The provided token is missing or it has expired',
      userNameExisted: 'Username existed in the system',
      notAnyActiveTerm: 'Not active term found',
      cannotDeleteDocument: 'Cannot delete document',
      categoryNotFound: 'Category not found',
      accountNotFound: 'Account not found',
      termNotFound: 'Term not found',
      aggrementNotFound: 'Aggrement not found',
      productNotFound: 'Product not found',
      commentNotFound: 'Comment not found',
      documentNotFound: 'Document not found',
      failedToCreateProduct: 'Failed to create product',
    },
    success: {
      forgotPasswordMailSent: 'An email will be sent to your email address',
      resetPasswordMailSent: 'An email will be sent to your email address',
      passwordHasBeenReset: 'Your password has been successfully reset',
      accountCreationOnProgress: 'A new ctrader account has been requested',
      depositSuccess: 'Deposit is successful',
      ctraderDetailDescription: 'success',
    },
  };
