<template>
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

                        <v-dialog v-bind="attrs" v-on="on" transition="dialog-bottom-transition"  max-width="600">
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
</template>

<script>
import Multiselect from 'vue-multiselect'
import {
    HTTP
} from '../api/index'
export default {
    data: () => ({
        menuDay:{},
        value: [],
        options: [{
                name: 'Vue.js',
                code: 'vu'
            },
            {
                name: 'Javascript',
                code: 'js'
            },
            {
                name: 'Open Source',
                code: 'os'
            }
        ],
        instancesOption: [],
        focus: '',
        type: 'day',
        typeToLabel: {
            day: 'Day'
        },
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    components: {
        Multiselect
    },
    mounted() {
        this.$refs.calendar.checkChange()
    },
    created: async function () {

        // var arr = []
        let resp = await HTTP.get('food')
        if (resp.status == 200) {
            console.log(resp.data)
            // this.instancesOption = resp.data
            this.options = resp.data
            // for (let item in this.instancesOption) {
            //     arr.push(item)
            // }
            // this.options = arr
        }
    },
    methods: {
        addFood(){
            window.location.reload()
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
        updateRange({
            start,
            end
        }) {
            const events = []

            const min = new Date(`${start.date}T11:00:00`)
            const max = new Date(`${end.date}T11:30:00`)
            const days = (max.getTime() - min.getTime()) / 86400000
            // số lượng món ăn trong ngày
            const eventCount = this.rnd(days, days + 5)

            const firstTimestamp = this.rnd(min.getTime(), max.getTime())
            const first = new Date(firstTimestamp - (firstTimestamp % 900000))
            const secondTimestamp = this.rnd(new Date(`${start.date}T12:30:00`).getTime(), new Date(`${end.date}T13:00:00`).getTime())
            const second = new Date(secondTimestamp - (secondTimestamp % 900000))
            // thêm số món ăn vào items để hiển thị
            for (let i = 0; i < eventCount; i++) {

                const allDay = 1 === 0
                events.push({
                    name: this.names[this.rnd(0, this.names.length - 1)],
                    start: first,
                    end: second,
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: !allDay,
                })
                events.push({
                    name: this.names[this.rnd(0, this.names.length - 1)],
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
