jest.useFakeTimers();
const {
  Category, User
} = require('../../src/models/index');
const categoryController = require('../../src/controllers/categoryController');

require('mysql2/node_modules/iconv-lite').encodingExists('foo');

jest.useFakeTimers()
const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Test category controller', () => {
  describe('Test create category', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and category data', async () => {
      const req = {
        body: {
          category_name: "Marketing1",
          description: "Test",
          department_id: 6,
        },
        user: {
          user_id: 6
        }
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Category, 'create').mockResolvedValue({
        created_date: "2022-04-01T18:32:46.217Z",
        category_id: 6,
        category_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });
      const res = mockResponse();

      await categoryController.createCategory(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          created_date: "2022-04-01T18:32:46.217Z",
          category_id: 6,
          category_name: "Marketing1",
          description: "Test",
          manager_id: 69
        },
      });
    })

    it('it should return res status 500 and user not found', async () => {
      const req = {
        body: {
          category_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
        user: {
          user_id: 2
        }
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined);

      jest.spyOn(Category, 'create').mockResolvedValue({
        created_date: "2022-04-01T18:32:46.217Z",
        category_id: 6,
        category_name: "Marketing1",
        description: "Test",
        manager_id: 12312
      });
      const res = mockResponse();

      await categoryController.createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["User not found"] },
      );
    })

    it('it should return res status 500 and throw Something went wrong please try again', async () => {
      const req = {
        body: {
          category_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
        user: {
          user_id: 2
        }
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id:6
      });

      jest.spyOn(Category, 'create').mockResolvedValue(null);
      const res = mockResponse();

      await categoryController.createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["Something went wrong please try again"] },
      );
    })

    it('it should return res status 500 and throw internal error', async () => {
      const req = {
        body: {
          category_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Category, 'create').mockResolvedValue(undefined);
      const res = mockResponse();

      await categoryController.createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["Something went wrong please try again"] },
      );
    })
  })

  describe('Test update category', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        body: {
          category_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Category, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        category_id: 6,
        category_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 74,
      });

      jest.spyOn(Category, 'update').mockResolvedValue([1]);
      const res = mockResponse();

      await categoryController.updateCategory(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [1]
      });
    })

    it('should return res status 500 and false, cannot found category', async () => {
      const req = {
        body: {
          category_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };
      const res = mockResponse();
      jest.spyOn(Category, 'findOne').mockResolvedValueOnce(undefined);
      await categoryController.updateCategory(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ errors: ["Something went wrong please try again"] },);
    })

    it('it should return res status 500 and false, cannot found user', async () => {
      const req = {
        body: {
          category_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Category, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        category_id: 6,
        category_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined);

      const res = mockResponse();

      await categoryController.updateCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ errors: ["User not found"] },);
    })

    it('it should return res status 404 and false, throw internal error', async () => {
      const req = {
        body: {
          category_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Category, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        category_id: 6,
        category_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Category, 'update').mockResolvedValue(undefined);

      const res = mockResponse();

      await categoryController.updateCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        { errors: [undefined] },
      );
    })

    it('it should return res status 500 and false, throw internal error', async () => {
      const req = {
        body: {
          category_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Category, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        category_id: 6,
        category_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Category, 'update').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await categoryController.updateCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["Something went wrong please try again"] },
      );
    })
  })

  describe('Test get one category', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        params: {
          category_id: 6
        },
      };

      jest.spyOn(Category, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        category_id: 6,
        category_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });

      const res = mockResponse();

      await categoryController.getOneCategory(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          updated_date: "2022-04-01T18:32:46.217Z",
          category_id: 6,
          category_name: "Marketing1",
          description: "Test",
          manager_id: 69
        }
      });
    })

    it('it should return res status 500 and category not found', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Category, 'findOne').mockResolvedValueOnce(null);

      const res = mockResponse();

      await categoryController.getOneCategory(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Category not found"],
      });
    })

    it('should return res status 500 and throw internal error', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Category, 'findOne').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await categoryController.getOneCategory(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Something went wrong please try again"],
      });
    })
  })

  describe('Test get all category', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        
      };

      jest.spyOn(Category, 'findAll').mockResolvedValueOnce([{
        updated_date: "2022-04-01T18:32:46.217Z",
        category_id: 6,
        category_name: "Marketing1",
        description: "Test",
        manager_id: 69
      }]);

      const res = mockResponse();

      await categoryController.getCategory(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [{
          updated_date: "2022-04-01T18:32:46.217Z",
          category_id: 6,
          category_name: "Marketing1",
          description: "Test",
          manager_id: 69
        }]
      });
    })

    it('should return res status 500 and category not found', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Category, 'findAll').mockResolvedValueOnce(null);

      const res = mockResponse();

      await categoryController.getCategory(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Category not found"],
      });
    })

    it('should return res status 500 and throw internal error', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Category, 'findAll').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await categoryController.getCategory(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Something went wrong please try again"],
      });
    })
  })

  describe('Test delete category', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        params: {
          category_id: 6
        }
      };

      jest.spyOn(Category, 'destroy').mockResolvedValueOnce(true);

      const res = mockResponse();

      await categoryController.deleteCategory(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: true
      });
    })

    it('it should return res status 500 and throw internal error', async () => {
      const req = {
        params: {
          category_id: 6
        }
      };

      jest.spyOn(Category, 'destroy').mockResolvedValueOnce(false);

      const res = mockResponse();

      await categoryController.deleteCategory(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errors: ["Something went wrong please try again"],
       });
    })

    it('should return res status 500 and throw internal error in catch', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Category, 'destroy').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await categoryController.deleteCategory(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Something went wrong please try again"],
      });
    })
  })
})
