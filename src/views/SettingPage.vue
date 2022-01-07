<template>
<div>
    <h1>Ảnh trình chiếu trong trang người dùng</h1>
    <v-carousel cycle height="400" hide-delimiter-background>
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.urlImage">
            <div style="display:none;">
                {{ imageCurrentShow = item }}
            </div>

        </v-carousel-item>
    </v-carousel>
    <div class="mt-2">
        <input type="file" ref="fileupload" @change="onFileSelected" accept="image/*">
        <v-btn color="primary" dark @click="addItem()">Thêm ảnh</v-btn>

        <v-dialog v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on" class="ml-2">
                    Xóa ảnh hiện tại
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Xóa ảnh hiện tại
                </v-card-title>
                <v-card-actions>
                    <v-btn color="primary" text @click="dialog = false">
                        Đóng
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="deleteImage(); dialog = false">
                        Đồng ý
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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

            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                <v-tab @click="handleData(item.key)" v-for="item in tabItems" :key="item.key">
                    {{ item.key }}
                </v-tab>
            </v-tabs>
            <v-overlay :value="overlay">
                <v-progress-circular indeterminate color="blue" size="45"></v-progress-circular>
            </v-overlay>
            <transition name="slide-fade">
                <v-alert :type="errorGetData.status" v-if="errorGetData.message != ''">
                    {{errorGetData.message}}
                </v-alert>
            </transition>
            <v-tabs-items v-model="tab">
                <v-tab-item key="All">
                    <v-card color="basil" flat>
                        <template>
                            <v-data-table v-model="selected" :headers="dessertHeaders" :items="tabItems[0].data" :single-expand="singleExpand" :single-select="singleSelect" show-select :expanded.sync="expanded" item-key="id" show-expand class="elevation-5">
                                <template v-slot:top>
                                    <v-toolbar flat>
                                        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
                                        <!-- <v-toolbar-title>Expandable Table</v-toolbar-title> -->
                                        <v-spacer></v-spacer>
                                        <v-menu bottom right>
                                            <template v-slot:activator="{ on, attrs }">

                                                <v-dialog v-bind="attrs" v-on="on" transition="dialog-bottom-transition" max-width="600">
                                                    <template v-slot:activator="{ on, attrs }">

                                                        <v-btn color="red" dark class="mr-2" v-bind="attrs" v-on="on">Xóa</v-btn>

                                                    </template>

                                                    <template v-slot:default="dialog">
                                                        <v-card>
                                                            <v-card-actions class="justify-end">
                                                                <v-btn color="red" text @click="deleteFunc(); dialog.value = false">Đồng ý</v-btn>

                                                                <v-spacer></v-spacer>
                                                                <v-btn text @click="dialog.value = false">Đóng</v-btn>
                                                            </v-card-actions>
                                                        </v-card>

                                                    </template>

                                                </v-dialog>
                                            </template>
                                        </v-menu>
                                        <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
                                    </v-toolbar>
                                </template>
                                <template v-slot:expanded-item="{ headers, item }">
                                    <td :colspan="headers.length">
                                        {{ item.detail }}
                                    </td>
                                </template>
                                <!-- <template v-slot:[`item.description`]="{ item }">
                                    <v-simple-checkbox v-model="item.description" ></v-simple-checkbox>
                                </template> -->
                            </v-data-table>
                        </template>
                    </v-card>
                </v-tab-item>

                <v-tab-item key="Process">
                    <v-card color="basil" flat>
                        <template>
                            <v-data-table v-model="selected" :headers="dessertHeaders" :items="tabItems[1].data" :single-expand="singleExpand" :single-select="singleSelect" show-select :expanded.sync="expanded" item-key="id" show-expand class="elevation-5"> <template v-slot:top>
                                    <v-toolbar flat>
                                        <!-- <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch> -->
                                        <!-- <v-toolbar-title>Expandable Table</v-toolbar-title> -->
                                        <v-spacer></v-spacer>
                                        <v-menu bottom right>
                                            <template v-slot:activator="{ on, attrs }">

                                                <v-dialog v-bind="attrs" v-on="on" transition="dialog-bottom-transition" max-width="600">
                                                    <template v-slot:activator="{ on, attrs }">

                                                        <v-btn color="red" dark class="mr-2" v-bind="attrs" v-on="on">Xóa</v-btn>

                                                    </template>

                                                    <template v-slot:default="dialog">
                                                        <v-card>
                                                            <v-card-actions class="justify-end">
                                                                <v-btn color="red" text @click="deleteFunc(); dialog.value = false">Đồng ý</v-btn>

                                                                <v-spacer></v-spacer>
                                                                <v-btn text @click="dialog.value = false">Đóng</v-btn>
                                                            </v-card-actions>
                                                        </v-card>

                                                    </template>

                                                </v-dialog>
                                            </template>
                                        </v-menu>
                                        <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
                                    </v-toolbar>
                                </template>
                                <template v-slot:expanded-item="{ headers, item }">
                                    <td :colspan="headers.length">
                                        {{ item.detail }}
                                    </td>
                                </template>
                            </v-data-table>
                        </template>
                    </v-card>
                </v-tab-item>

                <v-tab-item key="Pending">
                    <v-card color="basil" flat>
                        <template>
                            <v-data-table v-model="selected" :headers="dessertHeaders" :items="tabItems[2].data" :single-expand="singleExpand" :single-select="singleSelect" show-select :expanded.sync="expanded" item-key="id" show-expand class="elevation-5"> <template v-slot:top>
                                    <v-toolbar flat>
                                        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
                                        <!-- <v-toolbar-title>Expandable Table</v-toolbar-title> -->
                                        <v-spacer></v-spacer>
                                        <v-btn class="mr-2" @click="changeToDone()" color="primary">Chấp nhận</v-btn>
                                        <v-menu bottom right>
                                            <template v-slot:activator="{ on, attrs }">

                                                <v-dialog v-bind="attrs" v-on="on" transition="dialog-bottom-transition" max-width="600">
                                                    <template v-slot:activator="{ on, attrs }">

                                                        <v-btn color="red" dark class="mr-2" v-bind="attrs" v-on="on">Xóa</v-btn>

                                                    </template>

                                                    <template v-slot:default="dialog">
                                                        <v-card>
                                                            <v-card-actions class="justify-end">
                                                                <v-btn color="red" text @click="deleteFunc(); dialog.value = false">Đồng ý</v-btn>

                                                                <v-spacer></v-spacer>
                                                                <v-btn text @click="dialog.value = false">Đóng</v-btn>
                                                            </v-card-actions>
                                                        </v-card>

                                                    </template>

                                                </v-dialog>
                                            </template>
                                        </v-menu>
                                        <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
                                    </v-toolbar>
                                </template>
                                <template v-slot:expanded-item="{ headers, item }">
                                    <td :colspan="headers.length">
                                        {{ item.detail }}
                                    </td>
                                </template>
                            </v-data-table>
                        </template>
                    </v-card>
                </v-tab-item>

                <v-tab-item key="Done">
                    <v-card color="basil" flat>
                        <template>
                            <v-data-table v-model="selected" :headers="dessertHeaders" :items="tabItems[3].data" :single-expand="singleExpand" :single-select="singleSelect" show-select :expanded.sync="expanded" item-key="id" show-expand class="elevation-5"> <template v-slot:top>
                                    <v-toolbar flat>
                                        <!-- <v-toolbar-title>Expandable Table</v-toolbar-title> -->
                                        <v-spacer></v-spacer>
                                        <v-menu bottom right>
                                            <template v-slot:activator="{ on, attrs }">

                                                <v-dialog v-bind="attrs" v-on="on" transition="dialog-bottom-transition" max-width="600">
                                                    <template v-slot:activator="{ on, attrs }">

                                                        <v-btn color="red" dark class="mr-2" v-bind="attrs" v-on="on">Xóa</v-btn>

                                                    </template>

                                                    <template v-slot:default="dialog">
                                                        <v-card>
                                                            <v-card-actions class="justify-end">
                                                                <v-btn color="red" text @click="deleteFunc(); dialog.value = false">Đồng ý</v-btn>

                                                                <v-spacer></v-spacer>
                                                                <v-btn text @click="dialog.value = false">Đóng</v-btn>
                                                            </v-card-actions>
                                                        </v-card>

                                                    </template>

                                                </v-dialog>
                                            </template>
                                        </v-menu>
                                        <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
                                    </v-toolbar>
                                </template>
                                <template v-slot:expanded-item="{ headers, item }">
                                    <td :colspan="headers.length">
                                        {{ item.detail }}
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
import {
    HTTP
} from '../api/index'
export default {

    data() {
        return {
            selectItem: null,
            imageCurrentShow: null,
            dialog: false,
            errorGetData: {
                "message": "",
                "status": ""
            },
            overlay: false,
            selected: [],
            singleSelect: false,
            expanded: [],
            singleExpand: false,
            dessertHeaders: [{
                    text: 'Ngày đăng',
                    align: 'start',
                    value: 'createDate',
                },
                {
                    text: 'Người đăng',
                    value: 'accountDAO.username'
                },
                {
                    text: 'Mô tả',
                    value: 'description'
                },
                {
                    text: 'Tên',
                    value: 'title'
                },
                {
                    text: 'Trạng thái',
                    value: 'status'
                },
                {
                    text: 'Hành động',
                    value: ' actions',
                    sortable: false
                },
                {
                    text: '',
                    value: 'data-table-expand'
                },
            ],
            tab: null,
            tabItems: [{
                    key: 'All',
                    data: []
                },
                {
                    key: 'Process',
                    data: []
                },
                {
                    key: 'Pending',
                    data: []
                },
                {
                    key: 'Done',
                    data: []
                }
            ],
            image: null,
            urlImage: null,
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
    mounted: async function () {
        await this.handleData('ALL')
        let resp = await HTTP.get("image_slide/")
        if (resp.status == 200) {
            this.items = resp.data
        }
        console.log(this.items)
    },
    methods: {
        async deleteImage() {
            this.overlay = true
            try {
                let resp = await HTTP.delete(`image_slide/${this.imageCurrentShow.id}`)
                if (resp.status == 200) {
                    console.log('delete success')
                    this.items.splice(this.items.indexOf(this.selectItem), 1)
                }

            } catch (error) {
                console.log(error)
            }
            this.overlay = false

        },
        resetAlert() {
            setTimeout(() => {
                this.errorGetData.message = ''
                this.errorGetData.status = ''
            }, 1000)

        },
        changeToDone: async function () {
            var err = ''
            this.overlay = true
            for (let index = 0; index < this.selected.length; index += 1) {
                try {
                    let resp = await HTTP.put(`article/${this.selected[index].id}?statusArticle=DONE`,{})
                    if (resp.status == 200) {
                        console.log('delete success')
                        this.tabItems[this.tab].data.splice(this.selected[index], 1)
                    } else {
                        err += `Lỗi khi update bài viết có id: ${this.selected[index].id}\n`
                    }
                } catch (error) {
                    console.log(error)
                    err += `Lỗi khi update bài viết có id: ${this.selected[index].id}\n`
                }
            }
            if (err == '') {
                this.errorGetData.status = 'success'
                this.errorGetData.message = 'Bài viết đã được chấp nhận'
                this.selected = []
            } else {
                this.errorGetData.status = 'error'
                this.errorGetData.message = err
            }
            setTimeout(() => {
                this.overlay = false
            }, 1000)
            this.resetAlert()
        },
        deleteFunc: async function () {

            var err = ''
            this.overlay = true
            for (let index = 0; index < this.selected.length; index += 1) {
                try {
                    let resp = await HTTP.delete(`article/${this.selected[index].id}`)
                    if (resp.status == 200) {
                        console.log('delete success')
                        this.tabItems[this.tab].data.splice(this.selected[index], 1)
                        // this.events.splice(this.events.indexOf(item), 1)
                    } else {
                        err += `Lỗi khi xóa bài viết có id: ${this.selected[index].id}\n`
                    }
                } catch (error) {
                    err += `Lỗi khi xóa bài viết có id: ${this.selected[index].id}\n`
                }
            }
            if (err == '') {
                this.errorGetData.status = 'success'
                this.errorGetData.message = 'Xóa bài viết thành công'
                this.selected = []
            } else {
                this.errorGetData.status = 'error'
                this.errorGetData.message = err
            }
            setTimeout(() => {
                this.overlay = false
            }, 1000)
            this.resetAlert()

        },
        async handleData(tab) {
            this.overlay = true
            await this.getAllData(tab.toUpperCase())
            setTimeout(() => {
                this.overlay = false
            }, 1000)
        },

        onFileSelected(event) {
            this.image = event.target.files[0]
            this.urlImage = URL.createObjectURL(this.image)

        },
        async addItem() {
            this.overlay = true
            if (this.urlImage == null) {
                alert("Chưa có ảnh nào được chọn")
            } else {
                try {
                    let fd = new FormData()
                    fd.append('image', this.image, this.image.name)
                    let resp = await HTTP.post('image_slide/', fd)
                    if (resp.status == 200) {

                        console.log('success')
                        this.items.push(resp.data)
                    }

                } catch (error) {
                    console.log(error)
                }

            }
            this.clearSelectFile()
            this.overlay = false
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
        getIndexTab(key) {
            if (key.toUpperCase() == 'PROCESS') {
                return 1
            } else if (key.toUpperCase() == 'PENDING') {
                return 2
            } else if (key.toUpperCase() == 'DONE') {
                return 3
            } else {
                return 0
            }
        },
        async getAllData(key) {
            try {
                if (key == 'ALL') {
                    let resp = await HTTP.get(`article/`)
                    if (resp.status == 200) {
                        this.tabItems[0].data = resp.data
                    }
                } else {
                    let resp = await HTTP.get(`article/search?statusArticle=${key.toUpperCase()}`)
                    if (resp.status == 200) {
                        this.tabItems[this.getIndexTab(key)].data = resp.data
                    }
                }

            } catch (error) {
                if (error.message == "Request failed with status code 403") {

                    this.errorGetData.message = "Lỗi token hoặc không thể thực hiện chức năng này, hãy đăng nhập lại"
                    this.errorGetData.status = "error"
                    window.localStorage.removeItem("token")
                    window.location.reload()
                    this.resetAlert()

                } else {
                    this.errorGetData.message = `Lỗi lấy dữ liệu`;
                    this.errorGetData.status = "error";
                }
            }
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
