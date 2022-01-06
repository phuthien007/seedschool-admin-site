<template>
<div id="detail">
    <v-container>
        <h1>Thông tin chi tiết</h1>
        <h3>Danh sách giáo viên phụ trách lớp</h3>
        <template>
            <div class="text-center">
                <v-dialog v-model="dialog2" fullscreen>
                    <template v-slot:activator="{ on, attrs }">

                        <v-btn @click="handleGetTeacher" dark v-bind="attrs" v-on="on" color="primary">Thêm giáo viên vào lớp</v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            Thêm giáo viên
                        </v-card-title>

                        <v-checkbox v-for="item in activityList" :key="item.id" v-model="selected" :label="labelDisplay(item.name, item.teacherId)" :value="item.id">he</v-checkbox>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-btn text @click="dialog2 = false">
                                Đóng
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn text @click="dialog2 = false; saveTeacherToClass()">
                                Thêm
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </template>

        <v-row>
            <v-col v-for="item in classroom.teacher" :key="item.id">
                <v-list-item :id="item.id">
                    <v-list-item-content>
                        <v-list-item-subtitle>

                            <v-card class="mx-auto" max-width="344">
                                <v-img v-if="checkHasImage(item.urlImg)" :src="item.urlImg" alt="Không có ảnh" height="250px"></v-img>
                                <v-img v-else src="data:image/png;base64,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" height="250px"></v-img>
                                <v-card-title>
                                    {{item.name}} - {{item.teacherId}}
                                </v-card-title>

                                <v-card-subtitle>
                                    <v-row>
                                        Email: {{item.email}}
                                    </v-row>
                                    <v-row>Địa chỉ: {{item.address}},
                                    </v-row>

                                    <v-row>
                                        Bằng cấp: {{item.degree}}
                                    </v-row>
                                    <v-row>

                                        Số điện thoại: {{item.phoneNumber}}
                                    </v-row>
                                </v-card-subtitle>

                            </v-card>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

            </v-col>
        </v-row>
        <v-divider class="mt-2 mb-2"></v-divider>

        <v-row class="mt-2">

            <v-col cols="8">
                <h3>Danh sách học sinh trong lớp</h3>
                <template>
                    <div class="text-center">
                        <v-dialog v-model="dialog3" fullscreen>
                            <template v-slot:activator="{ on, attrs }">

                                <v-btn @click="handleGetStudent" dark v-bind="attrs" v-on="on" color="primary">Thêm học sinh vào lớp</v-btn>
                            </template>

                            <v-card>
                                <v-card-title class="text-h5 grey lighten-2">
                                    Thêm học sinh
                                </v-card-title>

                                <v-checkbox v-for="item in dataList" :key="item.id" v-model="selected" :label="labelDisplay(item.id, item.studentId)" :value="item.id"></v-checkbox>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-btn text @click="dialog3 = false">
                                        Đóng
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn text @click="dialog3 = false; saveStudentToClass()">
                                        Thêm
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                </template>

                <template>
                    <v-card class="mt-2">
                        <v-card-title>
                            {{classroom.class.name}}
                            <v-spacer></v-spacer>
                            <v-text-field v-model="search" class="mt-2" append-icon="mdi-magnify" label="Tra cứu" single-line hide-details></v-text-field>
                        </v-card-title>
                        <v-data-table :headers="headers" :items="classroom.student" :search="search"></v-data-table>
                    </v-card>
                </template>
            </v-col>
            <v-col cols="4">
                <h3>Danh sách hoạt động của lớp</h3>
                <template>
                    <div class="text-center">
                        <v-dialog v-model="dialog1" fullscreen>
                            <template v-slot:activator="{ on, attrs }">

                                <v-btn @click="handleGetActivity" dark v-bind="attrs" v-on="on" color="primary">Thêm hoạt động vào lớp</v-btn>
                            </template>

                            <v-card>
                                <v-card-title class="text-h5 grey lighten-2">
                                    Thêm hoạt động
                                </v-card-title>

                                <p>{{ selected }}</p>
                                <v-checkbox v-for="item in activityList" :key="item.id" v-model="selected" :label="item.nameActivity" :value="item.id"></v-checkbox>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-btn text @click="dialog1 = false">
                                        Đóng
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn text @click="dialog1 = false; saveActivityToClass()">
                                        Thêm
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                </template>

                <div class="mt-2">
                    <v-card elevation="5" max-width="400" class="mx-auto">
                        <v-virtual-scroll :items="classroom.activity" height="300" item-height="64">
                            <template v-slot:default="{ item }">
                                <v-list-item :key="item">
                                    <v-list-item-action>
                                        <v-dialog v-model="dialog" width="500">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn fab small depressed v-bind="attrs" v-on="on" color="primary">
                                                    <v-icon>mdi-eye</v-icon>
                                                </v-btn>
                                            </template>

                                            <v-card>
                                                <v-card-title class="text-h5 grey lighten-2">
                                                    {{item.nameActivity}}
                                                </v-card-title>
                                                <v-row>
                                                    <v-card-text class="mt-2">
                                                        <v-row>
                                                            <v-col>
                                                                Đối tượng áp dụng: {{item.applicableObject}}
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col>
                                                                Điều kiện tham dự: {{item.condition}}
                                                            </v-col>
                                                            <v-col>
                                                                Lệ phí: {{item.feeAttend}}
                                                            </v-col>
                                                        </v-row>

                                                        <v-row>
                                                            <v-col>
                                                                Chi tiết: {{item.detail}}
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col>
                                                                Ngày bắt đầu: {{item.startDate | pickExactDate}}
                                                            </v-col>
                                                            <v-col>
                                                                Giờ bắt đầu: {{item.startDate | pickExactTime}}
                                                            </v-col>
                                                        </v-row>

                                                    </v-card-text>
                                                </v-row>

                                                <v-divider></v-divider>

                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="primary" text @click="dialog = false">
                                                        Xong
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>

                                    </v-list-item-action>

                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <strong>{{ item.nameActivity  }}</strong>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-divider></v-divider>
                            </template>
                        </v-virtual-scroll>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>

