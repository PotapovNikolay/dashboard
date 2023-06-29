<template>

    <app-context-menu ref="appContextMenu">

        <div class="context-menu__item" @click="openEdit">
            Редактировать
        </div>

        <div class="context-menu__item" @click="changePublish" v-if="players">
            {{ players.publish ? 'Снять с публикации' : 'Опубликовать' }}
        </div>

        <div class="context-menu__item" @click="remove">
            Удалить
        </div>

    </app-context-menu>

</template>

<script>

export default {

    data() {

        return {

            players: null,
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

        showContextMenu(event, players) {

            this.$refs.appContextMenu.showContextMenu(event);

            this.players = players;
        },

        openEdit() {

            this.$router.push({ name: 'player.edit', params: { id: this.players.id } });

            this.hide();
        },

        changePublish() {

            this.$store.dispatch('player/changePublish', {
                players: this.players,
                newPublish: !this.players.publish
            });

            this.hide();
        },

        async remove() {

            const result = confirm('Удалить?');

            if (result) {

                const response = await this.$store.dispatch('player/remove', this.players);

                if (!response.data.success && response.data.message) {

                    alert(response.data.message);
                }
            }

            this.hide();
        },

        showInSite() {

            window.open(this.players.url,'_blank');

            this.hide();
        },

        hide() {

            this.$refs.appContextMenu.hideContextMenu();
        }
    },

    name: "PlayerListContextMenu"
}
</script>
