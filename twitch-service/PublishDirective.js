const { defaultFieldResolver } = require("graphql");
const { SchemaDirectiveVisitor } = require("apollo-server");

class PublishDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { event } = this.args;

    field.resolve = async function (source, args, context, info) {
      const result = await resolve.call(this, source, args, context, info);

      try {
        const { pusher } = context;
        pusher.trigger(process.env.PUSHER_CHANNEL, event, result);
      } catch (error) {
        console.error(`Unable to send pusher event: ${error.message}`);
      }

      return result;
    };
  }
}

module.exports = PublishDirective;
