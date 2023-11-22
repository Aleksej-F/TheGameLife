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
    
  }
  
  generate() {
    this.pole = Array(this.width)
    let poles = ``
    // this.pole.map((x) => x = new Array(height))
    for (let w = 0 ;w < this.width; w++ ){
      this.pole[w] = new Array(this.height)
      for (let h = 0 ;h < this.height; h++ ){
        this.pole[w][h] = 0
        poles = poles + `
        <div id="w${w}h${h}" class="cell" onClick="pole.select({w:${w},h:${h}})">
        
        </div>
        `
      }
    }
    let div = document.createElement('div')
    div.className = "pole"
    div.style.gridTemplateColumns = `repeat(${this.width},20px)`
    div.style.gridTemplateRow = `repeat(${this.height},20px)`
    div.style.width = `${20*this.width + 2*(this.width-1)}px`
    div.style.height = `${20*this.height + 2*(this.height-1)}px`
    div.innerHTML = poles
    const app = document.querySelector('#app')
    app.innerHTML = ''
    console.dir(app)
    // app.innerHTML = poles
    app.append(div)

    app.insertAdjacentHTML('beforeend', this.addPanel())
    
  }
  addPanel(){
    console.log("панель")
    const panel = `<div id="panel">
    <p>Установите начальное состояние или нажмите 
    сгернерировать для случайной 
    геренерации и нажмите кнопку старт</p>
    <br/>
    <button onClick="pole.generateState()"> сгенерировать</button>
    <br/>
    <button onClick="pole.start()"> старт </button>
    </div>
    `
    return panel
    
  }
  generateState(){
    console.log("генер")
  }
  start(){
    console.log("start")
    console.log(this.pole)
  }
  select({w,h}){
    this.pole[w][h] = this.pole[w][h] === 0 ? 1: 0
    const cell = document.querySelector(`#w${w}h${h}`)
    cell.classList.toggle('select');
  }
}

const form = new Dialog();
form.creatForm()