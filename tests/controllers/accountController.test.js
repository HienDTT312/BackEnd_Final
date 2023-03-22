jest.useFakeTimers();
const {
  User, Department
} = require('../../src/models/index');
const accountController = require('../../src/controllers/accountController');
const emailService = require('../../src/services/emailService');
const fs = require('fs');
const customMessages = require('../../src/configs/customMessages');

require('mysql2/node_modules/iconv-lite').encodingExists('foo');

jest.useFakeTimers()
const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};


describe('Test account controller', () => {
 describe('Test create account', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
   it('it should return status code 200 and account data', async () => {
    const req = {
      body: {
        "username": "annthgch190232@fpt.edu.vn",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test",
      },
      file: {
        filename: 'Test',
      }
    };
    const res = mockResponse();

    emailService.sendEmail = jest.fn();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

    jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
      department_id: 6,
    });

    jest.spyOn(User, 'create').mockResolvedValueOnce({
      "username": "annthgch190232@fpt.edu.vn",
      "full_name": "Vu Hai Nam",
      "last_name": "full_name",
      "first_name": "full_name",
      "phone": "0966141511",
      "role_id": 4,
      "password": "123456789",
      "avatar": "test"
    });

    emailService.sendEmail.mockResolvedValueOnce(true);

    await accountController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        "username": "annthgch190232@fpt.edu.vn",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
    });
   });

   it('it should return status code 200 and account2', async () => {
    const req = {
      body: {
        "username": "annthgch190232@fpt.edu.vn",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test",
        "gender": "female"
      },
    };
    const res = mockResponse();

    emailService.sendEmail = jest.fn();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

    jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
      department_id: 6,
    });

    jest.spyOn(User, 'create').mockResolvedValueOnce({
      "username": "annthgch190232@fpt.edu.vn",
      "full_name": "Vu Hai Nam",
      "last_name": "full_name",
      "first_name": "full_name",
      "phone": "0966141511",
      "role_id": 4,
      "password": "123456789",
      "avatar": "test",
      "gender": "female"
    });

    emailService.sendEmail.mockResolvedValueOnce(true);

    await accountController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        "username": "annthgch190232@fpt.edu.vn",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test",
        "gender": "female"
      },
    });
   });

   it('it should return status code 500 and account existed', async () => {
    const req = {
      body: {
        "username": "annthgch190232@fpt.edu.vn",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
    };
    const res = mockResponse();

    emailService.sendEmail = jest.fn();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce(true);

    jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
      department_id: 6,
    });

    jest.spyOn(User, 'create').mockResolvedValueOnce({
      "username": "annthgch190232@fpt.edu.vn",
      "full_name": "Vu Hai Nam",
      "last_name": "full_name",
      "first_name": "full_name",
      "phone": "0966141511",
      "role_id": 4,
      "password": "123456789",
      "avatar": "test"
    });

    emailService.sendEmail.mockResolvedValueOnce(true);

    await accountController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Username existed in the system"],
    });
   });

   it('it should return status code 500 and department not found', async () => {
    const req = {
      body: {
        "username": "annthgch190232@fpt.edu.vn",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
    };
    const res = mockResponse();

    emailService.sendEmail = jest.fn();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

    jest.spyOn(Department, 'findOne').mockResolvedValueOnce(null);

    jest.spyOn(User, 'create').mockResolvedValueOnce({
      "username": "annthgch190232@fpt.edu.vn",
      "full_name": "Vu Hai Nam",
      "last_name": "full_name",
      "first_name": "full_name",
      "phone": "0966141511",
      "role_id": 4,
      "password": "123456789",
      "avatar": "test"
    });

    emailService.sendEmail.mockResolvedValueOnce(true);

    await accountController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Department not found"],
     });
   });

   it('it should return status code 500 and create failed', async () => {
    const req = {
      body: {
        "username": "annthgch190232@fpt.edu.vn",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
    };
    const res = mockResponse();

    emailService.sendEmail = jest.fn();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

    jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
      department_id: 6
    });

    jest.spyOn(User, 'create').mockResolvedValueOnce(false);

    await accountController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Something went wrong please try again"],
     });
   });

   it('it should return status code 500 and throw internal error', async () => {
    const req = {
      body: {
        "username": "annthgch190232@fpt.edu.vn",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
    };
    const res = mockResponse();

    emailService.sendEmail = jest.fn();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

    jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
      department_id: 6
    });

    jest.spyOn(User, 'create').mockImplementation(() => {
      throw Error();
    });

    await accountController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Something went wrong please try again"],
     });
   });

   it('it should return status code 500 and throw internal error email send fail', async () => {
    const req = {
      body: {
        "username": "annthgch190232@fpt.edu.vn",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
    };
    const res = mockResponse();

    emailService.sendEmail = jest.fn();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

    jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
      department_id: 6
    });

    jest.spyOn(User, 'create').mockImplementation(true);

    emailService.sendEmail.mockImplementation(() => {
      throw Error();
    })

    await accountController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Something went wrong please try again"],
     });
   });
 });

 describe('Test update account', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
   it('it should return status code 200 and account data', async () => {
    const req = {
      body: {
        "username": "Test",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
      params: {
        "user_id": "Test",
      },
      file: {
        filename: 'Test'
      }
    };
    const res = mockResponse();

    jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
      department_id: 6,
    });

    jest.spyOn(User, 'update').mockResolvedValueOnce({
      "username": "Test",
      "full_name": "Vu Hai Nam",
      "last_name": "full_name",
      "first_name": "full_name",
      "phone": "0966141511",
      "role_id": 4,
      "password": "123456789",
      "avatar": "test"
    });

    await accountController.updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        "username": "Test",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
    });
   });

   it('it should return status code 500 and department not found', async () => {
    const req = {
      body: {
        "username": "Test",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
      params: {
        "user_id": "Test",
      }
    };
    const res = mockResponse();

    jest.spyOn(Department, 'findOne').mockResolvedValueOnce(null);

    jest.spyOn(User, 'update').mockResolvedValueOnce({
      "username": "Test",
      "full_name": "Vu Hai Nam",
      "last_name": "full_name",
      "first_name": "full_name",
      "phone": "0966141511",
      "role_id": 4,
      "password": "123456789",
      "avatar": "test"
    });

    await accountController.updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Department not found"]
    });
   });

   it('it should return status code 500 and failed to update', async () => {
    const req = {
      body: {
        "username": "Test",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
      params: {
        "user_id": "Test",
      }
    };
    const res = mockResponse();

    jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
      department_id: 6,
    });

    jest.spyOn(User, 'update').mockResolvedValueOnce(null);

    await accountController.updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Something went wrong please try again"]
    });
   });

   it('it should return status code 500 and throw internal error', async () => {
    const req = {
      body: {
        "username": "annthgch190232@fpt.edu.vn",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
    };
    const res = mockResponse();

    jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
      department_id: 6
    });

    jest.spyOn(User, 'update').mockImplementation(() => {
      throw Error();
    });

    await accountController.updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Something went wrong please try again"],
     });
   });
 });

 describe('Test get One account', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
   it('it should return status code 200 and account data', async () => {
    const req = {
      body: {
        "username": "Test",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
      params: {
        "user_id": "Test",
      }
    };
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce({
      "username": "Test",
      "full_name": "Vu Hai Nam",
      "last_name": "full_name",
      "first_name": "full_name",
      "phone": "0966141511",
      "role_id": 4,
      "password": "123456789",
      "avatar": "test"
    });

    await accountController.getOneUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: {
        "username": "Test",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
    });
   });

   it('it should return status code 500 and department not found', async () => {
    const req = {
      body: {
        "username": "Test",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
      params: {
        "user_id": "Test",
      }
    };
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

    await accountController.getOneUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Account not found"]
    });
   });

   it('it should return status code 500 and throw internal error', async () => {
    const req = {
      body: {
        "username": "annthgch190232@fpt.edu.vn",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
    };
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockImplementation(() => {
      throw Error();
    });

    await accountController.getOneUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Something went wrong please try again"],
     });
   });
 });

 describe('Test delete account', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
   it('it should return status code 200 and account data', async () => {
    const req = {
      params: {
        "user_id": "Test",
      }
    };
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce({
      "username": "Test",
      "full_name": "Vu Hai Nam",
      "last_name": "full_name",
      "first_name": "full_name",
      "phone": "0966141511",
      "role_id": 4,
      "password": "123456789",
      "avatar": "test"
    });

    fs.unlinkSync = jest.fn();
    fs.unlinkSync.mockResolvedValueOnce(true);

    jest.spyOn(User, 'destroy').mockResolvedValueOnce(true);

    await accountController.deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: true,
    });
   });

   it('it should return status code 500 and department not found', async () => {
    const req = {
      body: {
        "username": "Test",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
      params: {
        "user_id": 2,
      }
    };
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

    await accountController.deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Account not found"]
    });
   });

   it('it should return status code 500 and department not found', async () => {
    const req = {
      body: {
        "username": "Test",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
      params: {
        "user_id": 1,
      }
    };
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce(true);

    jest.spyOn(User, 'destroy').mockResolvedValueOnce(false);

    await accountController.deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Something went wrong please try again"]
    });
   });

   it('it should return status code 500 and throw internal error', async () => {
    const req = {
      body: {
        "username": "annthgch190232@fpt.edu.vn",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
      params: {
        user_id: 6
      }
    };
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockImplementation(() => {
      throw Error();
    });

    fs.unlinkSync = jest.fn();
    fs.unlinkSync.mockResolvedValueOnce(true);

    await accountController.deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Something went wrong please try again"],
     });
   });

   it('it should return status code 500 and throw internal error2', async () => {
    const req = {
      body: {
        "username": "annthgch190232@fpt.edu.vn",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
    };
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockImplementation(() => {
      throw Error();
    });

    fs.unlinkSync = jest.fn();
    fs.unlinkSync.mockResolvedValueOnce(true);

    await accountController.deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Something went wrong please try again"],
     });
   });
 });

 describe('Test get all account', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
   it('it should return status code 200 and account data', async () => {
    const req = {
      query: {
        department_id: 1,
        user_id:1,
        term_id: 1,
        product_id: 1,
        category_id: 1,
        page: 1,
        gender: 1,
        profile_status: 1,
        role_id: 1
      }
    };
    const res = mockResponse();

    jest.spyOn(User, 'findAndCountAll').mockResolvedValueOnce([{
      "username": "Test",
      "full_name": "Vu Hai Nam",
      "last_name": "full_name",
      "first_name": "full_name",
      "phone": "0966141511",
      "role_id": 4,
      "password": "123456789",
      "avatar": "test"
    }]);

    await accountController.getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: [{
        "username": "Test",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      }],
    });
   });

   it('it should return status code 500 and account not found', async () => {
    const req = {
      body: {
        "username": "Test",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
      params: {
        "user_id": 2,
      },
      query: {
        page: 1,
      }
    };
    const res = mockResponse();

    jest.spyOn(User, 'findAndCountAll').mockResolvedValueOnce(null);

    await accountController.getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Account not found"]
    });
   });

   it('it should return status code 500 and department not found', async () => {
    const req = {
      body: {
        "username": "Test",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
      params: {
        "user_id": 1,
      }
    };
    const res = mockResponse();

    jest.spyOn(User, 'findAndCountAll').mockImplementation(() => {
      throw Error();
    })

    await accountController.getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Something went wrong please try again"]
    });
   });

   it('it should return status code 500 and throw internal error', async () => {
    const req = {
      body: {
        "username": "annthgch190232@fpt.edu.vn",
        "full_name": "Vu Hai Nam",
        "last_name": "full_name",
        "first_name": "full_name",
        "phone": "0966141511",
        "role_id": 4,
        "password": "123456789",
        "avatar": "test"
      },
      params: {
        user_id: 6
      }
    };
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockImplementation(() => {
      throw Error();
    });

    fs.unlinkSync = jest.fn();
    fs.unlinkSync.mockResolvedValueOnce(true);

    await accountController.getOneUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Something went wrong please try again"],
     });
   });
 });

 describe('Test update password account', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
   it('it should return status code 200 and account data', async () => {
    const req = {
      body: {
        "username": "gaconbibenh11@gmail.com",
        "password": "123456789",
      }
    };
    const res = mockResponse();

    jest.spyOn(User, 'update').mockResolvedValueOnce([{
      "username": "gaconbibenh11@gmail.com",
      "password": "123456789"
    }]);

    await accountController.updateUserPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: [{
        "username": "gaconbibenh11@gmail.com",
        "password": "123456789"
      }],
    });
   });

   it('it should return status code 500 and throw internal error', async () => {
    const req = {
      body: {
        "username": "Test",
        "password": "123456789",
      },
    };
    const res = mockResponse();

    jest.spyOn(User, 'update').mockResolvedValueOnce(null);

    await accountController.updateUserPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Something went wrong please try again"]
    });
   });

   it('it should return status code 500 and throw internal error', async () => {
    const req = {
      body: {
        "username": "Test",
        "password": "123456789",
      },
      params: {
        "user_id": 1,
      }
    };
    const res = mockResponse();

    jest.spyOn(User, 'update').mockImplementation(() => {
      throw Error();
    })

    await accountController.updateUserPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Something went wrong please try again"]
    });
   });
 });

 describe('Test reset password account', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
   it('it should return status code 200 and password reset', async () => {
    const req = {
      body: {
        "new_password": "123456789",
        "confirm_password": "123456789",
      },
      params: {
        token: "Test"
      },
    };
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce({
      "username": "Test",
      "full_name": "Vu Hai Nam",
      "last_name": "full_name",
      "first_name": "full_name",
      "phone": "0966141511",
      "role_id": 4,
      "password": "123456789",
      "avatar": "test",
      save: () => ({
      "username": "Test",
      "full_name": "Vu Hai Nam",
      "last_name": "full_name",
      "first_name": "full_name",
      "phone": "0966141511",
      "role_id": 4,
      "password": "123456789",
      "avatar": "test",
      }),
    });


    await accountController.resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: ["Your password has been successfully reset"],
    });
   });

   it('it should return status code 400 and no token in param', async () => {
    const req = {
      body: {
        "new_password": "123456789",
        "confirm_password": "123456789",
      },
      params: {

      },
    };
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce({
      "username": "Test",
      "full_name": "Vu Hai Nam",
      "last_name": "full_name",
      "first_name": "full_name",
      "phone": "0966141511",
      "role_id": 4,
      "password": "123456789",
      "avatar": "test",
    });

    await accountController.resetPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["The provided token is missing or it has expired"],
    });
   });

   it('it should return status code 400 and no user found, token missing', async () => {
    const req = {
      body: {
        "new_password": "123456789",
        "confirm_password": "123456789",
      },
      params: {

      },
    };
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined);

    await accountController.resetPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["The provided token is missing or it has expired"],
    });
   });

   it('it should return status code 500 and throw internal error', async () => {
    const req = {
      body: {
        "new_password": "123456789",
        "confirm_password": "123456789",
      },
      params: {
        token: "Test"
      },
    };
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockImplementation(() => {
      throw Error();
    })

    await accountController.resetPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Something went wrong please try again"],
    });
   });

   it('it should return status code 500 and the passwords are not matching', async () => {
    const req = {
      body: {
        "new_password": "1231a3456789",
        "confirm_password": "12323",
      },
      params: {
        token: "Te22st"
      },
    };
    const res = mockResponse();

    await accountController.resetPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: [customMessages.errors.passwordMissingOrNotMatching],
    });
   });
 });

 describe('Test forgot password', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it('it should return status code 200 and saved User', async () => {
     const req = {
       body: {
         username: "test@gmail.com",
       }
     }
     const res = mockResponse();

     jest.spyOn(User, 'findOne').mockResolvedValueOnce({
      "user_id": 6,
      save: () => ({
        "user_id": 6,
      }),
     });
     await accountController.forgotPassword(req, res);

     expect(res.status).toHaveBeenCalledWith(200);
     expect(res.json).toHaveBeenCalledWith({
       data: {
        savedUser: {
          user_id: 6
        }
       }
     });
  })

  it('it should return status code 500 and user not found', async () => {
    const req = {
      body: {
        username: "test@gmail.com",
      }
    }
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined);
    await accountController.forgotPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ['Account not found']
    });
  })

  it('it should return status code 500 and throw internal error', async () => {
    const req = {
      body: {
        username: "test@gmail.com",
      }
    }
    const res = mockResponse();

    jest.spyOn(User, 'findOne').mockImplementation(() => {
      throw Error();
    })
    await accountController.forgotPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errors: ['Something went wrong please try again']
    });
  })
 })
});
