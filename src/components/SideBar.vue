<template>
<v-card height="100%">
    <!-- <v-navigation-drawer permanent> -->
    <v-list-item>
        <v-list-item-content>
            <v-img lazy-src="../assets/logo-pc.png" max-height="150" max-width="250" src="../assets/logo-pc.png"></v-img>
            <v-list-item-title class="text-center text-h6 pt-6">
                Trang quản lý
            </v-list-item-title>
        </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
        <v-list-item-group v-model="model" mandatory color="indigo">
            <div v-for="(item, i) in items" :key="i">
                <router-link :to="item.link" class="nav-link" :class="{active_color:check_active(i)}">

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>

                            <v-list-item-title v-text="item.title"></v-list-item-title>

                        </v-list-item-content>

                    </v-list-item>
                </router-link>
            </div>

        </v-list-item-group>
    </v-list>
    <!-- </v-navigation-drawer> -->

</v-card>
</template>

<script>
export default {
    name: 'SideBar',

    data: () => ({
        items: [{
                title: 'Thống kê',
                icon: 'mdi-view-dashboard',
                link: '/admin'
            },
            {
                title: 'Danh sách',
                icon: 'mdi-clipboard-list',
                link: '/admin/lists'
            },
            
            {
                title: 'Chi phí',
                icon: 'mdi-cash-multiple',
                link: '/admin/fee-school'
            },
            {
                title: 'Hoạt động ngoại khóa',
                icon: 'mdi-tractor',
                link: '/admin/action-outdoor'
            },
            {
                title: 'Thực đơn',
                icon: 'mdi-notebook-check-outline',
                link: '/admin/menu'
            },
            {
                title: 'Quản lý web',
                icon: 'mdi-cog-refresh',
                link: '/admin/settings'
            }
        ],
        right: null,
        model: -1
    }),
    created() {
        this.model = this.check_root_active();
    },
    methods: {
        check_active(i) {
            return i == this.model;
        },
        check_root_active() {
            let url = window.location.href.split("/admin/");
            console.log(url);
            try {
                if (url[1] == 'lists') {
                    return 1;
                } else if (url[1] == 'statis') {
                    return 0;
                } else if (url[1] == 'fee-school') {
                    return 2;
                } else if (url[1] == 'action-outdoor') {
                    return 3;
                } else if (url[1] == 'menu') {
                    return 4;
                } else if (url[1] == 'settings') {
                    return 5;
                } else {
                    return 0;
                }

            } catch (error) {
                return 0;
            }
        }
    }
}
</script>

<style scoped>
.nav-link {
    text-decoration: none;
    color: black;
}

.active_color {
    color: blue !important;
}
</style>
