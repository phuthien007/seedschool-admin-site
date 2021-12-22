<template>
<!-- App.vue -->

<v-app>


    <v-navigation-drawer light stateless mini-variant expand-on-hover permanent disable-route-watcher  app  class="reset-css" >
        <!-- -->
        <side-bar />
    </v-navigation-drawer>

    <v-app-bar class="ml-2 mx-auto" app elevation="3">
        <!-- -->
        <div class="d-none d-sm-flex justify-space-between text-h4 ">
            Trường mầm non Seedschool
        </div>
        <div class="d-flex d-sm-none justify-space-between  text-body-2">
            Trường mầm non Seedschool
        </div>

        <v-spacer></v-spacer>
        <div v-if="checkLogin()">
            <v-col width="100%" class="d-flex">
                <v-btn icon width="55%">
                    <v-badge :content="messages" :value="messages" color="red" overlap>
                        <v-menu bottom min-width="200px" rounded offset-y>
                            <template v-slot:activator="{ on }">
                                <v-btn icon x-small v-on="on">
                                    <v-avatar color="gray" size="30">
                                        <v-icon>mdi-bell</v-icon>
                                    </v-avatar>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-list-item-content class="justify-center">
                                    <div class="mx-auto text-center">
                                        <v-avatar color="gray">
                                            <v-icon>mdi-bell</v-icon>
                                        </v-avatar>
                                    </div>
                                </v-list-item-content>
                            </v-card>
                        </v-menu>

                    </v-badge>
                </v-btn>

                <!-- avatar admin/ -->
                <v-btn icon width="55%">
                    <v-menu bottom min-width="250px" rounded offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn icon x-large v-on="on">
                                <v-avatar color="brown" size="40">
                                    <span class="white--text text-h5">{{ user.initials }}</span>
                                </v-avatar>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-list-item-content class="justify-center">
                                <div class="mx-auto text-center">
                                    <v-avatar color="brown">
                                        <span class="white--text text-h5">{{ user.initials }}</span>
                                    </v-avatar>
                                    <h3>{{ user.username }}</h3>
                                    <p class="text-caption mt-1">
                                        {{ user.email }}
                                    </p>
                                    <v-divider class="my-3"></v-divider>
                                    <v-btn depressed rounded text>
                                        View Account
                                    </v-btn>
                                    <v-divider class="my-3"></v-divider>
                                    <router-link class="nav-link" to="/logout">
                                        <v-btn depressed rounded text @click="logoutFunc">
                                            Logout
                                        </v-btn>
                                    </router-link>

                                </div>
                            </v-list-item-content>
                        </v-card>
                    </v-menu>

                </v-btn>
            </v-col>

        </div>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main class="ml-2"> 

        <!-- Provides the application the proper gutter -->
        <!-- <v-container fluid> -->

        <!-- If using vue-router -->
        <router-view></router-view>
        <!-- </v-container> -->
    </v-main>

    <v-footer app>
        <!-- -->
    </v-footer>
</v-app>
</template>

<script>
import SideBar from './components/SideBar.vue';
import {
    HTTP
} from './api/index'
export default {
    name: 'App',

    components: {
        SideBar,
    },

    data: () => ({

        messages: 3,
        user: {
            initials: 'AD',
            username: 'admin',
            email: 'admin.seedschool@gmail.com',
        },
    }),
    mounted: async function () {
        this.user.username = window.localStorage.getItem('username')
        this.user.initials = this.user.username[0] + this.user.username[1]
        this.user.initials = this.user.initials.toUpperCase()
        let resp = await HTTP.get(`account/search?username=${this.user.username}`)
        this.user.email = resp.data.email
    },
    methods: {
        checkLogin() {
            return window.localStorage.getItem('token') != null
        },
        logoutFunc() {
            window.localStorage.removeItem("token")
        }
    }
};
</script>

<style scoped>
.nav-link {
    text-decoration: none;
    color: black;
}

</style>
