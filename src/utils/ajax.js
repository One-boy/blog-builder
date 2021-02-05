// ajax实现

/**
 *
 * @param {*} _method GET或POST
 * @param {*} _url 请求的url
 * @param {*} _data 请求的数据
 * @param {*} success 成果回调
 * @param {*} fail 失败回调
 */
export default function ajax(_method, _url, _data, success, fail) {
  var xhr = new XMLHttpRequest()
  xhr.open(_method, _url, true)
  xhr.timeout = 30000 // 30s
  xhr.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  )
  xhr.onload = () => {
    if (!_validateStatus(xhr.status)) {
      // 拒绝
      fail && fail(_getTips("invalidStatus") + xhr.status)
    } else {
      // 数据
      success && success(xhr.responseText)
    }
  }
  xhr.onabort = () => {
    fail && fail(_getTips("reqCancel"))
  }
  xhr.onerror = err => {
    fail && fail(_getTips("netError"))
  }
  xhr.ontimeout = () => {
    fail && fail(_getTips("reqTimeout"))
  }

  let data = ""
  if (typeof _data === "object" && !(_data instanceof FormData)) {
    let reqArray = []
    Object.keys(_data).forEach(key => {
      reqArray.push(`${key}=${encodeURIComponent(_data[key])}`)
    })
    data = reqArray.join("&")
  }

  xhr.send(data)
}

// http status验证
function _validateStatus(status) {
  return status >= 200 && status < 300
}

// 提示信息
function _getTips(code) {
  var tips = {
    reqTimeout: {
      CN: "请求超时",
    },
    netError: {
      CN: "网络错误",
    },
    reqCancel: {
      CN: "请求被取消",
    },
    invalidStatus: {
      CN: "无效状态码",
    },
  }
  return tips[code] ? tips[code]["CN"] : "Unknown Code " + code + " In getTips."
}
