import tippy from "tippy.js";
import cloneDeep from "lodash/cloneDeep";
import { useI18n } from "vue-i18n";
import EventViewLang from "../language/EventViewLang";

export function useUpdateTippy(entity) {
    const { t: i18n } = useI18n({ messages: EventViewLang, useScope: "local" });

    function getPlaceCountWithPrice(sector) {
        let count = 0;
        for (let i = 0; i < sector.rows.length; ++i) {
            for (let j = 0; j < sector.rows[i].places.length; ++j) {
                if (sector.rows[i].places[j].price && sector.rows[i].places[j].available) {
                    count += 1;
                }
            }
        }

        return count;
    }

    function getPlacePrices(sector) {
        let prices = [];

        for (let i = 0; i < sector.rows.length; ++i) {
            for (let j = 0; j < sector.rows[i].places.length; ++j) {
                if (sector.rows[i].places[j].price && sector.rows[i].places[j].available) {
                    let price = sector.rows[i].places[j].price;
                    if (prices.indexOf(price) === -1) {
                        prices.push(price);
                    }
                }
            }
        }

        return prices;
    }

    function updateTippy() {
        tippy("._sector", {
            content: (reference) => {
                let sector = cloneDeep(entity.sectors.find((sector) => sector.name === reference.getAttribute("id")));

                if (!sector) return i18n("labels.platform.pricesAreNotSet");

                if (sector.places !== null) {
                    if (sector.places > 0) {
                        let price = getPlacePrices(sector);
                        if (price.length <= 0) {
                            price = i18n("labels.platform.pricesAreNotSet");
                        }
                        return `<div>
                                <div>${i18n("labels.platform.placesWithPrice")} : ${getPlaceCountWithPrice(sector)}</div>
                                <div>${i18n("labels.platform.price")}: ${price} ₽</div>
                            </div>`;
                    }
                    // } else {
                    //     return "Цены не выставлены";
                    // }
                } else if (sector.places === null) {
                    return i18n("labels.platform.pricesAreNotSet");
                }
                // } else {
                //     return "Цены не выставлены";
                // }
            },
            allowHTML: true,
        });

        for (let i = 0, el = null; i < entity.sectors.length; ++i) {
            if (entity.sectors[i].rows.length) {
                el = document.getElementById(entity.sectors[i].name);

                if (el) {
                    if (entity.sectors[i].places > 0) el.classList.add("active");
                }
            }
        }
    }

    return { updateTippy, getPlaceCountWithPrice };
}