</div>
</template>

<script>
import {
    HTTP
} from '../api/index'
export default {
    name: "detail-class",
    data() {
        return ({
            dataList: [],
            teacherList: [],
            studentList: [],
            selected: [],
            dialog2: false,
            dialog1: false,
            dialog: false,
            classroom: {
                class: {},
                teacher: [],
                student: [],
                activity: []
            },
            search: '',
            headers: [{
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

            ],

        })
    },
    computed: {

        items() {
            return Array.from({
                length: this.length
            }, (k, v) => v + 1)
        },
        length() {
            return 7000
        },
    },
    mounted: async function () {
        await this.getAllDataClass()
    },
    methods: {
        labelDisplay(name, id) {
            return name + ' - ' + id
        },
        handleGetTeacher: async function () {
            for (let index = 0; index < this.classroom.teacher.length; index += 1) {
                this.selected.push(this.classroom.teacher[index].id)
            }
            let resp = await HTTP.get("teacher")
            if (resp.status == 200) {
                this.dataList = resp.data
            }
        },
        async saveTeacherToClass() {
            try {
                let resp = await HTTP.put(`class/add_teachers/${this.classroom.class.id}`, this.selected)
                if (resp.status == 200) {
                    this.selected = []
                    this.classroom.teacher = resp.data
                }
            } catch (error) {
                console.log(error)
            }
        },

        handleGetStudent: async function () {
            for (let index = 0; index < this.classroom.student.length; index += 1) {
                this.selected.push(this.classroom.student[index].id)
            }
            let resp = await HTTP.get("student")
            if (resp.status == 200) {
                this.dataList = resp.data
            }
        },
        async saveStudentToClass() {
            try {
                let resp = await HTTP.put(`class/add_students/${this.classroom.class.id}`, this.selected)
                if (resp.status == 200) {
                    this.selected = []
                    this.classroom.student = resp.data
                }
            } catch (error) {
                console.log(error)
            }
        },

        handleGetActivity: async function () {
            for (let index = 0; index < this.classroom.activity.length; index += 1) {
                this.selected.push(this.classroom.activity[index].id)
            }
            let resp = await HTTP.get("activity")
            if (resp.status == 200) {
                this.dataList = resp.data
            }
        },
        async saveActivityToClass() {
            try {
                let resp = await HTTP.put(`class/add_activities/${this.classroom.class.id}`, this.selected)
                if (resp.status == 200) {
                    this.selected = []
                    this.classroom.activity = resp.data
                }
            } catch (error) {
                console.log(error)
            }
        },
        getAllDataClass: async function () {
            try {
                let resp = await HTTP.get(`class/${window.location.href.split('/')[window.location.href.split('/').length-1]}`)
                if (resp.status == 200) {
                    this.classroom.class = resp.data
                }
                resp = await HTTP.get(`class/activity_list?id=${window.location.href.split('/')[window.location.href.split('/').length-1]}`)
                if (resp.status == 200) {
                    this.classroom.activity = resp.data
                }
                resp = await HTTP.get(`class/student_list?id=${window.location.href.split('/')[window.location.href.split('/').length-1]}`)
                if (resp.status == 200) {
                    this.classroom.student = resp.data
                }

                resp = await HTTP.get(`class/teacher_list?id=${window.location.href.split('/')[window.location.href.split('/').length-1]}`)
                if (resp.status == 200) {
                    this.classroom.teacher = resp.data
                }

            } catch (error) {
                console.log(error)
            }
        },
        checkHasImage(item) {
            if (item == null || item == '' || item.split("export=view&id=")[1] == "null") {
                return false
            } else {
                return true
            }
        },
    },
    filters: {
        pickExactDate: function (date) {
            var day = new Date(date)
            return day.toISOString().split('T')[0]
        },
        pickExactTime: function (date) {
            var day = new Date(date)
            let arr = day.toISOString().split('T')[1].split(":")
            return arr[0] + ":" + arr[1]
        }
    }
}
</script>

<style>

</style>
