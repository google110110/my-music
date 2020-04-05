export default {
    name : 'recommend',
    path:'/recommend',
    component:()=>import('@/views/recommend'),
    children:[
        {
            name : 'rec',
            path:'rec',
            component : ()=>import('@/components/rec')
        },
        {
            name : 'leaderboard',
            path:'leaderboard',
            component : ()=>import('@/components/leaderboard'),
            redirect:'/recommend/leaderboard/videos',
            children:[
                // {
                //     path:'mv',
                //     components:{
                //         mv:()=>import('@/components/mv')
                //     },
                //     props:{
                //         getmv:true,
                //     }
                // },
                {
                    path:'videos',
                    component:()=>import('@/components/videos')
                },
                {
                    path:'mv',
                    component:()=>import('@/components/mv')
                },
                {
                    path:'newmv',
                    component:()=>import('@/components/newmv')
                },
                {
                    path:'wymv',
                    component:()=>import('@/components/wymv')
                },
                {
                    name : 'vvideo',
                    path:'vvideo',
                    component:()=>import('@/components/vvideo')
                }
            ]
        },
        {
            name : 'songlist',
            path:'songlist',
            component : ()=>import('@/components/songlist'),
            // children:[
            //     {
            //         path:'songs/:id',
            //         components:{
            //             songs:()=>import('@/components/songs')
            //         },
            //         props:{
            //             id:true,
            //         }
            //     }
            // ]
        },
        {
            name : 'singer',
            path:'singer',
            component : ()=>import('@/components/singer')
        },
        {
            name : 'newsong',
            path:'newsong',
            component : ()=>import('@/components/newsong')
        },
        {
            name : 'singerDetails',
            // path:'singerDetails',
            component : ()=>import('@/components/singerDetails'),
            path:'singerDetails/:id',
            // components:{
            //     singerDetails:()=>import('@/components/singerDetails')
            // },
            // props:{
            //     id:true
            // }
        },
        {
            name : 'singDetails',
            path:'singDetails',
            component : ()=>import('@/components/singDetails')
        }
    ],
    redirect:'/recommend/rec'
}