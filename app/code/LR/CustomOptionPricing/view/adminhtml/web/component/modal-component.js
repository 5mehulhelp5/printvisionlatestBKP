/**
 * Copyright © Magento. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'uiRegistry',
    'jquery',
    'underscore',
    'Magento_Ui/js/modal/modal-component'
], function (registry, $, _, ModalComponent) {
    'use strict';

    return ModalComponent.extend({

        defaults: {
            isSpecialPriceEnabled: true,
            isTierPriceEnabled: true,
            dynamicRowsPath: 'option_value_advanced_pricing_modal.content.fieldset',
            dynamicRowsDataScope: 'option_value_advanced_pricing.data.product.custom_pricing_data',
            specialPriceDynamicRows: '',
            tierPriceDynamicRows: '',
            formName: '',
            isSchedule: false,
            buttonName: '',
            productEntityProvider: 'product_form.product_form_data_source',
            entityProvider: '',
            entityDataScope: ''
        },

        /**
         * Reload modal
         *
         * @param params
         */
        reloadModal: function (params) {
            this.initVariables(params);
            this.initTierPrice();
        },

        /**
         * Initialize variables
         *
         * @param params
         */
        initVariables: function (params) {
            this.entityProvider = params.provider;
            this.entityDataScope = params.dataScope;
            this.buttonName = params.buttonName;
            this.isSchedule = params.isSchedule;
            if (this.entityProvider === 'catalogstaging_update_form.catalogstaging_update_form_data_source') {
                this.isSchedule = true;
            }
            this.formName = params.formName;
            this.isTierPriceEnabled = params.isTierPriceEnabled;
        },

        /**
         * Initialize tier price for selected option value
         */
        initTierPrice: function () {
            var tierPriceData = null,
                jsonTierPrice = registry.get(this.entityProvider).get(this.entityDataScope).values_tier_price;
            if (jsonTierPrice !== '') {
                tierPriceData = $.parseJSON(jsonTierPrice);
            }

            this.tierPriceDynamicRows = registry.get(
                this.formName + '.' + this.formName + '.' + this.dynamicRowsPath + '.values_tier_pricing'
            );
            this.tierPriceDynamicRows.recordData([]);
            this.tierPriceDynamicRows.clear();
            if (tierPriceData === null) {
                return;
            }
            if (this.isSchedule === true) {
                registry.get(this.productEntityProvider)
                    .set(this.dynamicRowsDataScope + '.values_tier_pricing', tierPriceData);
            } else {
                registry.get(this.entityProvider).set(this.dynamicRowsDataScope + '.values_tier_pricing', tierPriceData);
            }
            this.tierPriceDynamicRows.initChildren();
        },

        /**
         * Validate and save prices, close modal
         */
        save: function () {
            this.valid = true;
            
            var tierPrices = null;
            
            this.validate(this.tierPriceDynamicRows);
            if (!this.valid) {
                return;
            }
            tierPrices = this.saveTierPrice();

            this.updateButtonStatus(tierPrices);
            this.toggleModal();
        },


        /**
         * Save tier price before close modal.
         */
        saveTierPrice: function () {
            var tierPrices = [];
            this.tierPriceDynamicRows.getChildItems().forEach(function (data, index) {
                tierPrices.push(data);
            });
            var jsonData = tierPrices.length ? JSON.stringify(tierPrices) : "";
            registry.get(this.entityProvider).set(this.entityDataScope + '.values_tier_price', jsonData);
            return tierPrices;
        },

        /**
         * Decode html
         *
         * @param str
         */
        decodeHtml: function (str) {
            var map =
                {
                    '&amp;': '&',
                    '&lt;': '<',
                    '&gt;': '>',
                    '&quot;': '"',
                    '&#039;': "'"
                };
            return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (m) {
                return map[m];
            });
        },

        /**
         * Update button status
         *
         * @param specialPrices
         * @param tierPrices
         */
        updateButtonStatus: function (tierPrices) {
            if (tierPrices && tierPrices.length > 0) {
                $('*[data-name="' + this.buttonName + '"]').addClass('active');
            } else {
                $('*[data-name="' + this.buttonName + '"]').removeClass('active');
            }
        }
    });
});
