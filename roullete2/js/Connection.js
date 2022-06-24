const urlUser = 'http://localhost:3000/users/'
const urlPorcentage = 'http://localhost:3000/porcentage/'

class Connection{

  constructor(id){
    this.id = id
  }

  setPorcentage(){
    this.get(urlPorcentage).then(e=>{
      this.porcentage = e
    })
  }

  async connect(id){
    this.id = id
    return this.get(urlUser + this.id).then(e=>{
      this.user = e
      return e
    }).then(e=>{
      this.reset()
      this.refresh()
      delete user.user
    })
  }
  
  async get(url){ return fetch(url).then(e=> e.json() ) }
  async post(url){ return fetch(url).then(e=> e.json() ) }
}



