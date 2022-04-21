const Model = require("./Model.js")

class Show extends Model {
  static get tableName(){
    return "shows"
  }

  static get jsonSchema(){
    return {
      type: "object",
      required: ["title", "premiereYear"],
      properties: {
        title: { type: "string" },
        network: { type: "string" },
        premiereYear: { type: ["string", "integer"] },
        description: { type: "string" }
      }
    }
  }
}


module.exports = Show