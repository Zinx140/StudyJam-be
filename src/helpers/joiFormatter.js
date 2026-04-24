const joiFormatter = (errors) => {
  const err_messages = errors.details.reduce((result, err) => {
    const key = err.context.key;
    if (key in result) {
      result[key].push(err.message);
    } else {
      result[key] = err.message;
    }
    return result;
  }, {});

  return err_messages;
};

module.exports = joiFormatter;
