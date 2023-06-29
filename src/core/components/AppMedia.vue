<template>
    <div class="modalZoom" v-if="showModalCropp">
        <div class="modalWindow">
            <div>
                <div style="display: flex; justify-content:center">

                    <button type="button" @click="crop" style="display: block"  class="cropBtn">
                        Crop
                    </button>
                </div>
                <div style="display: flex; justify-content:center; align-items: center;">
                    <cropper
                            :src="value.source" alt=""
                            ref="cropper"
                            @change="onChange"
                    />
                    <preview
                            :width="200"
                            :height="200"
                            :image="result.image"
                            :coordinates="result.coordinates"
                            style="margin-left:2rem"
                    />
                </div>
            </div>
            <div
                    class="close-modal"
                    @click="changeShowModalCropp"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
        </div>


    </div>
    <div class="modalZoom" v-if="showModalZoom">
        <div class="modalWindow">
            <div>
                <img :src="value.source" alt="" class=" zoom-image"/>
            </div>

        </div>
        <div
                class="close-modal"
                @click="changeShowModalZoom"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
    </div>
    <div class="app-images component_offset">
        <div class="subtitle">
            {{ label ? label : "Изображение" }}
            <span class="app-images__recommended"
            >(Рекомендованный размер - {{ image_x }}х{{ image_y }})</span
            >
        </div>

            <div v-if="value?.id" class="app-images__item" v-on:mouseleave="unsetShowMenu" v-on:mouseover="setShowMenu">
                <img  :src="value.source" alt="" class="app-images__image"/>
                <Transition>
                <div
                        v-if="showMenu"
                        class="app-images__del"
                        @click="$emit('update:value', {})"
                        title="Убрать изображение"
                >
                    ×
                </div>
                </Transition>
                <Transition>
                    <div v-if="showMenu" class="tools" >
                        <button @click="changeShowModalZoom">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                        <button @click="changeShowModalCropp">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-aspect-ratio"
                                 viewBox="0 0 16 16">
                                <path
                                        d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
                                <path
                                        d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0v-3zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0v3z"/>
                            </svg>
                        </button>
                        <button @click="$refs.inputImages.click()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                        </button>
                    </div>
                </Transition>
            </div>



        <!--        <label-->
        <!--            @click="$refs.inputImages.click()"-->
        <!--            class="btn btn_primary app-images__btn"-->
        <!--        >Загрузить изображение</label-->
        <!--        >-->

        <div class="input_err_label" :title="error">{{ error }}</div>

        <input
                type="file"
                ref="inputImages"
                hidden
                accept="image/*"
                @change="generateThumb"
        />
    </div>
</template>

<script>
import draggable from "vuedraggable";
import {Cropper,Preview} from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import mixinImage from '../../mixins/Image'

