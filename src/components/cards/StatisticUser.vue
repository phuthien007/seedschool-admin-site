<template>
<div>
    <v-row class="mx-auto mt-2">
            <!-- danh sách người dùng  -->
        <v-col>
            <v-card class="mx-auto" min-width="250" outlined>
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="mb-4">
                            Tài khoản
                        </div>
                        <v-list-item>10</v-list-item>
                        <v-list-item-subtitle>Số lượng tài khoản</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-avatar tile color="red"> 
                        <v-icon  dark>
                            mdi-account-circle
                        </v-icon>
                    </v-avatar>
                </v-list-item>
            </v-card>
        </v-col>

        <!-- danh sách học sinh -->
        <v-col>
            <v-card class="mx-auto" min-width="250" outlined>
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="mb-4">
                            Giáo viên
                        </div>
                        <v-list-item>10</v-list-item>
                        <v-list-item-subtitle>Số lượng giáo viên</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-avatar tile color="yellow">
                        <v-icon dark>
                            mdi-human-male-board-poll
                        </v-icon>
                    </v-avatar>
                </v-list-item>
            </v-card>
        </v-col>

        <!-- danh sách học sinh  -->
        <v-col>
            <v-card class="mx-auto" min-width="250" outlined>
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="mb-4">
                            Học sinh
                        </div>
                        <v-list-item>10</v-list-item>
                        <v-list-item-subtitle>Số lượng học sinh</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-avatar tile color="green">
                        <v-icon dark>
                             mdi-account-child-circle
                        </v-icon>
                    </v-avatar>
                </v-list-item>
            </v-card>
        </v-col>

        <!-- số người truy cập website trong tháng -->
        <v-col>
            <v-card class="mx-auto" min-width="250"  outlined>
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="mb-4">
                            Website
                        </div>
                        <v-list-item>10</v-list-item>
                        <v-list-item-subtitle>Truy cập website</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-avatar tile color="red">
                        <v-icon dark>
                            mdi-radio-tower
                        </v-icon>
                    </v-avatar>
                </v-list-item>
            </v-card>
        </v-col>
    </v-row>
    
</div>
</template>

<script>
export default {
    name: "static-user"
}
</script>
