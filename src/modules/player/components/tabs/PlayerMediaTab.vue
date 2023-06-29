<template>
    <div class="form-group">
        <app-image
            v-model:value="entity.images.cover"
            label="Фотография"
            :error="errors.images.cover"
            image_x="150"
            image_y="150"
        ></app-image>
    </div>

    <div class="form-group">
        <app-image
            v-model:value="entity.images.flag"
            label="Флаг игрока"
            :error="errors.images.flag"
            image_x="150"
            image_y="150"
        ></app-image>
    </div>
</template>

<script>
export default {
    props: {
        entity: {
            type: Object,
        },
        errors: {
            type: Object,
        },
    },
    name: "PlayerMediaTab",
};
</script>

<style scoped></style>
