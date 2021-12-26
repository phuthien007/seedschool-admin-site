<template>
<v-row class="fill-height mr-1">

    <v-col>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate color="blue" size="45"></v-progress-circular>
        </v-overlay>
        <transition name="slide-fade">
            <v-alert :type="errorGetData.status" v-if="errorGetData.message != ''">
                {{errorGetData.message}}
            </v-alert>
        </transition>
        <v-sheet height="64">
            <v-toolbar flat>
                <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                    Today
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="prev">
                    <v-icon small>
                        mdi-chevron-left
                    </v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                    <v-icon small>
                        mdi-chevron-right
                    </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                    {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog transition="dialog-bottom-transition" max-width="600">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="gray" v-bind="attrs" @click="resetItem" v-on="on">Thêm mới hoạt động</v-btn>
                    </template>
                    <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar dark>
                                <v-toolbar-title>Thêm mới</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <template>
                                    <div>

                                        <v-text-field label="Đối tượng áp dụng" v-model="item.applicableObject" hide-details="auto"></v-text-field>
                                        <v-text-field label="Tên hoạt động" v-model="item.nameActivity"></v-text-field>
                                        <v-text-field label="Điều kiện tham dự" v-model="item.condition"></v-text-field>
                                        <v-text-field label="Chi tiết" v-model="item.detail"></v-text-field>
                                        <v-text-field label="Phí tham dự" v-model="item.feeAttend"></v-text-field>
                                        <v-text-field label="Địa điểm tổ chức" v-model="item.location"></v-text-field>
                                        <template>
                                            <v-row>
                                                <v-col cols="auto">
                                                    <v-dialog transition="dialog-bottom-transition" max-width="290">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-bind="attrs" v-on="on" label="Ngày bắt đầu" v-model="newpicker1"></v-text-field>

                                                        </template>
                                                        <template v-slot:default="dialog">
                                                            <v-card>
                                                                <v-row>
                                                                    <v-col justify="center">
                                                                        <v-date-picker v-model="newpicker1"></v-date-picker>
                                                                    </v-col>
                                                                    <!-- <v-col>
                                                                <v-time-picker v-model="picker2"></v-time-picker>
                                                            </v-col> -->
                                                                </v-row>
                                                                <v-card-actions class="justify-end">
                                                                    <v-btn text @click="dialog.value = false;">Xong</v-btn>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </template>
                                                    </v-dialog>
                                                </v-col>
                                                <v-col cols="auto">
                                                    <v-dialog transition="dialog-bottom-transition" max-width="290">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-bind="attrs" v-on="on" label="Giờ bắt đầu" v-model="newpicker2"></v-text-field>

                                                        </template>
                                                        <template v-slot:default="dialog">
                                                            <v-card>
                                                                <v-row>
                                                                    <v-col justify="center">
                                                                        <v-time-picker v-model="newpicker2"></v-time-picker>
                                                                    </v-col>
                                                                </v-row>
                                                                <v-card-actions class="justify-end">
                                                                    <v-btn text @click="dialog.value = false;">Xong</v-btn>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </template>
                                                    </v-dialog>
                                                </v-col>
                                            </v-row>
                                        </template>
                                    </div>
                                </template>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn text color="secondary" @click="dialog.value = false;">
                                    Thoát
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn text @click=" saveNew(); dialog.value = false;">
                                    Lưu
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
                <v-menu bottom right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                            <span>{{ typeToLabel[type] }}</span>
                            <v-icon right>
                                mdi-menu-down
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="type = 'day'">
                            <v-list-item-title>Day</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'week'">
                            <v-list-item-title>Week</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'month'">
                            <v-list-item-title>Month</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = '4day'">
                            <v-list-item-title>4 days</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
            <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor" :type="type" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay" @change="updateRange"></v-calendar>
            <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
                <v-card color="grey lighten-4" min-width="350px" flat>
                    <v-toolbar :color="selectedEvent.color" dark>
                        <v-btn icon @click="edited = true">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <template>
                            <div>

                                <v-text-field :disabled="!edited" v-if="selectedEvent.data != null" label="Đối tượng áp dụng" v-model="selectedEvent.data.applicableObject" :rules="rules" hide-details="auto"></v-text-field>
                                <v-text-field :disabled="!edited" v-if="selectedEvent.data != null" label="Tên hoạt động" v-model="selectedEvent.data.nameActivity"></v-text-field>
                                <v-text-field :disabled="!edited" v-if="selectedEvent.data != null" label="Điều kiện tham dự" v-model="selectedEvent.data.condition"></v-text-field>
                                <v-text-field :disabled="!edited" v-if="selectedEvent.data != null" label="Chi tiết" v-model="selectedEvent.data.detail"></v-text-field>
                                <v-text-field :disabled="!edited" v-if="selectedEvent.data != null" label="Phí tham dự" v-model="selectedEvent.data.feeAttend"></v-text-field>
                                <v-text-field :disabled="!edited" v-if="selectedEvent.data != null" label="Địa điểm tổ chức" v-model="selectedEvent.data.location"></v-text-field>
                                <template>
                                    <v-row>
                                        <v-col cols="auto">
                                            <v-dialog transition="dialog-bottom-transition" max-width="290">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field :disabled="!edited" v-bind="attrs" v-on="on" label="Ngày bắt đầu" v-model="picker1"></v-text-field>

                                                </template>
                                                <template v-slot:default="dialog">
                                                    <v-card>
                                                        <v-row>
                                                            <v-col justify="center">
                                                                <v-date-picker v-model="picker1"></v-date-picker>
                                                            </v-col>
                                                            <!-- <v-col>
                                                                <v-time-picker v-model="picker2"></v-time-picker>
                                                            </v-col> -->
                                                        </v-row>
                                                        <v-card-actions class="justify-end">
                                                            <v-btn text @click="dialog.value = false;">Xong</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </template>
                                            </v-dialog>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-dialog transition="dialog-bottom-transition" max-width="290">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field :disabled="!edited" v-bind="attrs" v-on="on" label="Giờ bắt đầu" v-model="picker2"></v-text-field>

                                                </template>
                                                <template v-slot:default="dialog">
                                                    <v-card>
                                                        <v-row>
                                                            <v-col justify="center">
                                                                <v-time-picker v-model="picker2"></v-time-picker>
                                                            </v-col>
                                                        </v-row>
                                                        <v-card-actions class="justify-end">
                                                            <v-btn text @click="dialog.value = false;">Xong</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </template>
                                            </v-dialog>
                                        </v-col>
                                    </v-row>
                                </template>
                            </div>
                        </template>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="secondary" @click="selectedOpen = false">
                            Thoát
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn v-show="edited" text @click="saveActivity(selectedEvent)">
                            Lưu
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
        </v-sheet>
    </v-col>
</v-row>
</template>

<script>
import {
    HTTP
} from '../api'
export default {
    data: () => ({
        item: {
            "applicableObject": "",
            "condition": "",
            "detail": "",
            "feeAttend": 0,
            "location": "",
            "nameActivity": "",
            "startDate": ""
        },
        newpicker1: null,
        newpicker2: null,
        overlay: false,
        errorGetData: {
            message: '',
            status: ''
        },
        edited: false,
        startDate: '',
        picker1: null,
        picker2: null,
        rules: [

        ],
        curMonth: null,
        focus: '',
        type: 'month',
        typeToLabel: {
            month: 'Month',
            week: 'Week',
            day: 'Day',
            '4day': '4 Days',
        },
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    async mounted() {
        this.$refs.calendar.checkChange()
        this.curMonth = this.$refs.calendar.times.now.month - 1
        await this.updateItems()
    },
    methods: {
        saveNew: async function () {
            try {
                this.item.startDate = this.newpicker1 + 'T' + this.newpicker2 + ':00'
                this.overlay = true
                let resp = await HTTP.post(`activity/`, this.item)
                setTimeout(() => {
                    this.overlay = false
                }, 1000)
                if (resp.status == 200) {
                    console.log('success')
                    this.edited = false
                    this.errorGetData.message = "Tạo mới thành công"
                    this.errorGetData.status = 'success'
                    window.location.reload()
                }

            } catch (error) {
                setTimeout(() => {
                    this.overlay = false
                }, 1000)
                if (error.message == "Request failed with status code 403") {
                    this.errorGetData.message = "Lỗi token hoặc không thể thực hiện chức năng này, hãy đăng nhập lại"
                    this.errorGetData.status = "error"
                    window.localStorage.removeItem("token")
                    window.location.reload()
                    this.resetAlert()
                } else {
                    this.errorGetData.message = "Có lỗi đã xảy ra, không thể lưu lại thay đổi"
                    this.errorGetData.status = 'error'
                }

            }
            setTimeout(() => {
                this.errorGetData.status = ''
                this.errorGetData.message = ''
            }, 1000)
        },
        resetItem() {
            this.item = {
                "applicableObject": "",
                "condition": "",
                "detail": "",
                "feeAttend": 0,
                "location": "",
                "nameActivity": "",
                "startDate": ""
            }
            this.newpicker1 = null
            this.newpicker2 = null
        },
        async saveActivity(item) {
            try {
                item.data.startDate = this.picker1 + 'T' + this.picker2 + ':00'
                this.overlay = true
                let resp = await HTTP.put(`activity/${item.data.id}`, item.data)
                this.overlay = false
                if (resp.status == 200) {
                    console.log('success')
                    this.edited = false
                    this.errorGetData.message = "Lưu thay đổi thành công"
                    this.errorGetData.status = 'success'
                }

            } catch (error) {
                console.log(error)
                this.errorGetData.message = "Có lỗi đã xảy ra, không thể lưu lại thay đổi"
                this.errorGetData.status = 'error'
            }

            setTimeout(() => {
                this.errorGetData.status = ''
                this.errorGetData.message = ''
            }, 1000)

        },
        viewDay({
            date
        }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor(event) {
            return event.color
        },
        setToday() {
            this.focus = ''
        },
        prev() {
            this.$refs.calendar.prev()
        },
        next() {
            this.$refs.calendar.next()
        },
        showEvent({
            nativeEvent,
            event
        }) {

            try {
                this.picker1 = event.data.startDate.split('T')[0]
                this.picker2 = event.data.startDate.split('T')[1].split(':')[0] + ':' + event.data.startDate.split('T')[1].split(':')[1]
                console.log(this.picker2)
            } catch (error) {
                console.log(error)

                this.picker1 = null
                this.picker2 = null
            }
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                requestAnimationFrame(() => requestAnimationFrame(() => open()))
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },
        async updateRange({
            start
        }) {
            if (start.month != this.curMonth + 1) {

                await this.updateItems()

            }
        },
        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
        updateItems: async function () {
            try {
                var date = new Date()
                const monthCur = date.getMonth()
                const events = []
                this.overlay = true
                for (let i = 2; i < 33; i++) {
                    var firstDay = new Date(date.getFullYear(), date.getMonth(), i);

                    if (firstDay.getMonth() == monthCur) {
                        let date = firstDay.toISOString().split('T')[0]
                        let resp = await HTTP.get(`activity/search_start_date?startDate=${date}`)
                        if (resp.status == 200) {
                            let data = resp.data
                            for (let i = 0; i < data.length; i++) {
                                const allDay = this.rnd(0, 1) === 0
                                const first = new Date(`${data[i].startDate}`)
                                const second = new Date(`${data[i].startDate.split('T')[0]}T10:00:00.000Z`)

                                events.push({
                                    // data:data[i],
                                    name: data[i].nameActivity,
                                    start: first,
                                    end: second,
                                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                                    timed: !allDay,
                                })
                                events.push({
                                    data: data[i],
                                    name: data[i].nameActivity,
                                    start: first,
                                    end: second,
                                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                                    timed: allDay,
                                })
                            }

                        }

                    }

                }
                setTimeout(() => {
                    this.overlay = false
                }, 1000)
                this.events = events
            } catch (error) {
                setTimeout(() => {
                    this.overlay = false
                }, 1000)
                if (error.message == "Request failed with status code 403") {
                    this.errorGetData.message = "Lỗi token hoặc không thể thực hiện chức năng này, hãy đăng nhập lại"
                    this.errorGetData.status = "error"
                    window.localStorage.removeItem("token")
                    window.location.reload()
                    this.resetAlert()
                } else {
                    this.errorGetData.message = "Có lỗi đã xảy ra, không thể lưu lại thay đổi"
                    this.errorGetData.status = 'error'
                }
            }

             setTimeout(() => {
                this.errorGetData.status = ''
                this.errorGetData.message = ''
            }, 1000)

        }
    },
}
</script>
