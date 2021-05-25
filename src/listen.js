const uhppoted = require('./uhppoted.js')
const translate = require('./internationalisation.js').translate
const log = require('./logger.js')

function listen (ctx, onEvent, onError) {
  const context = {
    config: ctx.config,
    logger: ctx.logger ? ctx.logger : (m) => { log(m) }
  }

  const handler = {
    received: function (event) {
      if (onEvent) {
        onEvent(translate(event))
      }
    },

    onerror: function (err) {
      if (onError) {
        onError(err)
      }
    }
  }

  const socket = uhppoted.listen(context, handler)

  return {
    close: function () {
      if (socket) {
        socket.close()
      }
    }
  }
}

exports = module.exports = listen
