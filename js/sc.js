let pole = {}
class Dialog {
  creatForm(){
    const app = document.querySelector('#app')
    
    const form = `
    <form  onsubmit="event.preventDefault(); return this.submitForm();>
      <label class="label">Укажите размер поля</label>
      <div>
        <label class="label">ширина</label>
        <input id="width" required type="number" />
      </div>
      <br/>
      <div>
        <label class="label">высота</label>
        <input id="height" required type="number" />
      </div>
      <br/>
      <button 
        type="submit" class="button"
      >
        Создать
      </button>
    </form>
    `
    app.insertAdjacentHTML('beforeend', form)
    const element = document.querySelector('form');
    element.addEventListener('submit', event => {
      event.preventDefault();
      this.submitForm()
    });
  }
  submitForm(){
    console.log('сообщение')
    const width = document.querySelector('#width').valueAsNumber
    const height = document.querySelector('#height').valueAsNumber
    console.log(width)
    console.log(height)
    pole = new Pole({width,height});
    pole.generate()
    
    return false
  }

}

class Pole {
  constructor({width,height}){
    this.width = width
    this.height = height
    this.pole = []
    this.newPole = []
    this.stopGeneryt = true
  }
  
  generate() {
    this.pole = Array(this.height)
    this.newPole = Array(this.height)
    let poles = ``
    // this.pole.map((x) => x = new Array(height))
    for (let h = 0 ;h < this.height; h++ ){
      this.pole[h] = new Array(this.width)
      this.newPole[h] = new Array(this.width)
      for (let w= 0 ;w < this.width; w++ ){
        this.pole[h][w] = 0
        this.newPole[h][w] = 0
        poles = poles + `
        <div id="h${h}w${w}" class="cell" onClick="pole.select({w:${w},h:${h}})">
        
        </div>
        `
      }
    }
    let div = document.createElement('div')
    div.className = "pole"
    div.style.gridTemplateColumns = `repeat(${this.width},30px)`
    div.style.gridTemplateRow = `repeat(${this.height},30px)`
    div.style.width = `${30*this.width + 2*(this.width-1)}px`
    div.style.height = `${30*this.height + 2*(this.height-1)}px`
    div.innerHTML = poles
    const app = document.querySelector('#app')
    
    app.innerHTML = ''
    console.dir(app)
    // app.innerHTML = poles
    app.append(div)

    app.insertAdjacentHTML('afterbegin', this.addPanel())
    app.insertAdjacentHTML('afterbegin', this.addLoader())
    document.addEventListener('keydown', function(event) {
      console.log (event.keyCode)
      if (event.keyCode == 13 ) {
        this.stopGeneryt = false
      }
      if (event.keyCode == 32 ) {
        this.start
      }
    });
  }
  addPanel(){
    console.log("панель")
    const panel = `<div id="panel" >
    <p>Установите начальное состояние или нажмите 
    сгернерировать для случайной 
    геренерации. Затем нажмите кнопку старт или пробел.</p>
    <br/>
    <button onClick="pole.generateState()"> сгенерировать</button>
    <br/>
    <button onClick="pole.start()"> старт </button>
    </div>
    `
    return panel
    
  }
  addLoader(){
    console.log("loader")
    const panel = `<div id="loader" class="loader-cont">
      <div class="loader-container">
        <div class="loader"> </div>
      </div>
    </div>
    `
    return panel
  }
  async toggleVisibleLoader(){
    const loader = document.querySelector(`#loader`)
    loader.classList.add('loadervisible')
  }
  async generateState(){
    const loader = document.querySelector(`#loader`)
    loader.classList.toggle('loadervisible')
    console.log("генер")
    const cellTotal = Math.floor(Math.random() * (this.width * this.height - 1) )
    this.generate()
    let h = 0
    let w = 0
    for (let i = 1; i < cellTotal ; i++){
      let now = new Date();
      do {
        h = Math.floor(Math.random() * ( this.height - 1))
        w = Math.floor(Math.random() * (this.width - 1))
        if (new Date() - now > 60 ) {this.stopGeneryt = false }
      } while (this.pole[h][w] === 1 && this.stopGeneryt)
      this.pole[h][w] = 1
      const cell = document.querySelector(`#h${h}w${w}`)
      cell.classList.add('select');
    }
    loader.classList.remove('loadervisible')
    alert('поле сгенерировано')
    
  }
  async start(){
    console.log("start")
    // await this.toggleVisibleLoader()
    await this.fieldTaversal()
    // await this.toggleVisibleLoader()
  }
  select({w,h}){
    this.pole[h][w] = this.pole[h][w] === 0 ? 1: 0
    const cell = document.querySelector(`#h${h}w${w}`)
    if (this.pole[h][w] === 0) {
      cell.classList.remove('select');
    } else { 
      cell.classList.add('select');
    }
    
  }
  async fieldTaversal(){
    let counter = 0
    let now = new Date();
    for (let h = 0 ;h < this.height; h++ ){
      for (let w = 0 ; w < this.width; w++ ){
        
        if (this.pole[h][w-1 >= 0 ? w-1 : this.width-1] === 1){ counter++ }
        // document.querySelector(`#h${h}w${w-1 >= 0 ? w-1 : this.width-1}`).classList.add('select')
        // setTimeout(() => document.querySelector(`#h${h}w${w-1 >= 0 ? w-1 : this.width-1}`).classList.remove('select'), 200)
        
        if (this.pole[h-1 >=0 ? h-1 : this.height-1][w-1 >= 0 ? w-1 : this.width-1] === 1){ counter++ }
        if (this.pole[h-1 >=0 ? h-1 : this.height-1][w] === 1){ counter++ }
        if (this.pole[ h-1 >= 0 ? h-1 : this.height-1][w + 1 < this.width ? w+1 : 0] === 1){ counter++ }
        if (this.pole[h][w + 1 < this.width ? w+1 : 0] === 1){ counter++ }
        if (this.pole[h+1 < this.height ? h+1 : 0][w + 1 < this.width ? w+1 : 0] === 1){ counter++ }
        if (this.pole[h+1 < this.height ? h+1 : 0][w] === 1){ counter++ }
        if (this.pole[h+1 < this.height ? h+1 : 0][w-1 >= 0 ? w-1 : this.width-1] === 1){ counter++ }

        const cell = document.querySelector(`#h${h}w${w}`)
        cell.innerHTML = `${counter}/${this.pole[h][w]}`
        
        if (this.pole[h][w] === 0 && counter > 2){
          this.newPole[h][w] = 1 
          cell.classList.add('select')
        } else if (this.pole[h][w] === 1 && (counter < 2 || counter > 3 )) {
          this.newPole[h][w] = 0
          cell.classList.remove('select')
        }
                
        counter = 0
      }
    }
    const end = new Date() - now
    alert(`На ход затрачено секунд - ${end}`)
    this.pole = JSON.parse(JSON.stringify(this.newPole))
  }
}

const form = new Dialog();
form.creatForm()