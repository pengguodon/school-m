class LRMove {
  constructor(element, leftCallback, rightCallback) {
    this.el = element
    this.oldX = 0
    this.flag = false
    this.leftCallback = leftCallback ? leftCallback : ()=>{}
    this.rightCallback = rightCallback ? rightCallback : ()=>{}
  }

  init() {
    this.el.addEventListener("touchstart", (e) => {
      this.oldX = e.changedTouches[0].pageX
      this.flag = true
      this.el.addEventListener("touchmove", this.fnCallback.bind(this))
    })

    this.el.addEventListener("touchend", (e) => {
      this.oldX = 0
    })
  }

  fnCallback(e) {
    if (this.flag === true) {
      if (e.changedTouches[0].pageX > this.oldX && e.changedTouches[0].pageX - this.oldX > 150) {
        this.rightCallback()
        this.flag = false
      }

      if (e.changedTouches[0].pageX < this.oldX && this.oldX - e.changedTouches[0].pageX > 150) {
        this.leftCallback()
        this.flag = false
      }
    }
  }
}

export default LRMove