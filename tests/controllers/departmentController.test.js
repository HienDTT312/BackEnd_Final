jest.useFakeTimers();
const {
  Department, User
} = require('../../src/models/index');
const departmentController = require('../../src/controllers/departmentController');

require('mysql2/node_modules/iconv-lite').encodingExists('foo');

jest.useFakeTimers()
const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Test department controller', () => {
  describe('Test create deparment', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and department data', async () => {
      const req = {
        body: {
          department_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Department, 'create').mockResolvedValue({
        created_date: "2022-04-01T18:32:46.217Z",
        department_id: 6,
        department_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });
      const res = mockResponse();

      await departmentController.createDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          created_date: "2022-04-01T18:32:46.217Z",
          department_id: 6,
          department_name: "Marketing1",
          description: "Test",
          manager_id: 69
        },
      });
    })

    it('it should return res status 500 and user not found', async () => {
      const req = {
        body: {
          department_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined);

      jest.spyOn(Department, 'create').mockResolvedValue({
        created_date: "2022-04-01T18:32:46.217Z",
        department_id: 6,
        department_name: "Marketing1",
        description: "Test",
        manager_id: 12312
      });
      const res = mockResponse();

      await departmentController.createDepartment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["User not found"] },
      );
    })

    it('it should return res status 500 and throw internal error', async () => {
      const req = {
        body: {
          department_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Department, 'create').mockResolvedValue(undefined);
      const res = mockResponse();

      await departmentController.createDepartment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["Something went wrong please try again"] },
      );
    })

    it('it should return res status 500 and throw internal error in catch', async () => {
      const req = {
        body: {
          department_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Department, 'create').mockImplementation(() => {
        throw Error();
      })
      const res = mockResponse();

      await departmentController.createDepartment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["Something went wrong please try again"] },
      );
    })
  })

  describe('Test update deparment', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        body: {
          department_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        department_id: 6,
        department_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 74,
      });

      jest.spyOn(Department, 'update').mockResolvedValue([1]);
      const res = mockResponse();

      await departmentController.updateDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [1]
      });
    })

    it('should return res status 500 and false, cannot found department', async () => {
      const req = {
        body: {
          department_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };
      const res = mockResponse();
      jest.spyOn(Department, 'findOne').mockResolvedValueOnce(undefined);
      await departmentController.updateDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ errors: ["Department not found"] },);
    })

    it('it should return res status 500 and false, cannot found user', async () => {
      const req = {
        body: {
          department_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        department_id: 6,
        department_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined);

      const res = mockResponse();

      await departmentController.updateDepartment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ errors: ["User not found"] },);
    })

    it('it should return res status 404 and false, throw internal error', async () => {
      const req = {
        body: {
          department_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        department_id: 6,
        department_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Department, 'update').mockResolvedValue(undefined);

      const res = mockResponse();

      await departmentController.updateDepartment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        { errors: [undefined] },
      );
    })

    it('it should return res status 500 and false, throw internal error', async () => {
      const req = {
        body: {
          department_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        department_id: 6,
        department_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Department, 'update').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await departmentController.updateDepartment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["Something went wrong please try again"] },
      );
    })
  })

  describe('Test get one department', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        params: {
          department_id: 6
        },
      };

      jest.spyOn(Department, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        department_id: 6,
        department_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });

      const res = mockResponse();

      await departmentController.getOneDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          updated_date: "2022-04-01T18:32:46.217Z",
          department_id: 6,
          department_name: "Marketing1",
          description: "Test",
          manager_id: 69
        }
      });
    })

    it('it should return res status 500 and department not found', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Department, 'findOne').mockResolvedValueOnce(null);

      const res = mockResponse();

      await departmentController.getOneDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Department not found"],
      });
    })

    it('should return res status 500 and throw internal error', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Department, 'findOne').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await departmentController.getOneDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Something went wrong please try again"],
      });
    })
  })

  describe('Test get all department', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        
      };

      jest.spyOn(Department, 'findAll').mockResolvedValueOnce([{
        updated_date: "2022-04-01T18:32:46.217Z",
        department_id: 6,
        department_name: "Marketing1",
        description: "Test",
        manager_id: 69
      }]);

      const res = mockResponse();

      await departmentController.getDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [{
          updated_date: "2022-04-01T18:32:46.217Z",
          department_id: 6,
          department_name: "Marketing1",
          description: "Test",
          manager_id: 69
        }]
      });
    })

    it('should return res status 500 and department not found', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Department, 'findAll').mockResolvedValueOnce(null);

      const res = mockResponse();

      await departmentController.getDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Department not found"],
      });
    })

    it('should return res status 500 and throw internal error', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Department, 'findAll').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await departmentController.getDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Something went wrong please try again"],
      });
    })
  })

  describe('Test delete department', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        params: {
          department_id: 6
        }
      };

      jest.spyOn(Department, 'destroy').mockResolvedValueOnce(true);

      const res = mockResponse();

      await departmentController.deleteDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: true
      });
    })

    it('it should return res status 500 and throw internal out catch', async () => {
      const req = {
        params: {
          department_id: 6
        }
      };

      jest.spyOn(Department, 'destroy').mockResolvedValueOnce(false);

      const res = mockResponse();

      await departmentController.deleteDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: ["Something went wrong please try again"],
       });
    })

    it('should return res status 500 and throw internal error', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Department, 'destroy').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await departmentController.deleteDepartment(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Something went wrong please try again"],
      });
    })

    
  })
})
