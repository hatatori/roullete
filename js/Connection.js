const apiBaseUrl = 'https://homolog-api.livingsports.net'

const url_antenticacao = apiBaseUrl+'/v1/auth/login/customer'
const url_abrir_roleta = apiBaseUrl+'/v1/roulette/open'
const url_jogar = apiBaseUrl+'/v1/roulette/play'
const url_registrar = apiBaseUrl+'/v1/roulette/{sessionID}/register-number'
const url_historico_roleta = apiBaseUrl+'/v1/roulette/history'

class Connection{

  constructor(){
    // this.email = "livingoficial"
    // this.password = "xuxu2022@@@"
    this.id = 'a28c6d52-c2b5-41fc-a182-7a535b810420'
    this.companyId = '16e683a2-3350-4a6f-abcd-e50394a1979c'

    this.email = "testeroleta"
    this.password = "123456"

    // let con = new Connection()
    this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjNiOTFhMjczYjZhMGY4ZCJ9.eyJzdWIiOiI5NjY5OTJhMi1iYzJjLTQ2YjctOTBmNC04NDUxYzBlNTg4YWQiLCJpc3MiOiIiLCJhdWQiOiIiLCJpYXQiOjE2NTgwOTUwNTUsImV4cCI6MTY2MDY4NzA1NSwianRpIjoiMjBmMzQ2NWU0OGU3MThkIiwiaWQiOiI5NjY5OTJhMi1iYzJjLTQ2YjctOTBmNC04NDUxYzBlNTg4YWQiLCJuYW1lIjoidGVzdGVyb2xldGEiLCJ1c2VybmFtZSI6InRlc3Rlcm9sZXRhIiwiZ3JvdXAiOiJDVVNUT01FUiIsImNyZWF0ZWRBdCI6IjIwMjItMDctMTdUMTg6NTc6MzUtMDM6MDAiLCJpbmRpY2F0aW9uQ29kZSI6InRlc3Rlcm9sZXRhIiwiaXNBY3RpdmUiOmZhbHNlLCJpbXBlcnNvbmF0ZSI6ZmFsc2UsImNvbXBhbnkiOnsiaWQiOiIxNmU2ODNhMi0zMzUwLTRhNmYtYWJjZC1lNTAzOTRhMTk3OWMiLCJuYW1lIjoiTGl2aW5nIFNwb3J0cyIsIm1pbmltdW1XaXRoZHJhd2FsQW1vdW50IjoxNTAsIndpdGhkcmF3YWxJbnRlcnZhbERheXMiOjAsIndpdGhkcmF3YWxEYXlzIjpbIjkiLCIxMCIsIjExIiwiMTUiLCIyMyIsIjI1IiwiMzAiXSwicGl4Ijp7ImtleSI6IjQ2NjI1OTI4MDAwMTYyIiwiaW52b2ljZUxpZmV0aW1lIjoxNDQwLCJpZCI6IiJ9LCJiaXRjb2luIjp7IndhbGxldCI6ImJjMXF5azBnODI5amU2cGYzM3hoanp0OWRkNWVjcnphdXF1OWs2eDg2OSIsImludm9pY2VMaWZldGltZSI6MzAsImlkIjoiIn0sInVzZHQiOnsid2FsbGV0IjoiVFdSNTc4Yk5vRTU5S3Y1ZFdQSjVzYzllV0gyZnpmSzl2QiIsImludm9pY2VMaWZldGltZSI6MzAsImlkIjoiIn0sIndoYXRzYXBwIjp7InN1cHBvcnRQaG9uZSI6Iis1NTExOTM0NjQ1MDUxIiwic3VwcG9ydFRleHQiOiJPbFx1MDBlMSwgdm9jXHUwMGVhIHBvZGVyaWEgdGlyYXIgdW1hIGRcdTAwZmF2aWRhPyIsInN1cHBvcnRHcm91cFVybCI6IiIsImlkIjoiIn19fQ.RJDeYdke3cPWKlFuUovnNeQfvbVXCCE6wngzh_P4QyE'
    // con.connect()

  }

  setToken(token){
    this.token = token
  }

  async connect(){
    
    // autenticação
    // if(localStorage.token == undefined){
      let auth = await fetch(url_antenticacao, { method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({"username":this.email, "password":this.password}) })
      let auth_obj = await auth.json()
      this.token = auth_obj.data.token
      // localStorage.setItem('token', this.token)
    // }

    // localStorage.setItem('token', window.location.search.split('=')[1])
    // this.token = localStorage.token


    // this.token = window.location.search.split('=')[1]

    // if(window.location.search[1] == 't'){
    //   localStorage.setItem('token', window.location.search.split('=')[1])
    //   window.location.href = window.location.origin
    // }

    // if(localStorage.token == 'undefined')
    //   loading_div.t = localStorage.token

    // if(loading_div.t){
    //   this.token = localStorage.token
    // }

    // if(localStorage.token){
    //   this.token = localStorage.token
    //   loading_div.t = localStorage.token
    // }


    
    if(this.token){
      setTimeout(()=>{localStorage.removeItem('token')},100)
    }else{
      render.error()
    }
      

    // this.token = localStorage.token
    // localStorage.removeItem('token')

    


    

    // this.token = window.location.search.split('=')[1]


    // dados da roleta
    let roulette = await fetch(url_abrir_roleta, {method: 'POST',headers: {'Content-Type':'application/json','Authorization': "Bearer "+this.token,'company-id': this.companyId}})
    let roulette_json = await roulette.json()

    // console.log(roulette_json)
    
    this.dataroulette = roulette_json
    this.id = roulette_json.data.id

    loading_div.classList.add('zoom-in-fade-out')

    this.refresh()

  }

