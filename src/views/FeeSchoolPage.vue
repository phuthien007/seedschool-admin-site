<template>
<v-card class="mr-4">
    <v-tabs color="deep-purple accent-4" right>

        <v-tab>Thu</v-tab>
        <v-tab>Chi</v-tab>
        <v-tab-item>
            <template>
                <v-card>
                    <v-toolbar flat color="primary" dark>
                        <v-toolbar-title>Thu</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <template>
                            <div class="text-center">
                                <v-dialog v-model="dialog" width="500">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="green lighten-1" dark v-bind="attrs" v-on="on">
                                            Thêm mới
                                        </v-btn>
                                    </template>

                                    <v-card>
                                        <v-card-title class="text-h5 grey lighten-2">
                                            Thêm mới
                                        </v-card-title>
                                        <v-form id="fm">
                                            <div class="pl-2 pr-2">
                                                <v-text-field label="Tên khoản" v-model="newData.name" hide-details="auto"></v-text-field>
                                                <v-text-field label="Người ủng hộ" v-model="newData.contributor"></v-text-field>
                                                <v-text-field type="number" v-model="newData.amountOfMoney" label="Số tiền"></v-text-field>
                                                <v-text-field label="Ghi chú" v-model="newData.note"></v-text-field>
                                                <v-select label="Loại" v-model="newData.type" :items="itemSelect"></v-select>
                                            </div>
                                        </v-form>
                                        <v-divider></v-divider>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="primary" text @click="dialog = false; addRever()">
                                                Thêm
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </div>
                        </template>
                    </v-toolbar>
                    <v-tabs vertical>
                        <v-tab>
                            Học phí học sinh
                        </v-tab>
                        <v-tab>
                            Tài trợ
                        </v-tab>
                        <v-tab>
                            Đóng góp thêm
                        </v-tab>

                        <v-tab-item>
                            <v-card class="mb-4" flat>

                                <v-card-text class="pt-4">
                                    Thông tin học phí học sinh
                                </v-card-text>

                                <v-divider></v-divider>
                                <v-data-table :headers="headers.feeStudent" :items="desserts" item-key="name" sort-by="name" group-by="lớp" class="elevation-1" show-group-by></v-data-table>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card class="mb-4" flat>

                                <v-card-text class="pt-4">
                                    Thông tin tài trợ phí
                                </v-card-text>

                                <v-divider></v-divider>
                                <v-data-table :headers="headers.sponsor" :items="data.sponsor" item-key="id" sort-by="name" class="elevation-1"></v-data-table>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card class="mb-4" flat>

                                <v-card-text class="pt-4">
                                    Thông tin các khoản đóng góp thêm
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-data-table :headers="headers.contributeMore" :items="data.donate" item-key="id" sort-by="name" class="elevation-1"></v-data-table>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-card>
            </template>

        </v-tab-item>
        <v-tab-item>
            <template>
                <v-card>
                    <v-toolbar flat color="primary" dark>
                        <v-toolbar-title>Chi</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn dark color="green">Thêm mới</v-btn>
                    </v-toolbar>
                    <v-tabs vertical>
                        <v-tab>
                            Lương cho giáo viên
                        </v-tab>
                        <v-tab>
                            Các khoản chi thêm
                        </v-tab>

                        <v-tab-item>
                            <v-card class="mb-4" flat>

                                <v-card-text class="pt-4">
                                    Thông tin lương giáo viên
                                </v-card-text>

                                <v-divider></v-divider>
                                <v-data-table :headers="headers.teacherSalary" :items="desserts" item-key="name" sort-by="name" class="elevation-1"></v-data-table>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card class="mb-4" flat>

                                <v-card-text class="pt-4">
                                    Thông tin các khoản chi thêm
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-data-table :headers="headers.additionalExpenses" :items="data.cost" item-key="name" sort-by="name" class="elevation-1"></v-data-table>
                            </v-card>
                        </v-tab-item>

                    </v-tabs>
                </v-card>
            </template>

        </v-tab-item>
    </v-tabs>
</v-card>
</template>

