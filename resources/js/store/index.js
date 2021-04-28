import { reactive } from "@vue/reactivity";

const state = reactive({
    the_user:[],
    create_new_account: false,
    login_info: true,
    userconected: false,
    livreurconected: false,
   
    user: {
        login_email: "",
        login_password: "",
    },
    new_user: {
        register_user_name: "",
        register_user_email: "",
        register_user_password: "",
        register_user_password_confirmed: "",
        register_user_is_valide: true,
        register_user_error: "",
        register_user_sucess: false,
    },
    categoreis:[],
    new_category:{
        name:'',
        description:'',
        image:null
    },
    showorders:true,
    showCategoreis:false,
    order:{
        name:'dd',
        description:'dda',
        user_id:0,
        category_id:0
    },
    User_orders:[],
    all_orders:[],

});

const methodes = {
    createNewAccount() {
        state.create_new_account = true;
    },
    backToLogin() {
        state.create_new_account = false;
    },
    registerNewUser() {
        var email_validation = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
        console.log("register new user is called");
        state.new_user.register_user_is_valide = true;
        if (state.new_user.register_user_name.length < 4) {
            state.new_user.register_user_is_valide = false;
            state.new_user.register_user_error =
                "le nom doit comporter au moins 4 caractères";
        } else if (!email_validation.test(state.new_user.register_user_email)) {
            state.new_user.register_user_is_valide = false;
            state.new_user.register_user_error = "votre email est invalide ";
        }
        else if (state.new_user.register_user_password.length < 6) {
            state.new_user.register_user_is_valide = false;
            state.new_user.register_user_error =
                "le mot de pass doit comporter au moins 6 caractères";
        } else if (
            state.new_user.register_user_password !=
            state.new_user.register_user_password_confirmed
        ) {
            state.new_user.register_user_is_valide = false;
            state.new_user.register_user_error =
                "La confirmation du mot de passe ne correspond pas au mot de passe";
        }
        if (state.new_user.register_user_is_valide) {
            axios
                .post("http://127.0.0.1:8000/api/register", state.new_user)
                .then((res) => {
                    console.log("res = ", res);
                    (state.new_user.register_user_name = ""),
                        (state.new_user.register_user_email = ""),
                        (state.new_user.register_user_password = ""),
                        (state.new_user.register_user_password_confirmed = ""),
                        (state.new_user.register_user_error = ""),
                        (state.new_user.register_user_is_valide = true);
                    state.new_user.register_user_sucess = true;
                    state.create_new_account = false;
                })
                .catch((error) => {
                    state.new_user.register_user_is_valide = false;
                    state.new_user.register_user_error =
                        "!!!! erreur lors de la connexion au serveur !!!!";
                });
        } else {
            console.log("this is not a valid user");
        }
    },
    login() {
        state.new_user.register_user_is_valide = true;
        var email_validation = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
        if (!email_validation.test(state.user.login_email)) {
            state.new_user.register_user_is_valide = false;
            state.new_user.register_user_error = "votre email est invalide ";
        }
        console.log("login new user is called");
        axios
            .post("http://127.0.0.1:8000/api/login", state.user)
            .then((res) => {
                console.log("user is loged in", res);
                state.the_user=res.data;
                console.log("the user in store = ",state.the_user)
                if (res.data.Role === "cliente") {
                   // console.log("this is cliente",res.data);
                    state.userconected = true;
                    state.order.user_id=res.data.id
                    // console.log("this is from index userconected =",state.userconected);
                } else if (res.data.Role === "livreur") {
                   // console.log("this is livreur");
                    state.livreurconected = true;
                }
            })
            .catch((error) => {
                state.login_info = false;
            });
    },
    logout() {
        console.log("logout user is called");
        axios
            .post("http://127.0.0.1:8000/api/logout")
            .then((res) => {
                console.log("user is loged out", res);
                state.userconected = false;
                state.livreurconected = false;
                state.user.login_email=''
                state.user.login_password=''
            })
            .catch((error) => {});
    },
    getCategoreis(){
       state.categoreis =[]
        axios
            .get("http://127.0.0.1:8000/api/getCategoreis")
            .then((res) => {
                console.log("categoreis are = ", res);
                state.categoreis = res.data;
               
            })
            .catch((error) => {});
    },
   
    saveNewCategory(e){
        e.preventDefault();
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        let data = new FormData();
                data.append('name', state.new_category.name);
                data.append('description', state.new_category.description);
                data.append('image', state.new_category.image);
               
        axios
            .post("http://127.0.0.1:8000/api/new_category",data,config )
            .then((res) => {
                console.log("categoreis ", res);
              methodes.getCategoreis()
               
            })
            .catch((error) => {
                console.log("there is an error")
            });
    },
    onChange(e) {
        state.new_category.image = e.target.files[0];
        console.log("imege changed = ",state.new_category.image)
    },
    showOrders(){
        state.showorders=true
        state.showCategoreis=false
        console.log("showorders = ",state.showorders)
        console.log("showCategoreis = ",state.showCategoreis)
    },
     showCategoreis(){
        state.showorders=false
        state.showCategoreis=true
        console.log("showorders = ",state.showorders)
        console.log("showCategoreis = ",state.showCategoreis)
    },
    createOrder(){
        axios
        .post("http://127.0.0.1:8000/api/new_order",state.order)
        .then((res) => {
            console.log("responce = ", res);
            methodes.CurrentUserorders()
        })
        .catch((error) => {});

    },
    CurrentUserorders(){
        state.User_orders=[]
        let link ='http://127.0.0.1:8000/api/CurrentUserOrders/'.concat(state.the_user.id)
      
         axios
        .get(link)
        .then((res) => {
            state.User_orders=res.data;
            console.log("User_orders = ", state.User_orders);
            state.User_orders.forEach((order)=>{
                order.created_at= order.created_at.slice(0,-8)
                order.created_at= order.created_at.replace('T', " ")

            })
        })
        .catch((error) => {}); 

    },
    GetAllOrders(){
        state.all_orders=[]
         axios
        .get('http://127.0.0.1:8000/api/allOrders')
        .then((res) => {
            state.all_orders=res.data;
            console.log("all_orders = ", state.all_orders);
            state.all_orders.forEach((order)=>{
                order[0].created_at= order[0].created_at.slice(0,-8)
                order[0].created_at= order[0].created_at.replace('T', " ")
            console.log("all_orders = ", state.all_orders);
            })
        })
        .catch((error) => {}); 

    },
    livred(order_id){
console.log('the button is = ',order_id);
let link ='http://127.0.0.1:8000/api/orderlivre/'.concat(order_id);
console.log('the link to livre is : ',link)
/* axios
.get(link)
.then((res) => {
    state.User_orders=res.data;
    console.log("User_orders = ", state.User_orders);
    state.User_orders.forEach((order)=>{
        order.created_at= order.created_at.slice(0,-8)
        order.created_at= order.created_at.replace('T', " ")

    })
})
.catch((error) => {});  */
    }
   
}

export default {
    state,
    methodes,
};
