const S = (s,name) => {  
    if(s && Object.keys(s).length){ 
        window.sessionStorage.setItem(name, JSON.stringify(s));
        console.log(name+"储存成功");
        return s
    }else{
        var p = window.sessionStorage.getItem(name)
        if(p){
            console.log(name+'本地存储取值')
            return JSON.parse(p)
        }
    }
}
const SONGLIST = (data)=>{
    let d = S(data,'SONGLIST')
    return d
}
const SONG = (data)=>{
    let d = S(data,'SONG')
    return d
}
var i = 0
const SRC = (data)=>{
    // var t = ''
    // if(data){
    //     t = {
    //         url : data
    //     }
    // }
    // let d = S(t,'NEWSRC')
    // return d.url
    let d = S(data,'NEWSRC')
    return d
}
// const getPlay = (ii,jj)=>{
//     var i = ii || {}
//     var j = jj || {}
// const getPlay = ()=>{
//     SONG = S(SONG,'SONG')
//     SONGLIST = S(SONGLIST,'SONGLIST')
//     console.log('全局变量',SONG,SONGLIST);
// }
// getPlay()
export default {
    SONGLIST,
    SONG,
    i,
    SRC
    // getPlay
}