<template>
    <div class="box">
        <p class="logo">可向多个商家咨询最低价，商家及时回复</p>
        <div class="top0"> 
        
            <img :src="data.Picture" alt="">
            <div class="content">
                <p>{{data.AliasName}}</p>
                <p>{{title}}</p>
            </div>            
        </div>
        <p class="tip">个人信息</p>
        <ul>
            <li><span>姓名</span><input type="text" placeholder="输入你的真实中文姓名" maxlength="4"></li>
            <li><span>手机</span><input type="text" placeholder="输入你的真实手机号码" maxlength="11"></li>
            <li><span>城市</span><span class="bj">北京</span></li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data:this.$route.query.carObj,
                title:this.$route.query.name
            }
        },
        created() {
            console.log(this.$route.query)
        },
    }
</script>

<style lang="scss" scoped>
.logo{
    width: 100%;
    height: 30px;
    background: #79cd92;
    color: #fff;
    line-height: 30px;
    text-align: center;
    font-size: 15px;
}
.top0{
    width:100%;
    height:100px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    span{
        font: 30px;
        color: #ccc;
    }
}
.top0:before{
    content: "";
    display: inline-block;
    padding-top: .16rem;
    padding-right: .16rem;
    border-top: 3px solid #ccc;
    border-right: 3px solid #ccc;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    right: .35rem;
    top: 1.7rem;
}
img{
    widows: 115%;
    height: 70.5px;
    border: 1px solid #eee;
    box-sizing: border-box;
    border-radius: 5px;
}
.content p:nth-child(1){
    width:215px;
    height: 18px;
    font-size: 18px;
}
.content p:nth-child(2){
    width:215px;
    height: 19px;
    font-size: 16px;
    margin:13px 0px 0px;
    line-height: 19px;
}
.tip{
    height: 25px;
    width:100%;
    background: #eee;
    color: #666;
    line-height: 25px;
    text-indent: 1em;
}
ul {
    font-size: 16px;
    li{
        height: 44px;
        text-indent: 1em;
        border-bottom: 1px solid #bbb;
        box-sizing: border-box;
        line-height: 44px;
    }
   li span:nth-child(2):after{
    content: "";
    display: inline-block;
    padding-top: .16rem;
    padding-right: .16rem;
    border-top: 3px solid #ccc;
    border-right: 3px solid #ccc;
    transform: rotate(45deg);
    position: absolute;
    right: .35rem;
    top: 260px;
   }
    input{
        width: 312px;
        height: 21px;
        border: none;
        text-indent: 8em;
        text-align: right;
        color:#555;
    }
    .bj{
        margin-left: 270px;
        color: #555;
        font-size: 16px;
    }
    
}
</style>