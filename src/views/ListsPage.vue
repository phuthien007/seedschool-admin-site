<template>
<div>
    <v-overlay :value="overlay">
        <v-progress-circular indeterminate color="blue" size="45"></v-progress-circular>
    </v-overlay>
    <v-select :items="categoryList" v-model="valueSelected" label="Chọn một danh sách"></v-select>
    <transition name="slide-fade">
        <v-alert :type="errorGetData.status" v-if="errorGetData.message != ''">
            {{errorGetData.message}}
        </v-alert>
    </transition>
    <v-data-table :headers="headers[getIndexList()]" :items="desserts" :search="search" :sort-desc="[false, true]" multi-sort class="elevation-2">

        <template v-slot:top>

            <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-toolbar-title>{{valueSelected}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <template>
                    <v-btn color="primary" v-show="!checkEmpty()" class="mb-2 mr-2" @click="initialize">
                        <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                </template>
                <template v-if="showAutoCreate">
                    <v-btn  @click="autoCreateAccount" color="gray" white class="mb-2">
                        Tự động tạo tài khoản
                    </v-btn>
                </template>
                <v-dialog v-else v-model="dialog" max-width="500px">

                    <!-- add new item  -->

                    <template v-slot:activator="{ on, attrs }">

                        <v-btn color="gray" white class="mb-2" v-bind="attrs" v-on="on">
                            Thêm mới
                        </v-btn>
                    </template>
                    <v-card>
                        <!-- segment -->

                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>
                        <div class="formTeacher" v-if="getIndexList() == 0">
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <div id="preview">
                                                <img v-if="urlImage" :src="urlImage" />
                                                <v-img v-else-if="checkHasImage(editedItem[getIndexList()].urlImg)" max-height="500px" max-width="100%" :lazy-src="editedItem[getIndexList()].urlImg" :src="editedItem[getIndexList()].urlImg"></v-img>

                                            </div>
                                            <!-- <template>  -->
                                            <!-- <v-file-input @change="onFileSelected" :rules="rules" accept="image/*" placeholder="Chọn ảnh" prepend-icon="mdi-camera" label="Avatar"></v-file-input> -->

                                            <!-- <v-file-input v-model="fileImageSelected" :rules="rules" accept="image/jpg image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar"></v-file-input> -->
                                            <!-- </template> -->

                                            <input type="file" ref="fileupload" @change="onFileSelected" accept="image/*">

                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].name" label="Tên giáo viên"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field type="email" v-model="editedItem[getIndexList()].email" label="Email"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].address" label="Địa chỉ"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].phoneNumber" label="Số điện thoại"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].gender" label="Giới tính"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].degree" label="Học vị"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <template>
                                                <div>
                                                    <v-menu ref="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="editedItem[getIndexList()].birthday" label="Ngày sinh" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="editedItem[getIndexList()].birthday" :active-picker.sync="activePicker" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01"></v-date-picker>
                                                    </v-menu>
                                                </div>
                                            </template>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </div>
                        <div class="formStudent" v-else-if="getIndexList() == 1">
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <div id="preview">
                                                <img v-if="urlImage" :src="urlImage" />
                                                <v-img v-else-if="checkHasImage(editedItem[getIndexList()].urlImg)" max-height: 500px :lazy-src="editedItem[getIndexList()].urlImg" :src="editedItem[getIndexList()].urlImg"></v-img>

                                            </div>
                                            <!-- <v-file-input @change="onFileSelected" :rules="rules" accept="image/*" placeholder="Chọn ảnh" prepend-icon="mdi-camera" label="Avatar"></v-file-input> -->
                                            <!-- </template> -->
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].name" label="Tên học sinh"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field type="email" v-model="editedItem[getIndexList()].email" label="Email"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].address" label="Địa chỉ"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].phoneNumber" label="Số điện thoại"></v-text-field>
                                        </v-col>

                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <template>
                                                <div>
                                                    <v-menu ref="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="editedItem[getIndexList()].birthday" label="Ngày sinh" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="editedItem[getIndexList()].birthday" :active-picker.sync="activePicker" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01"></v-date-picker>
                                                    </v-menu>
                                                </div>
                                            </template>
                                        </v-col>
                                        <v-col>
                                            <template>
                                                <div>
                                                    <v-menu ref="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="editedItem[getIndexList()].schoolDay" label="Ngày nhập học" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="editedItem[getIndexList()].schoolDay" :active-picker.sync="activePicker" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01"></v-date-picker>
                                                    </v-menu>
                                                </div>
                                            </template>
                                        </v-col>
                                    </v-row>
                                </v-container>

                            </v-card-text>
                        </div>
                        <div class="formClassroom" v-else-if="getIndexList() == 2">
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].name" label="Tên lớp"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>

                            </v-card-text>
                        </div>
                        <div class="formActivity" v-else-if="getIndexList() == 3">

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].nameActivity" label="Tên hoạt động"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].applicableObject" label="Đối tượng tham dự"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].condition" label="Điều kiện tham dự"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].feeAttend" label="Phí tham dự"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].location" label="Địa điểm"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].detail" label="Chi tiết"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <template>
                                                <div>
                                                    <v-menu ref="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="editedItem[getIndexList()].startDate" label="Ngày bắt đầu" readonly v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="editedItem[getIndexList()].startDate" :active-picker.sync="activePicker" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01"></v-date-picker>
                                                    </v-menu>
                                                </div>
                                            </template>
                                        </v-col>
                                    </v-row>
                                </v-container>

                            </v-card-text>
                        </div>
                        <div class="formFood" v-else-if="getIndexList() == 4">
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].name" label="Tên thức ăn"></v-text-field>
                                        </v-col>

                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].element" label="Thành phần"></v-text-field>
                                        </v-col>

                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="editedItem[getIndexList()].calo" label="Lượng calo"></v-text-field>
                                        </v-col>

                                    </v-row>

                                </v-container>

                            </v-card-text>
                        </div>
                        <div class="formAdmin" v-else-if="getIndexList() == 5">
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field disabled v-model="editedItem[getIndexList()].username" label="Tên đăng nhập"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field disabled v-model="editedItem[getIndexList()].email" label="Email"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-select v-model="editedItem[getIndexList()].roles[0].name" :items="itemRoles" label="Vai trò"></v-select>
                                        </v-col>
                                    </v-row>

                                </v-container>

                            </v-card-text>
                        </div>

                        <!-- end segment -->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Hủy bỏ
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                                Lưu
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                    <!-- end add new item  -->
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Bạn có chắc muốn xóa chứ?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Hủy</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Đồng ý</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small v-if="getIndexList() != 5" @click="deleteItem(item)">
                mdi-delete
            </v-icon>

        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
        </template>
    </v-data-table>
