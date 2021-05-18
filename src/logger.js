const format = (n, l) => String(n).padStart(l, '0')

function log (msg) {
  const now = new Date()
  const year = format(now.getFullYear(), 4)
  const month = format(now.getMonth() + 1, 2)
  const day = format(now.getDate(), 2)
  const hours = format(now.getHours(), 2)
  const minutes = format(now.getMinutes(), 2)
  const seconds = format(now.getSeconds(), 2)
  const timestamp = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

  console.log(timestamp, msg)
}

exports = module.exports = log
