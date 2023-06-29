<template>
    <ul class="row pagination">

        <li v-if="pagination.current_page > 1" class="pagination__item">

            <a href="javascript:void(0)"
               @click.prevent="changePage(pagination.current_page - 1)"
               class="pagination__link"
            >
                «
            </a>

        </li>

        <li v-for="page in pagesNumber"
            :class="[{'pagination__active': page === pagination.current_page}, 'pagination__item']"
        >
            <a href="javascript:void(0)"
               @click.prevent="changePage(page)"
               class="pagination__link"
            >
                {{ page }}
            </a>

        </li>

        <li v-if="pagination.current_page < pagination.last_page" class="pagination__item">

            <a href="javascript:void(0)" @click.prevent="changePage(pagination.current_page + 1)"
               class="pagination__link"
            >
                »
            </a>

        </li>

    </ul>
</template>

<script>
    export default {

        computed: {
            pagesNumber() {
                if (!this.pagination) {
                    return [];
                }
                let from = this.pagination.current_page - this.offset;
                if (from < 1) {
                    from = 1;
                }
                let to = from + (this.offset * 2);
                if (to >= this.pagination.last_page) {
                    to = this.pagination.last_page;
                }
                let pagesArray = [];
                for (let page = from; page <= to; page++) {
                    pagesArray.push(page);
                }
                return pagesArray;
            }
        },

        methods : {
            changePage(page) {

                this.pagination.current_page = page;

                this.$emit('paginate', page);

            }
        },

        props: {
            pagination: {
                type: Object,
                required: true
            },
            offset: {
                type: Number,
                default: 4
            }
        },

        name: "AppPagination"
    }
</script>
