<template>
  <div class="main">
    <h2 class="heading text-center text-primary" style="padding: 1em 2em;">
        Environment Monitoring System <br> using Internet of Things (IoT)
    </h2>
   
    <div class="container">
        <div class="form-div">
            <h3 class="text-center">Login</h3>
            <h5 class="text-center" style="color: #FF1212;">{{ errorMessage }}</h5>
            <form @submit.prevent="login">
                <label for="username">Email</label><br>
                <input type="email" name="email" v-model="email" id="email"><br>
                <label for="password">Password</label><br>
                <input type="password" name="password" v-model="password" id="password"><br>
                <input v-show="!isProcessing" type="submit" class="btn-primary" value="Submit"><br>
                <div v-show="isProcessing" class="text-center">
                    <img v-show="true" src="/images/loading.gif" alt="Loading">
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Login',
        
        data(){
            return {
                email: '',
                password: '',
                errorMessage: '',
                isProcessing: false
            }
        },

        methods: {
            login: function(){
                this.isProcessing = true;

                if(
                    (this.email.trim() !== '') && 
                    (this.password.trim() !== '')
                ){
                    if(
                        (this.email.trim() ==='admin01@gmail.com') && 
                        (this.password.trim() === 'admin01@123')
                    ){
                        localStorage.setItem('user', 'admin01@gmail.com');
                        window.location.href = '/home';
                    }else if(
                        (this.email.trim() ==='admin02@gmail.com') && 
                        (this.password.trim() === 'admin02@123')
                    ){
                        localStorage.setItem('user', 'admin02@gmail.com');
                        window.location.href = '/home';
                    }else{
                        this.errorMessage = "Invalid login details";
                    }
                }else{
                    this.errorMessage = "Provide login details";
                }

                this.isProcessing = false;
            }
        }
    }
</script>

<style scoped>
    *{
        box-sizing: border-box;
    }

    .text-center{
        text-align: center;
    }

    .container{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-div{
        margin-top: 4%;
        background-color: #FFFFFF;
        color: #000000 !important;
        border: 1px solid #CCCCCC;
        padding: 0 1.5em 1.5em 1.5em;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    input{
        width: 100%;
        height: 40px;
        padding: 10px;
        margin: 10px 0px;
    }

    .text-primary{
        color: #1f1b41;
    }

    .btn-primary{
        background-color: #1f1b41;
        color: #FFFFFF;
        border: none;
    }

    .btn-primary:hover{
        cursor: pointer;
    }

    @media screen and (min-width: 760px){
        .form-div{
            width: 30% !important;
        }
    }

    @media screen and (max-width: 450px){
        .heading{
            font-size: 1rem;
        }
        .form-div{
            width: 90% !important;
        }
    }
</style>
