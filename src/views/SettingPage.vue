<template>
<div>
    <h1>Ảnh trình chiếu trong trang người dùng</h1>
    <v-carousel cycle height="400" hide-delimiter-background>
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
    </v-carousel>

    <div class="mt-2">
        <input type="file" ref="fileupload" @change="onFileSelected" accept="image/*">

        <v-btn color="primary" @click="addItem()">Thêm ảnh</v-btn>
    </div>
    <br />
    <hr>
    <template>
        <v-card color="basil" class="mr-2">
            <v-card-title class="text-center justify-center py-6">
                <h1 class="font-weight-bold text-h2 basil--text">
                    Danh sách bài viết
                </h1>
            </v-card-title>

            <v-tabs v-model="tab" background-color="transparent" color="basil" grow >
                <v-tab v-for="item in tabItems" :key="item.id">
                    {{ item }}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in tabItems" :key="item">
                    <v-card color="basil" flat>
                        <template>
                            <v-data-table  :headers="dessertHeaders" :items="desserts" :single-expand="singleExpand" :expanded.sync="expanded" item-key="name" show-expand class="elevation-5">
                                <template v-slot:top>
                                    <v-toolbar flat>
                                        <!-- <v-toolbar-title>Expandable Table</v-toolbar-title> -->
                                        <v-spacer></v-spacer>
                                        <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
                                    </v-toolbar>
                                </template>
                                <template v-slot:expanded-item="{ headers, item }">
                                    <td :colspan="headers.length">
                                        More info about {{ item.detail }}
                                    </td>
                                </template>
                            </v-data-table>
                        </template>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </template>
</div>
</template>

<script>
export default {
    data() {
        return {
            expanded: [],
            singleExpand: false,
            dessertHeaders: [{
                    text: 'Ngày đăng',
                    align: 'start',
                    value: 'createDate',
                },
                {
                    text: 'Người đăng',
                    value: 'account.username'
                },
                {
                    text: 'Mô tả',
                    value: 'description'
                },
                {
                    text: 'Tên',
                    value: 'name'
                },
                {
                    text: 'Trạng thái',
                    value: 'status'
                },
                {
                    text: '',
                    value: 'data-table-expand'
                },
            ],
            desserts: [{
                    createDate: '2021-12-25',
                    account: {
                        username: 'admin'
                    },
                    description: 'mô tả',
                    status: 'complete',
                    name:'name1',
                    detail: 'detail1'
                },
                {
                    createDate: '2021-12-25',
                    account: {
                        username: 'admin'
                    },
                    description: 'mô tả',
                    status: 'complete',
                    name:'name2',
                    detail: 'detail2'
                },
                {
                    createDate: '2021-12-25',
                    account: {
                        username: 'admin'
                    },
                    description: 'mô tả',
                    status: 'complete',
                    name:'name3',
                    detail: 'detail3'
                },
                {
                    createDate: '2021-12-25',
                    account: {
                        username: 'admin'
                    },
                    description: 'mô tả',
                    status: 'complete',
                    name:'name4',
                    detail: 'detail4'
                },
                {
                    createDate: '2021-12-25',
                    account: {
                        username: 'admin'
                    },
                    description: 'mô tả',
                    status: 'complete',
                    name:'name5',
                    detail: 'detail5'
                },
                {
                    createDate: '2021-12-25',
                    account: {
                        username: 'admin'
                    },
                    description: 'mô tả',
                    status: 'complete',
                    name:'name6',
                    detail: 'detail6'
                },
                {
                    createDate: '2021-12-25',
                    account: {
                        username: 'admin'
                    },
                    description: 'mô tả',
                    status: 'complete',
                    name:'name7',
                    detail: 'detail7'
                },
                {
                    createDate: '2021-12-25',
                    account: {
                        username: 'admin'
                    },
                    description: 'mô tả',
                    status: 'complete',
                    name:'name8',
                    detail: 'detail8'
                },
                {
                    createDate: '2021-12-25',
                    account: {
                        username: 'admin'
                    },
                    description: 'mô tả',
                    status: 'complete',
                    name:'name9',
                    detail: 'detail9'
                },
                {
                    createDate: '2021-12-25',
                    account: {
                        username: 'admin'
                    },
                    description: 'mô tả',
                    status: 'complete',
                    name:'name10',
                    detail: 'detail10'
                },
                {
                    createDate: '2021-12-25',
                    account: {
                        username: 'admin'
                    },
                    description: 'mô tả',
                    status: 'complete',
                    name:'name11',
                    detail: 'detail11'
                },

            ],
            tab: null,
            tabItems: [
                'All', 'Process', 'Pending', 'Done',
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            image: null,
            urlImage: '',
            items: [{
                    src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                },
            ],
        }
    },
    methods: {
        onFileSelected(event) {
            this.image = event.target.files[0]
            this.urlImage = URL.createObjectURL(this.image)

        },
        addItem() {
            this.items.push({
                src: this.urlImage
            })
            this.clearSelectFile()
        },
        clearSelectFile() {
            try {
                const input = this.$refs.fileupload;
                input.type = 'text';
                input.type = 'file';
            } catch (error) {
                console.log()
            }
            this.urlImage = null

        },
    }
}
</script>

<style>
/* Helper classes */
.basil {
    background-color: #e4eaeed5 !important;
}

.basil--text {
    color: #0d0f0d !important;
}
</style>
