function clock(n){

    if(n <= 0)
        n = 0

    let s = parseInt(n%60);
    let m = parseInt(n/60);
    let h = parseInt(n/60/60);
    
    m = ( m < 10 ) ? '0'+ m%60 : m%60
    s = ( s < 10 ) ? '0'+ s%60 : s%60
    h = ( h < 10 ) ? '0'+ h%24 : h%24

    return h+":"+m+":"+s
}

function clock_timestamp(timestamp){
    let d = new Date(timestamp)
    let [h, m, s] = [ d.getHours(), d.getMinutes(), d.getSeconds() ]

    h = h < 10 ? "0"+h : h
    m = m < 10 ? "0"+m : m
    s = s < 10 ? "0"+s : s

    return h+":"+m+":"+s
}

let diference = {
    seconds(a,b) { return parseInt((b-a)/1000)                     },
    minutes(a,b) { return parseInt((b-a)/1000/60)        },
    hours(a,b)   { return parseInt((b-a)/1000/60/60)     },
    days(a,b)    { return parseInt((b-a)/1000/60/60/24)  },
}

function addSeconds(a,b) { a = a.setTime(a.getTime()+b*1000)         }
function addMinutes(a,b) { a = a.setTime(a.getTime()+b*1000*60)      }
function addHours(a,b)   { a = a.setTime(a.getTime()+b*1000*60*60)     }
function addDays(a,b)    { a = a.setTime(a.getTime()+b*1000*60*60*24)   }

function renew(){

    let new_date1 = new Date()
    let new_date2 = new Date()

    addMinutes(new_date1, maxT1)
    addMinutes(new_date2, maxT2)

    localStorage.removeItem('limitTimeCount')
    localStorage.removeItem('limitTime')

    localStorage.setItem('limitTimeCount', new_date1)
    localStorage.setItem('limitTime', new_date2)

}

function check(){
    
    let t1 = new Date()
    let t2 = new Date(localStorage.getItem('limitTimeCount'))
    let t3 = new Date(localStorage.getItem('limitTime'))

    if(diference.seconds(t1,t2) < 0)
        game.paused = true

    if(diference.seconds(t1,t3) < 0){
        game.paused = false
        renew()
    }

    
}

class GameTime{

    constructor(){

        this.currentTime = 0

        this.t1 = localStorage.getItem('t1')
        this.t2 = localStorage.getItem('t2')

    }

    renew(ta, tb){

        let date = new Date()

        this.t1 = date.getTime() + 1000 * 60 * ta
        this.t2 = date.getTime() + 1000 * 60 * tb

        localStorage.removeItem('t1')
        localStorage.removeItem('t2')

        localStorage.setItem('t1', this.t1)
        localStorage.setItem('t2', this.t2)

    }

    check(){

        this.now = new Date().getTime()
        
        this.dif1 = parseInt((this.t1-this.now)/1000)
        this.dif2 = parseInt((this.t2-this.now)/1000)
        
        if(this.dif1 < 0) this.dif1 = 0;   
        if(this.dif2 < 0) this.dif2 = 0;   
        
        div_t1.innerHTML = clock(this.dif1)
        div_t2.innerHTML = clock(this.dif2)

    }
}

let gameTime = new GameTime()
gameTime.renew( 5 , 10 )

// gameTime.check()







