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
                            <v-card flat>

                                <v-card-text class="pt-4">
                                    Thông tin học phí học sinh
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-virtual-scroll :items="items" :item-height="40" height="350">
                                    <template v-slot:default="{ item }">
                                        <v-list-item>
                                            <v-list-item-avatar>
                                                <v-avatar :color="item.color" size="56" class="white--text">
                                                    <v-icon> mdi-account </v-icon>
                                                </v-avatar>
                                            </v-list-item-avatar>

                                            <v-list-item-content>
                                                <v-list-item-title>{{ item.fullName }}</v-list-item-title>
                                            </v-list-item-content>
                                            <v-list-item-content>
                                                <v-list-item-title>Chưa nộp tiền</v-list-item-title>
                                            </v-list-item-content>

                                            <v-list-item-action>

                                                <v-row justify="center">
                                                    <v-dialog v-model="dialog" scrollable max-width="300px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn depressed small v-bind="attrs" v-on="on">
                                                                Xem chi tiết
                                                                <v-icon color="orange darken-4" right>
                                                                    mdi-open-in-new
                                                                </v-icon>
                                                            </v-btn>

                                                        </template>
                                                        <v-card>
                                                            <v-divider></v-divider>
                                                            <v-card-text style="height: 300px;">
                                                                Các khoản thu phí
                                                            </v-card-text>
                                                            <v-divider></v-divider>
                                                            <v-card-actions>
                                                                <v-btn color="blue darken-1" text @click="dialog = false">
                                                                    Đóng
                                                                </v-btn>
                                                                <v-btn color="blue darken-1" text @click="dialog = false">
                                                                    Lưu
                                                                </v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-row>

                                            </v-list-item-action>
                                        </v-list-item>
                                    </template>
                                </v-virtual-scroll>
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
            dialogm1: '',
            dialog: false,
            colors: ['#2196F3', '#90CAF9', '#64B5F6', '#42A5F5', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF', '#2962FF'],
            names: ['Oliver', 'Jake', 'Noah', 'James', 'Jack', 'Connor', 'Liam', 'John', 'Harry', 'Callum', 'Mason', 'Robert', 'Jacob', 'Jacob', 'Jacob', 'Michael', 'Charlie', 'Kyle', 'William', 'William', 'Thomas', 'Joe', 'Ethan', 'David', 'George', 'Reece', 'Michael', 'Richard', 'Oscar', 'Rhys', 'Alexander', 'Joseph', 'James', 'Charlie', 'James', 'Charles', 'William', 'Damian', 'Daniel', 'Thomas', 'Amelia', 'Margaret', 'Emma', 'Mary', 'Olivia', 'Samantha', 'Olivia', 'Patricia', 'Isla', 'Bethany'],
            surnames: ['Smith', 'Anderson', 'Clark', 'Wright', 'Mitchell', 'Johnson', 'Thomas', 'Rodriguez', 'Lopez', 'Perez', 'Williams', 'Jackson', 'Lewis', 'Hill', 'Roberts', 'Jones', 'White', 'Lee', 'Scott', 'Turner', 'Brown', 'Harris', 'Walker', 'Green', 'Phillips', 'Davis', 'Martin', 'Hall', 'Adams', 'Campbell', 'Miller', 'Thompson', 'Allen', 'Baker', 'Parker', 'Wilson', 'Garcia', 'Young', 'Gonzalez', 'Evans', 'Moore', 'Martinez', 'Hernandez', 'Nelson', 'Edwards', 'Taylor', 'Robinson', 'King', 'Carter', 'Collins'],

        }
    },

    computed: {
        items() {

            return Array.from({
                length: 10000
            }, () => {
                const name = this.names[0]
                const surname = this.surnames[1]

                return {
                    color: 'Oliver',
                    fullName: `${name} ${surname}`,
                    initials: `${name} ${surname}`,
                }
            })
        },
    }
}
</script>

<style scoped>

</style>
