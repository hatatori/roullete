const url_antenticacao = 'https://homolog-api.livingsports.net/v1/auth/login/customer'
const url_abrir_roleta = 'https://homolog-api.livingsports.net/v1/roulette/open'
const url_jogar = 'https://homolog-api.livingsports.net/v1/roulette/play'
const url_registrar = ' https://homolog-api.livingsports.net/v1/roulette/{sessionID}/register-number'
const url_historico_roleta = 'https://homolog-api.livingsports.net/v1/roulette/history'

class Connection{

  constructor(){

    this.email = "livingoficial"
    this.password = "xuxu2022@@@"
    this.id = 'a28c6d52-c2b5-41fc-a182-7a535b810420'
    this.companyId = '16e683a2-3350-4a6f-abcd-e50394a1979c'

  }

  async connect(){

    // autenticação
    let auth = await fetch(url_antenticacao, { 
      method:'POST', 
      headers: {'Content-Type':'application/json'}, 
      body: JSON.stringify({"username":this.email, "password":this.password}) 
    })

    let auth_obj = await auth.json()
    this.token = auth_obj.data.token
    localStorage.setItem('token', this.token)

    // dados da roleta
    let roulette = await fetch(url_abrir_roleta, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': "Bearer "+this.token,
        'company-id': this.companyId
      }
    })
    let roulette_json = await roulette.json()
    this.dataroulette = roulette_json

    this.refresh()
  }

  refresh(){
    user.setBalance(con.dataroulette.data.balance)
    user.setBetMax(con.dataroulette.data.dailyLimit)

    this.historicRoulette()
  }

  // a28c6d52-c2b5-41fc-a182-7a535b810420
  // con.bet(50,'3d42ee1b-757e-41ca-a8a1-45bcc3ac2ef6',12)
  bet(value, bettype, num){
    fetch(url_jogar, {
      method: 'POST',
      headers: {
        'Authorization': "Bearer "+this.token,
        'company-id': this.companyId
      },
      body:JSON.stringify({
        "betAmount": value,
        "betType": bettype,
        "number": num
       })
    }).then(e=>{
      return e.json()
    }).then(e=>{
      // console.log(e)
    })
  }

  register(num){
    fetch(`https://homolog-api.livingsports.net/v1/roulette/${this.id}/register-number`,{
      method: 'POST',
      headers:{
        'company-id': this.companyId,
        'content-type': 'application/json',
        'Authorization': "Bearer "+this.token,
      },
      body: JSON.stringify({'number':num})
    })
    .then(e=>{
      // console.log(e.json())
    }).catch(e=>{
      console.log('erro')
    })
  }

  historicRoulette(){
    fetch(`https://homolog-api.livingsports.net/v1/roulette/history`,{
      headers:{
        'company-id': this.companyId,
        'content-type': 'application/json',
        'Authorization': "Bearer "+this.token,
      }
    }).then(e=>{
      return e.json()
    }).then(e=>{
      for(let i of e.data){
        // console.log(i)
        render.historicAdd(i.number)
      }
    })
  }

  go(){

    button_play.style.pointerEvents = 'none'

    fetch(url_jogar,{
      method:'POST',
      headers:{
        'company-id': this.companyId,
        'content-type': 'application/json',
        'Authorization': "Bearer "+this.token,
      }
    }).then(e=>{ 
      return e.json() 
    }).then(e=>{ 

      if(e.data.result == 'RED'){
        let list_num   = Array.sub(game.choice['all'],game.choice[user.choice])
        let list_num_u = list_num[parseInt(Math.random()*list_num.length-1)]
        render.play(list_num_u)
        console.log('red')
        this.register(list_num_u)
      }

      if(e.data.result == 'GREEN'){
        let list_num   = game.choice[user.choice]
        let list_num_u = list_num[parseInt(Math.random()*list_num.length-1)]
        render.play(list_num_u)
        console.log('green')
        this.register(list_num_u)
      }

      // button_play.style.pointerEvents = 'none'
      button_play.removeAttribute('style')

    })
  }
}

let con = new Connection()
con.connect()

// con.bet(50,'3d42ee1b-757e-41ca-a8a1-45bcc3ac2ef6',12)
// con.register(20)
// render.historicAdd(20)