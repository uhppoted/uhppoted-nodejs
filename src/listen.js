const uhppoted = require('./uhppoted.js')

function listen (ctx, onEvent, onError) {
  const context = {
    config: ctx.config,
    logger: (m) => { console.log(m) }
  }

  const handler = {
    received: function (event) {
      if (onEvent) {
        onEvent(event)
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