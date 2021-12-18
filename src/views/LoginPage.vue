<template>
<div id="login-page">
    <transition name="slide-fade">
        <v-alert :type="errorGetData.status" v-if="errorGetData.message != ''">
            {{errorGetData.message}}
        </v-alert>
    </transition>
        <form id="formLogin">
            <h1>Đăng nhập trang quản lý</h1>
            <v-text-field v-model="username" :error-messages="usernameErrors" label="Tên đăng nhập" required @input="$v.username.$touch()" @blur="$v.username.$touch()"></v-text-field>
            <v-text-field type="password" v-model="password" :error-messages="passwordErrors" label="Mật khẩu" required @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>
            <v-btn class="mr-4" @click="submit(username, password)" color="primary">
                Đăng nhập
            </v-btn>
        </form>
</div>
</template>

<script>
import {
    HTTP
} from '../api/index.js'
import {
    validationMixin
} from 'vuelidate'
import {
    required,
    minLength
} from 'vuelidate/lib/validators'
export default {
    mixins: [validationMixin],

    validations: {
        username: {
            required,
            minLength: minLength(6)
        },
        password: {
            required
        },
    },

    data: () => ({
        username: '',
        password: '',
        errorGetData: {
            "message": "",
            "status": ""
        },
    }),

    computed: {
        usernameErrors() {
            const errors = []
            if (!this.$v.username.$dirty) return errors
                // !this.$v.username.minLength && errors.push('Username must be at least 6 characters long')
                !this.$v.username.required && errors.push('Username is required.')
            return errors
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push('Password is required.')
            return errors
        },
    },

    methods: {
        submit: async function (username, password) {
            try {
                var resp = await HTTP.post('account/login',
                    JSON.stringify({
                        "username": username,
                        "password": password
                    }), );
                console.log(resp.data);
                if (resp.status == 200) {
                    window.localStorage.setItem("token", resp.data.token);
                    this.errorGetData.message = "Đăng nhập thành công";
                    this.errorGetData.status = "success";

                } else {
                    this.errorGetData.message = "Đã xảy ra lỗi trong quá trình đăng nhập";
                    this.errorGetData.status = "warning";
                    window.localStorage.removeItem("token")

                }
            } catch (error) {
                this.errorGetData.message = "Đã có lỗi xảy ra";
                this.errorGetData.status = "error";
                window.localStorage.removeItem("token")
            }
            setTimeout(() => {
                this.errorGetData.message = '';
                this.errorGetData.status = '';
                try {
                     if (resp.status == 200) {
                    window.location.href = window.location.href.split("/login")[0] + "/";
                    window.location.reload();
                }
                } catch (error) {
                    console.log(error);
                }
               
            }, 1000);

        },
        clear() {
            this.$v.$reset()
            this.username = ''
            this.password = ''
        },
    },
}
</script>

<style scoped>
form {
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}

#formLogin {
    max-width: 80%;
    min-height: 20%;
    text-align: center;
    padding: 3% 5%;
    margin: 10% auto;
    border-radius: 20px 30px;
    outline: 2px solid cornflowerblue;
    box-shadow: 10px 10px 5px grey;
}

.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active below version 2.1.8 */
    {
    transform: translateY(-10px);
    opacity: 0;
}
</style>
