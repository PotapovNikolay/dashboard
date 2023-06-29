<template>

    <div class="order__product-search" @click.stop>

        <input type="text"
               class="input order__product-search-input"
               placeholder="Название, артикул"
               v-model="searchString"
               @input="debounceResults()"
               @focus="inputOnFocus"
        >

        <div class="order__product-search-drop" v-if="showResults">

            <template v-if="products.length">

                <div class="order__product-search-item" v-for="product in products" @click="selectProduct(product)">
                    {{ product.name }}
                </div>

            </template>

            <template v-else>
                Не найдено
            </template>

        </div>

    </div>

</template>

<script>

    import debounce from 'lodash/debounce'

    export default {

        data() {

            return {

                searchString: '',

                debounceResults: debounce(this.getResults, 500),

                showResults: false,

                products: [],
            }
        },

        methods: {

            async getResults() {

                if (!this.searchString.trim().length) return;

                const response = await this.$http.get('/products/search', {
                    params: {
                        searchString: this.searchString
                    }
                });

                this.products = response.data.entities;

                this.show();
            },

            selectProduct(product) {

                this.$emit('add-product', product);

                this.hide();
            },

            inputOnFocus() {

                if (this.searchString.length) {

                    this.show();
                }
            },

            show() {

                this.showResults = true;
            },

            hide() {

                this.showResults = false;
            }
        },

        mounted() {

            this.$store.commit('dispatcherShowComponents/register', this);
        },

        props: ['value'],

        name: "orderSearch"
    }
</script>
