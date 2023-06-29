export default {
    methods: {
        async save(module) {
            await this.$store.dispatch("loader/show");

            // if (this.entity.images) {
            //     if (Object.values(this.entity.images).some((image) => !Object.values(image).length)) {
            //         console.log(image);
            //         alert("Не все картинки добавлены");
            //         await this.$store.dispatch("loader/hide");
            //         return 0;
            //     }
            // }

            if (this.entity.coords) {
                this.entity.coords = this.entity.coords.toString();
            } else if (this.entity.event_platform) {
                this.convertEntity();
            }

            const response = await this.newOrUpdate(this.entity);

            if (response.success) {
                this.scrollTop();
                await this.$router.push({ name: `${module}.list` });
            } else {
                this.assignErrors(response);
                alert("Проверьте правильность заполнения полей");
            }

            await this.$store.dispatch("loader/hide");
        },
    },
};

//
// let response;
//
// if (this.entity.id) {
//     response = await this.$axios.put(`/${module}/${this.entity.id}`, this.entity).then(function ({ data }) {
//         if (data.success) {
//             commit("updateEntity", data.entity);
//
//             return data;
//         }
//     });
// } else {
//     response = await this.$axios.post(`/${module}/create`, this.entity).then(function ({ data }) {
//         if (data.success) {
//             commit("addEntity", data.entity);
//
//             return data;
//         }
//     });
// }