</div>
</template>

<script>
import {
    HTTP
} from '../api/index.js';
export default {
    name: "list-page",

    data: () => ({
        overlay: false,
        showAutoCreate: false,
        itemRoles: [
            "ADMIN",
            "TEACHER",
            "STUDENT"
        ],
        urlImage: null,
        hasImage: false,
        image: null,
        errorGetData: {
            "message": "",
            "status": ""
        },
        fileImageSelected: null,
        rules: [
            value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ],
        activePicker: null,

        menu: false,
        categoryList: ['Danh sách giáo viên', 'Danh sách học sinh', 'Danh sách lớp học', 'Danh sách hoạt động', 'Danh sách món ăn', "Danh sách tài khoản"],
        valueSelected: 'Danh sách giáo viên',
        dialog: false,
        dialogDelete: false,
        headers: [
            [{
                    text: 'Mã giáo viên',
                    value: 'teacherId',
                }, {
                    text: 'Tên giáo viên',
                    value: 'name',
                },

                // { text: 'Số điện thoại', value: 'phoneNumber' },
                {
                    text: 'Email',
                    value: 'email'
                },
                {
                    text: 'Giới tính',
                    value: 'gender'
                },
                // { text: 'Địa chỉ', value: 'address' },
                // { text: 'Ngày sinh nhật', value: 'birthday' },
                {
                    text: 'Bằng cấp',
                    value: 'degree'
                },
                {
                    text: 'Tài khoản',
                    value: 'account.username'
                },

                {
                    text: 'Hành động',
                    value: 'actions',
                    sortable: false
                },
            ],
            [{
                    text: 'Mã học sinh',
                    value: 'studentId',
                }, {
                    text: 'Tên học sinh',
                    value: 'name',
                },

                // { text: 'Số điện thoại', value: 'phoneNumber' },
                {
                    text: 'Email',
                    value: 'email'
                },
                {
                    text: 'Giới tính',
                    value: 'gender'
                },
                // { text: 'Địa chỉ', value: 'address' },
                // { text: 'Ngày sinh nhật', value: 'birthday' },
                {
                    text: 'Ngày vào trường',
                    value: 'schoolDay'
                },
                {
                    text: 'Tài khoản',
                    value: 'account.username'
                },
                {
                    text: 'Hành động',
                    value: 'actions',
                    sortable: false
                },
            ],
            [{
                    text: 'Tên lớp',
                    value: 'name',
                },
                {
                    text: 'Số lượng học sinh',
                    value: 'studentNumber',
                },
                {
                    text: 'Hành động',
                    value: 'actions',
                    sortable: false
                },
            ],
            [{
                    text: 'Tên hoạt động',
                    value: 'nameActivity',
                },
                {
                    text: 'Đối tượng',
                    value: 'applicableObject',
                }, {
                    text: 'Địa điểm',
                    value: 'location',
                },
                {
                    text: 'Chi tiết',
                    value: 'detail',
                },
                {
                    text: 'Phí tham gia',
                    value: 'feeAttend',
                },
                {
                    text: 'Thời gian bắt đầu',
                    value: 'startDate',
                },
                {
                    text: 'Điều kiện tham dự',
                    value: 'condition',
                },
                {
                    text: 'Hành động',
                    value: 'actions',
                    sortable: false
                },
            ],
            [{
                    text: 'Tên món ăn',
                    value: 'name',
                }, {
                    text: 'Thành phần',
                    value: 'element',
                },
                {
                    text: 'Năng lượng',
                    value: 'calo',
                },
                {
                    text: 'Hành động',
                    value: 'actions',
                    sortable: false
                },
            ],
            [{
                    text: 'Tên đăng nhập',
                    value: 'username',
                },
                {
                    text: 'Email',
                    value: 'email',
                },
                {
                    text: 'Vai trò',
                    value: "roles[0].name",
                },
                {
                    text: 'Hành động',
                    value: 'actions',
                    sortable: false
                },
            ],

        ],

        desserts: [],
        editedIndex: -1,
        editedItem: [{
                "account": {
                    "email": "",
                    "username": ""
                },
                "address": "",
                "birthday": "",
                "degree": "",
                "email": "",
                "gender": "",
                "id": 0,
                "name": "",
                "phoneNumber": "",
                "urlImage": ""
            },

            {
                "account": {
                    "email": "",
                    "username": ""
                },
                "address": "",
                "birthday": "",
                "gender": "",
                "id": 0,
                "name": "",
                "phoneNumber": "",
                "schoolDay": "",
                "urlImage": ""
            },
            {
                "name": "",
                "studentNumber": 10
            },
            {
                "applicableObject": "",
                "condition": "",
                "createdBy": {
                    "email": "",
                    "username": ""
                },
                "detail": "",
                "feeAttend": 0,
                "id": 0,
                "location": "",
                "nameActivity": "",
                "startDate": "",
                "updatedBy": {
                    "email": "",
                    "username": ""
                }
            },
            {
                "calo": 0,
                "element": "",
                "name": ""
            },
            {
                "email": "",
                "id": 0,
                "roles": [{
                    "id": 0,
                    "name": ""
                }],
                "username": ""
            }
        ],
        defaultItem: [{
                "account": {
                    "email": "",
                    "username": ""
                },
                "address": "",
                "birthday": "",
                "degree": "",
                "email": "",
                "gender": "",
                "id": 0,
                "name": "",
                "phoneNumber": "",
                urlImage: ""
            },

            {
                "account": {
                    "email": "",
                    "username": ""
                },
                "address": "",
                "birthday": "",
                "email": "",
                "gender": "",
                "id": 0,
                "name": "",
                "phoneNumber": "",
                "schoolDay": "",
                "urlImage": ""
            },
            {
                "name": "",
                "studentNumber": 10
            },
            {
                "applicableObject": "",
                "condition": "",
                "createdBy": {
                    "email": "",
                    "username": ""
                },
                "detail": "",
                "feeAttend": 0,
                "id": 0,
                "location": "",
                "nameActivity": "",
                "startDate": "",
                "updatedBy": {
                    "email": "",
                    "username": ""
                }
            },
            {
                "calo": 0,
                "element": "",
                "name": ""
            },
            {
                "email": "",
                "id": 0,
                "roles": [{
                    "id": 0,
                    "name": ""
                }],
                "username": ""
            }
        ],
        search: '',
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Thêm mới' : 'Chỉnh sửa'
        },

    },

    watch: {
        menu(val) {
            val && setTimeout(1000, () => (this.activePicker = 'YEAR'))
        },
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
        valueSelected(oldValue, newValue) {
            if (oldValue != newValue) {
                this.initialize();
                this.errorGetData.message = '';
                this.errorGetData.status = '';
                if (this.getName() == "account") {
                    this.showAutoCreate = true
                } else {
                    this.showAutoCreate = false
                }
            }

        }
    },

    created() {
        this.initialize()
        this.resetAlert()
    },

    methods: {
        autoCreateAccount: async function () {
            try {
                this.overlay = true
                let resp1 = await HTTP.post("teacher/create_account")
                let resp2 = await HTTP.post("student/create_account")

                setTimeout(() => {
                    this.overlay = false
                }, 1000)
                if (resp1.status == 200 && resp2.status == 200) {
                    this.errorGetData.message = "Thực hiện thành công"
                    this.errorGetData.status = "success"
                } else if (resp1.status != 200 && resp2.status == 200) {
                    this.errorGetData.message = "Tạo tài khoản cho giáo viên thành công, học sinh thất bại"
                    this.errorGetData.status = "warning"
                } else if (resp1.status == 200 && resp2.status != 200) {
                    this.errorGetData.message = "Tạo tài khoản cho học sinh thành công, giáo viên thất bại"
                    this.errorGetData.status = "warning"
                } else {
                    this.errorGetData.message = "Đã có lỗi xảy ra"
                    this.errorGetData.status = "error"
                }
            } catch (error) {
                this.errorGetData.message = "Đã có lỗi xảy ra"
                this.errorGetData.status = "error"
            }
            this.initialize()
            this.resetAlert()

        },
        clearSelectFile() {
            try {
                const input = this.$refs.fileupload;
                input.type = 'text';
                input.type = 'file';
            } catch (error) {
                console.log("No file is selected")
            }
            this.urlImage = null

        },
        resetAlert() {
            setTimeout(() => {
                this.errorGetData.message = ''
                this.errorGetData.status = ''
            }, 1000)

        },
        initialize: async function () {
            console.log("reset data")
            this.clearSelectFile()
            this.desserts = []
            this.resetAlert()
            try {
                this.overlay = true
                let resp = await HTTP.get(`${this.getName()}`);
                setTimeout(() => {
                    this.overlay = false
                }, 1000)
                this.desserts = resp.data;

                if (this.desserts == '') {
                    this.errorGetData.message = "Không có dữ liệu";
                    this.errorGetData.status = "warning";
                } else if (this.getName() == "account") {

                    for (let index = 0; index < this.desserts.length; index += 1) {
                        if (this.desserts[index].roles != null) {
                            try {
                                this.desserts[index].roles[0].name = this.desserts[index].roles[0].name.split('_')[1]

                            } catch (error) {
                                console.log(index + "không có roles ở trong: " + this.desserts[index].id)
                            }
                        }

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
                    console.log(error)
                    this.errorGetData.message = `Lỗi lấy dữ liệu`;
                    this.errorGetData.status = "error";
                }

            }

        },
        getIndexList() {
            if (this.valueSelected == 'Danh sách giáo viên') {
                return 0;
            } else if (this.valueSelected == 'Danh sách học sinh') {
                return 1;
            } else if (this.valueSelected == 'Danh sách lớp học') {
                return 2;
            } else if (this.valueSelected == 'Danh sách hoạt động') {
                return 3;
            } else if (this.valueSelected == 'Danh sách món ăn') {
                return 4;
            } else if (this.valueSelected == 'Danh sách tài khoản') {
                return 5;
            }
        },
        getName() {
            if (this.valueSelected == 'Danh sách giáo viên') {
                return "teacher";
            } else if (this.valueSelected == 'Danh sách học sinh') {
                return "student";
            } else if (this.valueSelected == 'Danh sách lớp học') {
                return "class";
            } else if (this.valueSelected == 'Danh sách hoạt động') {
                return "activity";
            } else if (this.valueSelected == 'Danh sách món ăn') {
                return "food";
            } else if (this.valueSelected == 'Danh sách tài khoản') {
                return "account";
            }
        },
        checkHasImage(item) {
            // console.log(item == null || item.split("export=view&id=")[1] == "null" ||  item == '')
            if (item == null || item == '' || item.split("export=view&id=")[1] == "null") {
                return false
            } else {
                return true
            }
        },
        checkEmpty() {
            // if (this.desserts == '' && this.errorGetData.message == '') {
            //     return 1;
            if (this.desserts == '') return true;
            else {
                return false;
            }
            // return this.desserts == '' && this.errorGetData.message == '';

        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem[this.getIndexList()] = Object.assign({}, item)
            this.dialog = true
            this.clearSelectFile()
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem[this.getIndexList()] = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm: async function () {
            try {
                this.overlay = true
                let resp = await HTTP.delete(`${this.getName()}/${this.desserts[this.editedIndex].id}`);
                setTimeout(() => {
                    this.overlay = false
                }, 1000)
                if (resp.status == 200) {
                    this.errorGetData.message = "Đã xóa thành công";
                    this.errorGetData.status = "success"
                } else {
                    this.errorGetData.message = "Có lỗi xảy ra";
                    this.errorGetData.status = "error"
                }
                console.log(resp.data);
            } catch (error) {
                if (error.message == "Request failed with status code 403") {

                    this.errorGetData.message = "Lỗi token hoặc không thể thực hiện chức năng này, hãy đăng nhập lại"
                    this.errorGetData.status = "error"
                    window.localStorage.removeItem("token")
                    window.location.reload()
                    this.resetAlert()

                } else {
                    this.errorGetData.message = 'Lỗi xóa dữ liệu';
                    this.errorGetData.status = "error"
                }
            }
            this.desserts.splice(this.editedIndex, 1)
            setTimeout(() => {
                this.errorGetData.message = '';
                this.errorGetData.status = '';
            }, 1000);
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem[this.getIndexList()] = Object.assign({}, this.defaultItem[this.getIndexList()])
                this.editedIndex = -1
            })
            this.clearSelectFile()
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem[this.getIndexList()] = Object.assign({}, this.defaultItem[this.getIndexList()])
                this.editedIndex = -1
            })
        },
        onFileSelected(event) {
            this.image = event.target.files[0]
            this.urlImage = URL.createObjectURL(this.image)
        },
        save: async function () {
            if (this.editedIndex > -1) {
                try {
                    let resp = ''
                    this.overlay = true
                    if (this.getName() == "account") {

                        resp = await HTTP.put(`${this.getName()}/${this.desserts[this.editedIndex].id}?role=ROLE_${this.editedItem[this.getIndexList()].roles[0].name}`)
                    } else {
                        resp = await HTTP.put(`${this.getName()}/${this.desserts[this.editedIndex].id}`, this.editedItem[this.getIndexList()])

                    }
                    setTimeout(() => {
                        this.overlay = false
                    }, 1000)
                    // console.log(this.editedItem[this.getIndexList()])

                    if (resp.status == 200) {
                        if (this.getName() == "teacher" || this.getName() == "student") {
                            if (this.image != null) {
                                let fd = new FormData()
                                fd.append('image', this.image, this.image.name)
                                this.overlay = true
                                let resp1 = await HTTP.put(`${this.getName()}/update_photo/${resp.data.id}`, fd, )
                                setTimeout(() => {
                                    this.overlay = false
                                }, 1000)
                                console.log(resp1)
                                if (resp1.status == 200) {
                                    this.errorGetData.message = "cập nhật thành công"
                                    this.errorGetData.status = "success"
                                } else {
                                    this.errorGetData.message = "Lỗi khi cập nhật  ảnh"
                                    this.errorGetData.status = "warning"
                                }
                            } else {
                                this.errorGetData.message = "cập nhật thành công"
                                this.errorGetData.status = "success"
                            }
                        } else {
                            this.errorGetData.message = "cập nhật thành công"
                            this.errorGetData.status = "success"
                        }

                    } else {
                        this.errorGetData.message = "Lỗi cập nhật dữ liệu"
                        this.errorGetData.status = "error"
                    }
                } catch (error) {
                    if (error.message == "Request failed with status code 403") {
                        this.errorGetData.message = "Lỗi token hoặc không thể thực hiện chức năng này, hãy đăng nhập lại"
                        this.errorGetData.status = "error"
                        window.localStorage.removeItem("token")
                        window.location.reload()
                        this.resetAlert()
                    } else {
                        this.errorGetData.message = "Lỗi cập nhật dữ liệu"
                        this.errorGetData.status = "error"
                    }

                }
                this.resetAlert()
                // Object.assign(this.desserts[this.editedIndex], this.editedItem[this.getIndexList()])
            } else {
                try {
                    console.log(this.editedItem[this.getIndexList()])
                    this.overlay = true
                    let resp = await HTTP.post(`${this.getName()}/`, this.editedItem[this.getIndexList()])
                    setTimeout(() => {
                        this.overlay = false
                    }, 1000)
                    if (resp.status == 200) {
                        if (this.getName() == "teacher" || this.getName() == "student") {
                            if (this.image != null) {
                                let fd = new FormData()
                                fd.append('image', this.image, this.image.name)
                                this.overlay = true
                                let resp1 = await HTTP.put(`${this.getName()}/update_photo/${resp.data.id}`, fd, )
                                setTimeout(() => {
                                    this.overlay = false
                                }, 1000)
                                if (resp1.status == 200) {
                                    this.errorGetData.message = "Thêm mới thành công"
                                    this.errorGetData.status = "success"
                                } else {
                                    this.errorGetData.message = "Lỗi khi thêm ảnh"
                                    this.errorGetData.status = "warning"
                                }
                            } else {
                                this.errorGetData.message = "Thêm mới thành công"
                                this.errorGetData.status = "success"
                            }
                        } else {
                            this.errorGetData.message = "Thêm mới thành công"
                            this.errorGetData.status = "success"
                        }

                    } else {
                        this.errorGetData.message = "Lỗi thêm mới"
                        this.errorGetData.status = "error"
                    }

                    // this.desserts.push(this.editedItem[this.getIndexList()])
                } catch (error) {
                    if (error.message == "Request failed with status code 403") {
                        this.errorGetData.message = "Lỗi token hoặc không thể thực hiện chức năng này, hãy đăng nhập lại"
                        this.errorGetData.status = "error"
                        window.localStorage.removeItem("token")
                        window.location.reload()
                        this.resetAlert()
                    } else {
                        this.errorGetData.message = "Lỗi thêm mới"
                        this.errorGetData.status = "error"
                    }
                }
                this.resetAlert()
            }
            this.close()
            this.initialize();
        },
    },
    filters: {
        pickExactDate(date = '1979-05-27T17:00:00Z') {
            return date.split('T')[0];
        },
    }
}
</script>

<style scoped>
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

#fileInput {
    display: none;
}

#preview {
    display: flex;
    justify-content: center;
    align-items: center;
}

#preview img {
    max-width: 100%;
    max-height: 500px;
}
</style>
