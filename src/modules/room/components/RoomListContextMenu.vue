<template>

    <app-context-menu ref="appContextMenu">

        <div class="context-menu__item" @click="openEntity">
            Редактировать
        </div>

        <div class="context-menu__item" @click="changePublish" v-if="entity">
            {{ entity.publish ? 'Снять с публикации' : 'Опубликовать' }}
        </div>

        <div class="context-menu__item" @click="showInSite" v-if="entity && entity.publish">
            Просмотреть на сайте
        </div>

        <div class="context-menu__item" @click="remove">
            Удалить
        </div>

    </app-context-menu>

</template>

<script>

    import AppContextMenu from "../../../core/components/AppContextMenu";

    export default {

        components:{AppContextMenu},

        data() {

            return {

                entity: null,
            }
        },

        methods: {

            dropdownHover(event) {

                const target = event.target;

                const dropdown = target.querySelector('.context-menu__dropdown');

                const contextMenu = target.closest('.context-menu__content');

                if ((parseInt(this.$refs.appContextMenu.position.left) + contextMenu.offsetWidth + dropdown.offsetWidth) > window.innerWidth) {

                    dropdown.classList.add('context-menu__item_dropdown_left');
                }
                else {

                    dropdown.classList.remove('context-menu__item_dropdown_left');
                }

            },

            openEntity() {

                this.$router.push({ name: 'room.edit', params: { id: this.entity.id } });

                this.hide();
            },

            showContextMenu(room, entity) {

                this.$refs.appContextMenu.showContextMenu(room);

                this.entity = entity;
            },

            showInSite() {

                window.open(this.entity.url,'_blank');

                this.hide();
            },

            changePublish() {

                this.$store.dispatch('room/changePublish', {
                    entity: this.entity,
                    newPublish: !this.entity.publish
                });

                this.hide();
            },

            async remove() {

                let result = confirm('Удаление является каскадным, все связанные данные будут удалены, рекомендуется сделать событие не опубликованным или скрыть, продолжить удаление?');

                if (result) {

                    let deleteCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

                    deleteCode = deleteCode.toString();

                    result = prompt(deleteCode.toString());

                    if (result === deleteCode) {

                        const response = await this.$store.dispatch('room/remove', this.entity);

                        if (!response.data.success && response.data.message) {

                            alert(response.data.message);
                        }
                    }
                }

                this.hide();
            },

            hide() {

                this.$refs.appContextMenu.hideContextMenu();
            }
        },

        name: "RoomListContextMenu"
    }
</script>
