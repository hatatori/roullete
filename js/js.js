Object.prototype.ret = function(ar){
    let o = {}
    for(a of ar){
        b = Object.keys(user).indexOf(a)
        c = Object.entries(user)[b]
        o[c[0]] = c[1]
    }
    return o
}

Array.sub = (a,b) => {
    let c = []
    a.map(e=> !b.includes(e) ? c.push(e) : e  ) 
    return c
}

Array.add = (a,b) => {
    return a.concat(b)
}

Math.rand = (min,max) => {
    return parseInt(Math.random() * ((max+1) - min) + min)
}

// user.ret(['id','name'])
// {id: 2, name: 'ana'}