  refresh(){

    user.setBalance(con.dataroulette.data.balance)
    user.setBetMax(con.dataroulette.data.dailyLimit)
    
    this.historicRoulette()
    
    // div_t1.innerHTML = "Limite diário: R$"+this.dataroulette.data.dailyLimit
    // div_max_day.innerHTML = "R$ 5"
    user.setBetMax(this.dataroulette.data.dailyLimit)
    
    this.historicplayer()

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
    })
  }

  register(id,num){
    // fetch(`https://homolog-api.livingsports.net/v1/roulette/${this.id}/register-number`,{
    //   method: 'POST',
    //   headers:{
    //     'company-id': this.companyId,
    //     'content-type': 'application/json',
    //     'Authorization': "Bearer "+this.token,
    //   },
    //   body: JSON.stringify({'number':num})
    // })

    fetch(`${apiBaseUrl}/v1/roulette/${id}/register-number`,{
        method:'POST',
        headers:{
          'company-id': this.companyId,
          'content-type': 'application/json',
          'Authorization': "Bearer "+this.token,
        },
        body: JSON.stringify({number:num})
      })
  }

  
  historicRoulette(){
    for(let i of this.dataroulette.data.playerHistory)
      render.historicAdd(i.rouletteNumber)
  }

  historicplayer(){
    for(let i of this.dataroulette.data.playerHistory){
      render.historicplayerAdd(i.result, i.betType.name, i.betAmount, i.rouletteNumber, i.profit)
      // console.log(i)
    }
      
  }

  go(){

    let phrases = [
      'Hoje esse jogo é seu, boa sorte!',
      'Quero te desejar boa sorte no jogo!',
      'Que a sorte te persiga nessa jogada!',
      'Hoje é o dia da virada!'
    ]

    if(render.checkRoll() == false){
      return false
    }

    render.message_information(phrases[Math.rand(0,3)])
    button_play.style.pointerEvents = 'none'

    // render.checkButtonPlay(false)
    let obj = {}

    if(user.group != 'empty'){
      obj = {
        betAmount:user.bet,
        betType:con.dataroulette.data.betTypes.find(e=>e.name==game.betTypes[user.group]).id,
        number: null
      }
    }
    
    if(user.group == 'empty' || user.group == 'zero'){
      obj = {
        betAmount:user.bet,
        betType:con.dataroulette.data.betTypes.find(e=>e.name==game.betTypes[user.group]).id,
        number: parseInt(user.choice)
      }
    }

    // console.log(user.group)
    // console.log(game.betTypes[user.group])
    // console.log(obj.betType)
    // console.log(obj)
    // console.log(con.dataroulette.data.betTypes.find(e=>game.betTypes[user.group]))
    // console.log(con.dataroulette.data.betTypes.find(e=>e.name==game.betTypes[user.group]).id)

    // return false

    fetch(url_jogar,{
      method:'POST',
      headers:{
        'company-id': this.companyId,
        'content-type': 'application/json',
        'Authorization': "Bearer "+this.token,
      },
      body: JSON.stringify(obj)
    }).then(e=>{ 
      return e.json() 
    }).then(e=>{ 

      // console.log("->")
      // console.log(e)
      // console.log(e.status)

      // console.log(e)

      // console.log('->')
      // console.log(e)
      // console.log(obj)

      let list_num = 0 
      let list_num_u = 0 

      if(e.data.result == 'RED'){
        // console.log('red')

        if(!isNaN(parseInt(user.choice)))
          list_num = Array.sub(game.choice.all,[parseInt(user.choice)]) //se for número
        else
          list_num = Array.sub(game.choice.all, game.choice[user.choice]) //se for grupo
        
        let rand = Math.rand(0,list_num.length-1)
        list_num_u = list_num[rand]
        render.play(list_num_u)

      }

      if(e.data.result == 'GREEN'){
        // console.log('green')
        if(!isNaN(parseInt(user.choice)))
          list_num_u = game.choice.all.indexOf(parseInt(user.choice))
        else
          list_num_u = game.choice[user.choice][parseInt(Math.random()*game.choice[user.choice].length-1)]
          render.play(list_num_u)

        // console.log(list_num)
        // console.log(list_num_u)
      }

      user.last = {
        cor: e.data.result, 
        group: game.betTypes[user.group], 
        valor: user.bet, 
        rou: list_num_u, 
        profit: e.data.betProfit
      }

      // console.log("cor: "+e.data.result)
      // console.log("profit: "+e.data.betProfit)

      user.setBetMax(user.maxBet - user.bet)

      render.historicplayerAdd(user.last.cor, user.last.group, user.last.valor, user.last.rou, user.last.profit)

      // render.historicplayerAdd(e.data.result, game.betTypes[user.group], user.bet, list_num_u, user.add)

      con.register(e.data.id , list_num_u)
      // console.log(e.data.id)
      // console.log(list_num_u)

      // console.log(e)
      // console.log(e.data)
      // console.log(e.data.id)
      // obj.betType
      // fetch(`https://homolog-api.livingsports.net/v1/roulette/${e.data.id}/register-number`,{
      //   method:'POST',
      //   headers:{
      //     'company-id': this.companyId,
      //     'content-type': 'application/json',
      //     'Authorization': "Bearer "+this.token,
      //   }
      // })

      button_play.removeAttribute('style')

    })
  }
}


let con = new Connection()

window.addEventListener('message',e=>{
  con.token = e.data.token
  con.apiBaseUrl = e.data.apiBaseUrl
  con.connect()
})


// con.bet(50,'3d42ee1b-757e-41ca-a8a1-45bcc3ac2ef6',12)
// con.register(20)
// render.historicAdd(20)