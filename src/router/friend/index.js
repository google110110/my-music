// export default {
//     path:'/friend',
//     component:()=>import('@/views/friend')
// }

// export default {
//     path:'/friend/:id',
//     component : ()=>import('@/views/friend'),
//     // props:{
//     //     getmv:true,
//     // }
// }
export default {
    name:'friend',
    path:'/friend',
    component : ()=>import('@/views/friend'),
}