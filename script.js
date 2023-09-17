const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const GRAVITY = 0.2
const GROUND = 4 * canvas.height / 5 
const SPEED = 10


let pressedKeys = {}


class Player {
    constructor(x, y, w, h, col, keys) {
        this.x = x
        this.y = y
        this.h = h
        this.w = w
        this.col = col
        this.keys = keys
        this.vel = { x: 0, y: 0 }
        this.jumping = false
    }

    getKey(movement) {
        return pressedKeys[this.keys[movement]]
    }

    move() {
        let offX = 0
        if (this.getKey('left')) offX -= .1

        if (this.getKey('right')) offX += .1

        if (this.getKey('down')) this.vel.y += .1

        if (this.getKey('jump') && !this.jumping) {
            this.vel.y = -3
            this.jumping = true
        }

        if (offX === 0) { this.vel.x *= .8 }

        this.vel.x = clamp(-1, this.vel.x + offX, 1)
        this.vel.y = clamp(-10, this.vel.y + GRAVITY, 10)
        this.x += this.vel.x * SPEED
        this.y += this.vel.y * SPEED

        if (this.y + this.h > GROUND) {
            this.y = GROUND - this.h
            if (!this.getKey('jump')) this.jumping = false
        }
        
        if (this.y < 0) { this.y = 0 }
    }

    draw() {
        c.fillStyle = this.col
        c.fillRect(this.x, this.y, this.w, this.h)
    }

    update() {
        this.move()

        this.draw()
    }
}

function clamp(min, val, max) {
    if (val < min) return min
    if (val > max) return max
    return val
}

function overLapping(x1, y1, h1, w1, x2, y2, h2, w2) {
    return (x1 > x2

        )

}

function createPlayer(x, y, w, h, col, keys) {
    return new Player(x, y, w, h, col, {
        'left': keys[0],
        'right': keys[1],
        'up': keys[2],
        'down': keys[3],
        'jump': keys[4]
    })
}

let player1 = createPlayer(400, 400, 50, 100, 'blue', ['a', 'd', 'w', 's', 'w'])
let player2 = createPlayer(800, 400, 50, 100, 'red', ['arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'arrowup'])



async function animate() {
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player1.update()
    player2.update()

    requestAnimationFrame(animate)
}; animate()



window.addEventListener('keydown', (e) => {
    let key = e.key.toLowerCase()
    pressedKeys[key] = true
})

window.addEventListener('keyup', (e) => {
    let key = e.key.toLowerCase()
    pressedKeys[key] = false
})