let app = new Vue({
    el: "#app",
    data: {
        message: "hello, vue.js!"
    }
})

let app2 = new Vue({
    el: "#app-2",
    data: {
        message: "页面加载于"+new Date().toLocaleDateString()
    }
})

let app3 = new Vue({
    el: "#app-3",
    data: {
        seen: true,
    },
    methods: {
        show(){
            this.seen = !this.seen;
        }
    }
})

let app4 = new Vue({
    el: "#app-4",
    data: {
        todos: [
            {text: "learn js"},
            {text: "learn vue"},
            {text: "make a better project"},
        ]
    },
    methods: {
        add(){
            this.todos.push({text:"add-"+Date.now()})
        }
    }
})

let app5 = new Vue({
    el: "#app-5",
    data: {
        message: "Hello, Pino!"
    },
    methods: {
        reverse(){
            this.message = this.message.split("").reverse().join("")
        }
    }
})

let app6 = new Vue({
    el: "#app-6",
    data: {
        message: ""
    }
})

Vue.component("todo-item",{
    props: ["todo"],
    template: `<li>{{todo.text}}</li>`
})

let app7 = new Vue({
    el: "#app-7",
    data: {
        todos: [
            {id:1, text: "多读书，多看报"},
            {id:2, text: "少吃零食"},
            {id:3, text: "多睡觉~"}
        ]
    }
})

let app8 = new Vue({
    el: "#app-8",
    data: {
        message: "jojo"
    },
    beforeCreate(){
        console.log("beforeCreate")
    },
    created(){
        console.log("created")
    },
    beforeMount(){
        console.log("beforeMount")
    },
    mounted(){
        console.log("mounted")
    },
    beforeUpdate(){
        console.log("beforeUpdate")
    },
    updated(){
        console.log("updated")
    },
    beforeDestroy(){
        console.log("beforeDestroy")
    },
    destroyed(){
        console.log("destroyed")
    },
    methods: {
        handleClick(){
            console.log(this.$el)
            this.message = "pino"
            this.$destroy()
        }
    }
})

let app9 = new Vue({
    el: "#app-9",
    data: {
        question: '',
        answerImg: "",
        answer: "I can't answer you until you input a question..."
    },
    created(){
        this.debounceGetAnswer = _.debounce(this.getAnswer, 500)
    },
    watch: {
        question: function (newQ, oldQ){
            this.answer = "waiting for you stop typing..."
            this.debounceGetAnswer()
        }
    },
    methods: {
        getAnswer(){
            if(this.question.indexOf("?") === -1){
                this.answer = "a question maybe has a ? markup"
                return
            }
            this.answer = "I am thinking..."
            axios.get("https://yesno.wtf/api")
                .then((rep)=>{
                    let data = rep.data
                    this.answer = _.capitalize(data.answer)
                    this.answerImg = data.image
                })
                .catch(err=>console.log(err))
        }
    }
})