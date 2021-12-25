<template>
<div>
    <transition name="slide-fade">
        <v-alert :type="errorGetData.status" v-if="errorGetData.message != ''">
            {{errorGetData.message}}
        </v-alert>
    </transition>
    <v-row class="fill-height">

        <v-col>
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
                    <v-menu bottom right>

                        <template v-slot:activator="{ on, attrs }">

                            <v-dialog v-bind="attrs" v-on="on" transition="dialog-bottom-transition" max-width="600">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="primary" v-bind="attrs" v-on="on">Thêm món ăn</v-btn>
                                </template>
                                <template v-slot:default="dialog">
                                    <v-card>
                                        <v-toolbar color="primary" dark>Thêm món ăn</v-toolbar>
                                        <div class="mt-4">
                                            <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="false">
                                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
                                            </multiselect>
                                            <pre class="language-json"><code>{{ value  }}</code></pre>
                                        </div>

                                        <v-card-actions class="justify-end">
                                            <v-btn text @click="addFood">Thêm</v-btn>
                                            <v-spacer></v-spacer>
                                            <v-btn text @click="dialog.value = false">Đóng</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </template>
                    </v-menu>
                </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
                <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor" :type="type" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay" @change="updateRange"></v-calendar>
                <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
                    <v-card color="grey lighten-4" min-width="350px" flat>
                        <v-toolbar :color="selectedEvent.color" dark>
                            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <span v-html="selectedEvent.details"></span>
                        </v-card-text>
                    </v-card>
                </v-menu>
            </v-sheet>
        </v-col>
    </v-row>
</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import {
    HTTP
} from '../api/index'
export default {
    data: () => ({
        errorGetData: {
            "message": "",
            "status": ""
        },
        menuDay: null,
        value: [],
        options: [],
        instancesOption: [],
        focus: '',
        type: 'day',
        dateCur: null,
        typeToLabel: {
            day: 'Day'
        },
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        foods: [],
    }),
    components: {
        Multiselect
    },
    mounted: async function () {
        this.getFoodByDate()
        this.$refs.calendar.checkChange()

        // set food to selected
        let resp = await HTTP.get('food')
        if (resp.status == 200) {
            this.options = resp.data
        }

        // setup menu
        await this.resetMenu()
    },
    methods: {
        resetAlert() {
            setTimeout(() => {
                this.errorGetData.message = ''
                this.errorGetData.status = ''
            }, 1000)

        },
        async resetMenu() {
            this.value = []
            this.events = []
            const events = []
            await this.getFoodByDate()
            const min = new Date(`${this.dateCur}T11:00:00`)
            const max = new Date(`${this.dateCur}T11:30:00`)

            const firstTimestamp = this.rnd(min.getTime(), max.getTime())
            const first = new Date(firstTimestamp - (firstTimestamp % 900000))
            const secondTimestamp = this.rnd(new Date(`${this.dateCur}T12:30:00`).getTime(), new Date(`${this.dateCur}T13:00:00`).getTime())
            const second = new Date(secondTimestamp - (secondTimestamp % 900000))
            // thêm số món ăn vào items để hiển thị

            for (let i = 0; i < this.foods.length; i++) {

                const allDay = 1 === 0
                events.push({
                    name: this.foods[i].name,
                    start: first,
                    end: second,
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: !allDay,
                })
                events.push({
                    name: this.foods[i].name,
                    start: first,
                    end: second,
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: allDay,
                })
            }

            this.events = events
        },
        addFood: async function () {
            try {
                let listId = []
                for (let id = 0; id < this.value.length; id += 1) {
                    listId.push(this.value[id].id)
                }
                var resp = null
                try {
                    resp = await HTTP.get(`menu/findMenu?date=${this.dateCur}`)
                } catch (error) {
                    resp = await HTTP.post('menu/create',
                        JSON.stringify({

                            "date": this.dateCur,
                            "name": `${this.menuDay}`

                        })
                    )
                }

                if (resp.status == 200) {
                    this.menuDay = resp.data
                }

                let resp1 = await HTTP.put(`menu/add_foods/${this.menuDay.id}`, listId)
                if (resp1.status == 200) {
                    this.errorGetData.message = "Thêm thức ăn thành công"
                    this.errorGetData.status = 'success'
                    this.value = resp1.data
                    await this.resetMenu()
                    this.resetAlert()
                }
            } catch (error) {
                this.errorGetData.message = "Đã có lỗi xảy ra, vui lòng thử lại sau"
                this.errorGetData.status = 'error'
                console.log(error)
                this.resetAlert()
            }

            // window.location.reload()
        },
        getNameDate(current_day) {

            // Biến lưu tên của thứ
            var day_name = '';

            // Lấy tên thứ của ngày hiện tại
            switch (current_day) {
                case 0:
                    day_name = "Chủ nhật";
                    break;
                case 1:
                    day_name = "Thứ hai";
                    break;
                case 2:
                    day_name = "Thứ ba";
                    break;
                case 3:
                    day_name = "Thứ tư";
                    break;
                case 4:
                    day_name = "Thứ năm";
                    break;
                case 5:
                    day_name = "Thứ sau";
                    break;
                case 6:
                    day_name = "Thứ bảy";
            }
            return day_name
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
            console.log(this.$refs.calendar.times.today.date)
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
        getFoodByDate: async function () {
            if (this.dateCur == null) {
                this.dateCur = this.$refs.calendar.times.today.date
            }

            try {
                let resp = await HTTP.get(`menu/findMenu?date=${this.dateCur}`)
                if (resp.status == 200) {
                    this.menuDay = resp.data
                    let resp1 = await HTTP.get(`menu/food_list?id=${this.menuDay.id}`)
                    if (resp1.status == 200) {
                        this.foods = resp1.data
                        this.value = resp1.data
                    } else {
                        this.foods = []
                        this.value = []
                    }

                } else {
                    this.menuDay == null
                }
            } catch (error) {
                if (error.message == "Request failed with status code 403") {
                    window.localStorage.removeItem("token")
                    window.location.reload()
                } else {
                    console.log(error)
                }
                this.errorGetData.message = "Menu chưa được tạo cho ngày hôm nay"
                this.errorGetData.status = 'warning'
                this.menuDay == null
                this.foods = []
                this.value = []

                this.resetAlert()
            }

        },
        async updateRange({
            start,
            end
        }) {
            this.value = []
            this.events = []
            const events = []
            this.dateCur = start.date

            await this.getFoodByDate()

            console.log('food : ' + this.foods)
            const min = new Date(`${start.date}T11:00:00`)
            const max = new Date(`${end.date}T11:30:00`)
            this.nameDate = this.getNameDate(min.getDay())
            const firstTimestamp = this.rnd(min.getTime(), max.getTime())
            const first = new Date(firstTimestamp - (firstTimestamp % 900000))
            const secondTimestamp = this.rnd(new Date(`${start.date}T12:30:00`).getTime(), new Date(`${end.date}T13:00:00`).getTime())
            const second = new Date(secondTimestamp - (secondTimestamp % 900000))
            // thêm số món ăn vào items để hiển thị

            for (let i = 0; i < this.foods.length; i++) {

                const allDay = 1 === 0
                events.push({
                    name: this.foods[i].name,
                    start: first,
                    end: second,
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: !allDay,
                })
                events.push({
                    name: this.foods[i].name,
                    start: first,
                    end: second,
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: allDay,
                })
            }

            this.events = events
        },
        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
    },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
