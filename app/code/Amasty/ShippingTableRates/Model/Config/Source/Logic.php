<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2022 Amasty (https://www.amasty.com)
 * @package Shipping Table Rates for Magento 2
 */

namespace Amasty\ShippingTableRates\Model\Config\Source;

/**
 * Post codes comparison algorithm options provider
 */
class Logic implements \Magento\Framework\Option\ArrayInterface
{
    public function toOptionArray()
    {
        return [
            '0' => __('Strings, e.g. AB2%'),
            '1'   => __('Numbers, e.g. from 111 to 222 or from AB2 to AB19')
        ];
    }
}
