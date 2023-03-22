exports.createRole = async (req ,res) => {
  const { role_name } = req.body;

  const is_insert = await Role.create({
    role_name,
  });

  logger.info('Role created success', { is_insert });
  res.send(is_insert)
};