export default {
    // data() {
    //     return {
    //         showModalCropp: false,
    //         showModalZoom: false,
    //         coordinates: {
    //             width: 0,
    //             height: 0,
    //             left: 0,
    //             top: 0,
    //         },
    //         result: {
    //             coordinates: null,
    //             image: null
    //         }
    //     }
    // },
    //
    // methods: {
    //     mouseOver() {
    //         console.log('da')
    //     },
    //     changeShowModalCropp() {
    //         this.showModalCropp = !this.showModalCropp
    //     },
    //     changeShowModalZoom() {
    //         this.showModalZoom = !this.showModalZoom
    //     },
    //     onChange({ coordinates, image }) {
    //         this.result = {
    //             coordinates,
    //             image
    //         };
    //     },
    //     async crop() {
    //         const {canvas} = this.$refs.cropper.getResult();
    //         if (canvas) {
    //             const form = new FormData();
    //             canvas.toBlob(async blob => {
    //                 form.append('image', blob);
    //                 const response = await this.$axios.post("/images/upload", form);
    //
    //                 if (response.data.success) {
    //                     this.$emit('update:value', response.data.entity);
    //                     console.log(response.data.entity)
    //                 } else {
    //                     alert("Неудалось загрузить изображение");
    //                 }
    //             }, 'image/jpeg');
    //         }
    //         this.showModalCropp = !this.showModalCropp
    //         // this.$emit('update:value', canvas.toDataURL());
    //     },
    //     // onChange({ coordinates, canvas, }) {
    //     //     this.coordinates = coordinates;
    //     //     // this.image = canvas.toDataURL();
    //     //     console.log(canvas.toDataURL())
    //     //     // this.$emit('update:value', canvas.toDataURL());
    //     // },
    //     async generateThumb(event) {
    //         let file = event.target.files[0];
    //
    //         if (!file) return;
    //
    //         let formData = new FormData();
    //
    //         formData.append("image", file);
    //         console.log(formData)
    //         const response = await this.$axios.post("/images/upload", formData);
    //
    //         if (response.data.success) {
    //             this.$emit('update:value', response.data.entity);
    //             console.log(response.data.entity)
    //         } else {
    //             alert("Неудалось загрузить изображение");
    //         }
    //
    //         event.target.value = null;
    //     },
    // },

    components: {
        draggable, Cropper,Preview
    },

    // props: ["label", "value", "error", "image_x", "image_y"],
    // emits: ['update:value'],
    mixins:[mixinImage],
    name: "AppMedia",
};
</script>
<style>

/*.v-leave-active {*/
/*    transition: opacity 0.2s ease;*/
/*}*/
/*.v-enter-active{*/
/*    transition: opacity 0.2s ease;*/
/*}*/

/*.tools {*/
/*    display: flex;*/
/*    margin-bottom: 1rem;*/
/*    position: absolute;*/
/*    bottom: 0;*/
/*}*/

/*.tools button {*/
/*    width: 3rem;*/
/*    height: 3rem;*/
/*    border: white solid 0;*/
/*    background-color: white;*/
/*    border-radius: 10px;*/
/*    box-shadow: none;*/
/*    transition: box-shadow, 0.3s;*/
/*    margin-right: 1rem;*/


/*}*/

/*.close-modal {*/

/*    width: 2rem;*/
/*    height: 2rem;*/
/*    position: absolute;*/
/*    top: 5%;*/
/*    right: 0;*/
/*    margin: 3rem;*/
/*    color: black*/
/*}*/

/*.tools button:hover {*/
/*    box-shadow: 0px 0px 7px 2px rgba(34, 60, 80, 0.2);*/
/*}*/


/*.cropBtn {*/
/*    width: 5rem;*/
/*    height: 3rem;*/
/*    margin-bottom: 2rem;*/
/*    background-color: white;*/
/*    border: #1b1e21 solid 1px;*/
/*    border-radius: 5px*/
/*}*/

/*.modalZoom {*/
/*    width: 100%;*/
/*    height: 100%;*/
/*    position: fixed;*/
/*    top: 0;*/
/*    left: 0;*/
/*    display: flex;*/
/*    align-items: center;*/
/*    align-content: center;*/
/*    justify-content: center;*/
/*    overflow: auto;*/
/*    background-color: white;*/
/*    z-index: 2;*/
/*}*/

/*.modalWindow {*/
/*    background-color: white;*/
/*    !*box-shadow: 0px 0px 7px 2px rgba(34, 60, 80, 0.2);*!*/
/*    border-radius: 20px;*/
/*    margin: 2rem;*/
/*    width: 100rem;*/
/*    height: 50rem;*/
/*    display: flex;*/
/*    align-items: center;*/
/*    align-content: center;*/
/*    justify-content: center;*/
/*    overflow: auto;*/

/*}*/

/*.modalWindow img {*/
/*    display: block;*/
/*    border: none;*/
/*}*/


/*.zoom-image {*/
/*    transition: transform .2s;*/
/*}*/

/*.zoom-image:hover {*/
/*    transform: scale(2);*/
/*}*/

</style>