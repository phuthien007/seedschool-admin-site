<template>
<div>
    <h1>Ảnh trình chiếu trong trang người dùng</h1>
    <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
    </v-carousel>

    <div class="mt-2">
        <input type="file" ref="fileupload" @change="onFileSelected" accept="image/*">

    <v-btn color="primary" @click="addItem()">Thêm ảnh</v-btn>
    </div>
    
</div>
</template>

<script>
export default {
    data() {
        return {
            image: null,
            urlImage: '',
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
    methods: {
        onFileSelected(event) {
            this.image = event.target.files[0]
            this.urlImage = URL.createObjectURL(this.image)

        },
        addItem() {
            this.items.push({
                src: this.urlImage
            })
            this.clearSelectFile()
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
    }
}
</script>
