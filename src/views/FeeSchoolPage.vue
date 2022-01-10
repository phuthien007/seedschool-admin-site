<template>
<v-card class="mr-4">
    <v-tabs color="deep-purple accent-4" right>
        <v-tab>Tổng hợp</v-tab>
        <v-tab>Thu</v-tab>
        <v-tab>Chi</v-tab>

        <v-tab-item>
            <template>
                <v-card>
                    <v-toolbar flat color="primary" dark>
                        <v-toolbar-title>Tổng hợp</v-toolbar-title>
                    </v-toolbar>
                    <v-tabs vertical>
                        <v-tab>
                            Tổng hợp
                        </v-tab>
                        <v-tab>
                            Thống kê thu
                        </v-tab>
                        <v-tab>
                            Thống kê chi
                        </v-tab>

                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
                                    <p>
                                        Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
                                    </p>

                                    <p>
                                        Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum.
                                    </p>

                                    <p class="mb-0">
                                        Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
                                    <p>
                                        Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
                                    </p>

                                    <p>
                                        Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
                                    </p>

                                    <p>
                                        Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
                                    </p>

                                    <p>
                                        Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
                                    </p>

                                    <p class="mb-0">
                                        Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
                                    <p>
                                        Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                                    </p>

                                    <p class="mb-0">
                                        Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                                    </p>
                                </v-card-text>
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
                        <v-toolbar-title>Thu</v-toolbar-title>
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
                                <v-data-table  :headers="headers.feeStudent" :items="desserts" item-key="name" sort-by="name" group-by="category" class="elevation-1" show-group-by></v-data-table>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card class="mb-4" flat>

                                <v-card-text class="pt-4">
                                    Thông tin tài trợ phí
                                </v-card-text>

                                <v-divider></v-divider>
                                <v-data-table  :headers="headers.sponsor" :items="desserts" item-key="name" sort-by="name" class="elevation-1" ></v-data-table>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card class="mb-4" flat>

                                <v-card-text class="pt-4">
                                    Thông tin các khoản đóng góp thêm
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-data-table  :headers="headers.contributeMore" :items="desserts" item-key="name" sort-by="name" class="elevation-1" ></v-data-table>
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
                                <v-data-table  :headers="headers.teacherSalary" :items="desserts" item-key="name" sort-by="name" class="elevation-1" ></v-data-table>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card class="mb-4" flat>

                                <v-card-text class="pt-4">
                                    Thông tin các khoản chi thêm
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-data-table  :headers="headers.additionalExpenses" :items="desserts" item-key="name" sort-by="name" class="elevation-1" ></v-data-table>
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
export default {
    name: "fee-school-page",
    data() {
        return {
            headers: {
                'feeStudent': [{
                        text: 'Tên học sinh',
                        align: 'start',
                        value: 'name',
                        groupable: false,
                    },
                    {
                        text: 'Lớp',
                        value: 'category',
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
                        value: 'dairy',
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
                        value: 'category',
                        align: 'center'
                    },
                    {
                        text: 'Số tiền',
                        value: 'dairy',
                        align: 'center',
                    },
                
                    {
                        text: 'Ghi chú',
                        value: 'dairy',
                        align: 'right',
                    },
                ],
                sponsor: [{
                        text: 'Tên nhà tài trợ',
                        align: 'start',
                        value: 'name',
                        groupable: false,
                    },
                    {
                        text: 'Số tiền tài trợ',
                        value: 'category',
                        align: 'center'
                    },
                    {
                        text: 'Ghi chú',
                        value: 'dairy',
                        align: 'right',
                        groupable: false,
                    },
                ],
                teacherSalary: [{
                        text: 'Tên giao viên',
                        align: 'start',
                        value: 'name',
                        groupable: false,
                    },
                    {
                        text: "Lương tháng T",
                        value: 'category',
                        align: 'center'
                    },
                    {
                        text: 'Tiền thưởng tháng',
                        value: 'category',
                        align: 'center'
                    },
                    {
                        text: 'Ghi chú',
                        value: 'dairy',
                        align: 'right',
                        groupable: false,
                    },
                ],
                additionalExpenses: [{
                        text: 'Tên nhà tài trợ',
                        align: 'start',
                        value: 'name',
                        groupable: false,
                    },
                    {
                        text: 'Số tiền tài trợ',
                        value: 'category',
                        align: 'center'
                    },
                    {
                        text: 'Ghi chú',
                        value: 'dairy',
                        align: 'right',
                        groupable: false,
                    },
                ],
            },

            desserts: [{
                    name: 'Frozen Yogurt',
                    category: 'Ice cream',
                    dairy: 'Yes',
                },
                {
                    name: 'Ice cream sandwich',
                    category: 'Ice cream',
                    dairy: 'Yes',
                },
                {
                    name: 'Eclair',
                    category: 'Cookie',
                    dairy: 'Yes',
                },
                {
                    name: 'Cupcake',
                    category: 'Pastry',
                    dairy: 'Yes',
                },
                {
                    name: 'Gingerbread',
                    category: 'Cookie',
                    dairy: 'No',
                },
                {
                    name: 'Jelly bean',
                    category: 'Candy',
                    dairy: 'No',
                },
                {
                    name: 'Lollipop',
                    category: 'Candy',
                    dairy: 'No',
                },
                {
                    name: 'Honeycomb',
                    category: 'Toffee',
                    dairy: 'No',
                },
                {
                    name: 'Donut',
                    category: 'Pastry',
                    dairy: 'Yes',
                },
                {
                    name: 'KitKat',
                    category: 'Candy',
                    dairy: 'Yes',
                },
            ],
        }
    },

    computed: {
        getDate(){
            return new Date().getMonth()+1
        }
    }
}
</script>

<style scoped>

</style>
