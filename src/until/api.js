import axios from 'axios'
const api = (url,name) => {
    return new Promise((res,rej)=>{
        var p = window.sessionStorage.getItem(name)
        if(p){ 
            console.log(name+'本地存储')
            res(JSON.parse(p))
        }else{
            axios.get(`https://autumnfish.cn${url}`)
            .then(response => {
                var result = response.data;
                if (result.code == 200) {
                    window.sessionStorage.setItem(name, JSON.stringify(result));
                    console.log(name+"请求成功");
                    res(result) 
                }
            })
            .catch(error => {
                console.log("请求失败", error);
            });
        }
    })
}
const palysong = ()=>{
    this.$router.push('/friend')
}
export default {
    api
}