<?php
/**
 * Copyright © 2016 MageWorx. All rights reserved.
 * See LICENSE.txt for license details.
 */

namespace MageWorx\OptionFeatures\Model\ResourceModel\OptionTypeDescription;

use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

class Collection extends AbstractCollection
{
    /**
     * Set resource model and determine field mapping
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_init(
            'MageWorx\OptionFeatures\Model\OptionTypeDescription',
            'MageWorx\OptionFeatures\Model\ResourceModel\OptionTypeDescription'
        );
    }
}
