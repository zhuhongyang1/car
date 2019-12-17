class LazyLoad {
    constructor(el, flag) {
        this.viewHeight = document.documentElement.clientHeight 
        this.viewWidth = document.documentElement.clientWidth
        this._loadImg()
        this._init(el, flag)
    }

    _init(el, flag) {
        if (el) {
            if (flag) {
                el.on('scroll', () => {
                    this._loadImg()
                })
            } else {
                el = document.querySelector(el)
                el.addEventListener('scroll', () => {
                    this._loadImg()
                })    
            }
              
        } else {
            window.addEventListener('scroll', () => {
                this._loadImg()
            })
        }

    }

    _isLoad(el) {
        let src = el.dataset.original 
        let bg = el.style.backgroundImage 
        return `url(${src})` === bg 
    }

    _loadImg() {
        let eles = [...document.querySelectorAll('[data-original][lazyload]')]
        eles.forEach(item => {
            let src = item.dataset.original
            if (!src) return 
            let { top, bottom } = item.getBoundingClientRect()
          
            if (bottom >= 0 && top < this.viewHeight) {
                console.log(bottom, top, this.viewHeight)
                if (!this._isLoad(item)) {
                    item.style.backgroundImage = `url(${src})`
                }
            }

        })
    }
}
export default LazyLoad