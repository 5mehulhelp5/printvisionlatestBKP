<?php
/**
 * @author Amasty Team
 * @copyright Copyright (c) 2022 Amasty (https://www.amasty.com)
 * @package Shipping Table Rates for Magento 2
 */

namespace Amasty\ShippingTableRates\Test\Unit\Model\Carrier;

use Amasty\ShippingTableRates\Model\Carrier\Table;
use Amasty\ShippingTableRates\Test\Unit\Traits;
use Magento\Quote\Model\Quote\Address\RateRequest;

/**
 * Class TableTest
 *
 * @see Table
 *
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 * phpcs:ignoreFile
 */
class TableTest extends \PHPUnit\Framework\TestCase
{
    use Traits\ObjectManagerTrait;
    use Traits\ReflectionTrait;

    /**
     * @covers Table::getCustomerGroupId
     */
    public function testGetCustomerGroupId()
    {
        $model = $this->getMockBuilder(Table::class)->disableOriginalConstructor()->getMock();

        $request = $this->createPartialMock(RateRequest::class, ['getAllItems']);
        $object = $this->createPartialMock(\Magento\Framework\DataObject::class, ['getProduct']);

        $request->expects($this->any())->method('getAllItems')->willReturnOnConsecutiveCalls(false, [$object]);
        $object->expects($this->any())->method('getProduct')->willReturn($object);

        $this->assertEquals(0, $model->getCustomerGroupId($request));
        $model->getCustomerGroupId($request);
    }

    /**
     * @covers Table::getStoreIdFromQuoteItem
     */
    public function testGetStoreIdFromQuoteItem()
    {
        $model = $this->getMockBuilder(Table::class)->disableOriginalConstructor()->getMock();

        $request = $this->createPartialMock(RateRequest::class, ['getAllItems']);
        $object = $this->createPartialMock(\Magento\Framework\DataObject::class, ['getStoreId']);

        $request->expects($this->any())->method('getAllItems')->willReturnOnConsecutiveCalls(false, [$object]);
        $object->expects($this->any())->method('getStoreId');

        $this->assertEquals(null, $model->getStoreIdFromQuoteItem($request));
        $model->getStoreIdFromQuoteItem($request);
    }
}