<script>
import {
    HTTP
} from '../api/index'
export default {
    name: "fee-school-page",
    data() {
        return {
            newData: {
                "amountOfMoney": 0,
                "contributor": "",
                "name": "",
                "note": "",
                "type": "DONATE"
            },
            itemSelect: ['Tài trợ', 'Đóng góp'],
            dialog: false,
            headers: {
                'feeStudent': [{
                        text: 'Tên học sinh',
                        align: 'start',
                        value: 'name',
                        groupable: false,
                    },
                    {
                        text: 'Lớp',
                        value: 'lớp',
                        align: 'right'
                    },
                    {
                        text: 'Trạng thái',
                        value: 'dairy',
                        align: 'right',
                        groupable: false,
                    },
                    {
                        text: 'Các khoản còn lại',
                        value: 'fee',
                        align: 'right',
                        groupable: false,
                    },
                    {
                        text: 'Ghi chú',
                        value: 'dairy',
                        align: 'right',
                        groupable: false,
                    },
                ],
                'contributeMore': [{
                        text: 'Tên khoản đóng góp',
                        align: 'start',
                        value: 'name',
                    },
                    {
                        text: 'Người đóng góp',
                        value: 'contributor',
                        align: 'center'
                    },
                    {
                        text: 'Số tiền',
                        value: 'amountOfMoney',
                        align: 'center',
                    },

                    {
                        text: 'Ghi chú',
                        value: 'note',
                        align: 'right',
                    },
                ],
                sponsor: [{
                        text: 'Tên quỹ tài trợ',
                        align: 'start',
                        value: 'name',
                    },
                    {
                        text: 'Tên nhà tài trợ',
                        value: 'contributor',
                        align: 'center'
                    },
                    {
                        text: 'Số tiền',
                        value: 'amountOfMoney',
                        align: 'center',
                    },

                    {
                        text: 'Ghi chú',
                        value: 'note',
                        align: 'right',
                    },
                ],
                teacherSalary: [{
                        text: 'Tên giao viên',
                        align: 'start',
                        value: 'name',

                    },
                    {
                        text: "Lương tháng T",
                        value: 'fee',
                        align: 'center'
                    },
                    {
                        text: 'Tiền thưởng tháng',
                        value: 'fee',
                        align: 'center'
                    },
                    {
                        text: 'Ghi chú',
                        value: 'dairy',
                        align: 'right',

                    },
                ],
                additionalExpenses: [{
                        text: 'Mô tả',
                        align: 'start',
                        value: 'description',

                    },
                    {
                        text: 'Số tiền tài trợ',
                        value: 'amountOfMoney',
                        align: 'center'
                    },
                    {
                        text: 'Ghi chú',
                        value: 'note',
                        align: 'right',

                    },
                ],
            },

            desserts: [{
                    name: 'Frozen Yogurt',
                    lớp: '1A',
                    dairy: 'chưa đóng',
                    fee: 100
                },
                {
                    name: 'Ice cream sandwich',
                    lớp: '1A',
                    dairy: 'chưa đóng',
                    fee: 100

                },
                {
                    name: 'Eclair',
                    lớp: '1A',
                    dairy: 'chưa đóng',
                    fee: 100

                },
                {
                    name: 'Cupcake',
                    lớp: '1B',
                    dairy: 'chưa đóng',
                    fee: 100

                },
                {
                    name: 'Gingerbread',
                    lớp: '1B',
                    dairy: 'đã đủ',
                    fee: 0

                },
                {
                    name: 'Jelly bean',
                    lớp: '2A',
                    dairy: 'đã đủ',
                    fee: 0
                },

                {
                    name: 'Lollipop',
                    lớp: '2B',
                    dairy: 'đã đủ',
                    fee: 0
                },
                {
                    name: 'Honeycomb',
                    lớp: '3A',
                    dairy: 'chưa đóng',
                    fee: 100

                },
                {
                    name: 'Donut',
                    lớp: '5A',
                    dairy: 'chưa đóng',
                    fee: 100

                },
                {
                    name: 'KitKat',
                    lớp: '5B',
                    dairy: 'đã đủ',
                    fee: 0
                },
            ],
            data: {
                donate: [],
                sponsor: [],
                cost: []
            }
        }
    },
    computed: {
        getDate() {
            return new Date().getMonth() + 1
        }
    },
    mounted: async function () {
        try {
            let resp1 = HTTP.get(`revenue?typeRevenue=DONATE`)
            let resp2 = HTTP.get(`revenue?typeRevenue=SPONSOR`)
            let resp3 = HTTP.get(`cost/`)
            this.data.donate = (await resp1).data
            this.data.sponsor = (await resp2).data
            this.data.cost = (await resp3).data

            console.log(this.data)
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        async addRever() {
            let type = 1
            if (this.newData.type == 'Tài trợ') {
                this.newData.type = 'SPONSOR'
            } else {
                this.newData.type = 'DONATE'
                type = 2
            }
            let resp = await HTTP.post('revenue/', this.newData)

            if (resp.status == 200) {
                if (type == 1) {
                    this.data.sponsor.push(resp.data)
                } else {
                    this.data.donate.push(resp.data)
                }
            }
        }
    },
    filters: {

    }
}
</script>

<style scoped>

</style>
