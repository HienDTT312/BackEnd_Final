jest.useFakeTimers();
const {
  Aggrement, User
} = require('../../src/models/index');
const aggrementController = require('../../src/controllers/aggrementController');

require('mysql2/node_modules/iconv-lite').encodingExists('foo');

jest.useFakeTimers()
const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Test aggrement controller', () => {
  describe('Test create aggrement', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and aggrement data', async () => {
      const req = {
        body: {
          aggrement_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Aggrement, 'create').mockResolvedValue({
        created_date: "2022-04-01T18:32:46.217Z",
        aggrement_id: 6,
        aggrement_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });
      const res = mockResponse();

      await aggrementController.createAggrement(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          created_date: "2022-04-01T18:32:46.217Z",
          aggrement_id: 6,
          aggrement_name: "Marketing1",
          description: "Test",
          manager_id: 69
        },
      });
    })

    it('it should return res status 500 and user not found', async () => {
      const req = {
        body: {
          aggrement_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Aggrement, 'create').mockResolvedValue(undefined);
      const res = mockResponse();

      await aggrementController.createAggrement(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["Something went wrong please try again"] },
      );
    })

    it('it should return res status 500 and throw internal error', async () => {
      const req = {
        body: {
          aggrement_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Aggrement, 'create').mockResolvedValue(undefined);
      const res = mockResponse();

      await aggrementController.createAggrement(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["Something went wrong please try again"] },
      );
    })

    it('it should return res status 500 and throw internal error in catch', async () => {
      const req = {
        body: {
          aggrement_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Aggrement, 'create').mockImplementation(() => {
        throw Error();
      })
      const res = mockResponse();

      await aggrementController.createAggrement(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["Something went wrong please try again"] },
      );
    })
  })

  describe('Test update aggrement', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        body: {
          aggrement_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Aggrement, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        aggrement_id: 6,
        aggrement_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 74,
      });

      jest.spyOn(Aggrement, 'update').mockResolvedValue([1]);
      const res = mockResponse();

      await aggrementController.updateAggrement(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [1]
      });
    })

    it('should return res status 500 and false, cannot found aggrement', async () => {
      const req = {
        body: {
          aggrement_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };
      const res = mockResponse();
      jest.spyOn(Aggrement, 'findOne').mockResolvedValueOnce(undefined);
      await aggrementController.updateAggrement(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ errors: ["Aggrement not found"] },);
    })

    it('it should return res status 404 and false, throw internal error', async () => {
      const req = {
        body: {
          aggrement_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Aggrement, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        aggrement_id: 6,
        aggrement_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Aggrement, 'update').mockResolvedValue(undefined);

      const res = mockResponse();

      await aggrementController.updateAggrement(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        { errors: [undefined] },
      );
    })

    it('it should return res status 500 and false, throw internal error', async () => {
      const req = {
        body: {
          aggrement_name: "Marketing1",
          description: "Test",
          manager_id: 6,
        },
      };

      jest.spyOn(Aggrement, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        aggrement_id: 6,
        aggrement_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });


      jest.spyOn(User, 'findOne').mockResolvedValueOnce({
        user_id: 6,
      });

      jest.spyOn(Aggrement, 'update').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await aggrementController.updateAggrement(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        { errors: ["Something went wrong please try again"] },
      );
    })
  })

  describe('Test get one aggrement', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        params: {
          aggrement_id: 6
        },
      };

      jest.spyOn(Aggrement, 'findOne').mockResolvedValueOnce({
        updated_date: "2022-04-01T18:32:46.217Z",
        aggrement_id: 6,
        aggrement_name: "Marketing1",
        description: "Test",
        manager_id: 69
      });

      const res = mockResponse();

      await aggrementController.getOneAggrement(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          updated_date: "2022-04-01T18:32:46.217Z",
          aggrement_id: 6,
          aggrement_name: "Marketing1",
          description: "Test",
          manager_id: 69
        }
      });
    })

    it('it should return res status 500 and aggrement not found', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Aggrement, 'findOne').mockResolvedValueOnce(null);

      const res = mockResponse();

      await aggrementController.getOneAggrement(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Aggrement not found"],
      });
    })

    it('should return res status 500 and throw internal error', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Aggrement, 'findOne').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await aggrementController.getOneAggrement(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Something went wrong please try again"],
      });
    })
  })

  describe('Test get all aggrement', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {

      };

      jest.spyOn(Aggrement, 'findAll').mockResolvedValueOnce([{
        updated_date: "2022-04-01T18:32:46.217Z",
        aggrement_id: 6,
        aggrement_name: "Marketing1",
        description: "Test",
        manager_id: 69
      }]);

      const res = mockResponse();

      await aggrementController.getAggrement(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [{
          updated_date: "2022-04-01T18:32:46.217Z",
          aggrement_id: 6,
          aggrement_name: "Marketing1",
          description: "Test",
          manager_id: 69
        }]
      });
    })

    it('should return res status 500 and aggrement not found', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Aggrement, 'findAll').mockResolvedValueOnce(null);

      const res = mockResponse();

      await aggrementController.getAggrement(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Aggrement not found"],
      });
    })

    it('should return res status 500 and throw internal error', async () => {
      const req = {
        params: {
          wrong_test: 6
        },
      };

      jest.spyOn(Aggrement, 'findAll').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await aggrementController.getAggrement(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Something went wrong please try again"],
      });
    })
  })

  describe('Test delete aggrement', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should return res status 200 and true', async () => {
      const req = {
        params: {
          aggrement_id: 6
        }
      };

      jest.spyOn(Aggrement, 'destroy').mockResolvedValueOnce(true);

      const res = mockResponse();

      await aggrementController.deleteAggrement(req, res);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: true
      });
    })

    it('it should return res status 500 and throw internal out catch', async () => {
      const req = {
        params: {
          aggrement_id: 6
        }
      };

      jest.spyOn(Aggrement, 'destroy').mockResolvedValueOnce(false);

      const res = mockResponse();

      await aggrementController.deleteAggrement(req, res);


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

      jest.spyOn(Aggrement, 'destroy').mockImplementation(() => {
        throw new Error();
      });

      const res = mockResponse();

      await aggrementController.deleteAggrement(req, res);


      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
       errors: ["Something went wrong please try again"],
      });
    })


  })
})
