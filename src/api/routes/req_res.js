const utils = require("../../utils");

const randMinMax = (min, max) => {
  if (min > max) {
    min = min + max;
    max = min - max;
    min = min - max;
  }
  return (parseInt(Math.random().toString().slice(2)) % max) + min;
}

exports.users = (method, req, res) => {

  switch (method) {
    case "post": {
      return res.send(Object.assign(req.body, {
        id: parseInt(Math.random().toString().slice(2)) % 200,
        created_at: new Date()
      }));
    } break;

    case "get": {
      const { id } = req.params;
      return res.send({
        name: ["Arth K. Gajjar", "Trambak Ray", "Symbol Singla", "Aashvit Goyal", "Dhruv Patel", "Maharshi Vyas", "Murtaza Khanjiwala"][randMinMax(0, 7)],
        job: ["Developer", "Designer", "Creator", "Founder", "Researcher"][randMinMax(0, 5)],
        id,
        created_at: new Date()
      });
    } break;

    case "put": {
      return res.send(Object.assign(req.body, {
        updated_at: new Date()
      }));
    } break;

    case "delete": {
      return res.sendStatus(204);
    } break;
  }
}