import {Table, Button, InputNumber, Space, Typography, Card, Empty, Popconfirm} from 'antd'
import {DeleteOutlined, ShoppingOutlined} from '@ant-design/icons'
import {useCartStore} from '../store/cartStore'
import {formatPrice} from '../features/cart/logic/cartCalculations'
import {useNavigate} from 'react-router-dom'
import type {ColumnsType} from 'antd/es/table'
import type {CartItem} from '../shared/types'

const {Title, Text} = Typography

const CartPage = () => {
    const navigate = useNavigate()
    const {items, totalQuantity, totalPrice, updateQuantity, removeItem, clearCart} = useCartStore()

    const handleQuantityChange = (productId: string, value: number | null) => {
        if (value) {
            updateQuantity(productId, value)
        }
    }

    const columns: ColumnsType<CartItem> = [
        {
            title: 'Товар',
            dataIndex: 'name',
            key: 'name',
            render: (_, item) => (
                <Space>
                    <img src={item.imageUrl || 'https://via.placeholder.com/50'} alt={item.name}
                         style={{width: 50, height: 50, objectFit: 'cover'}}/>
                    <span>{item.name}</span>
                </Space>
            ),
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => formatPrice(price),
        },
        {
            title: 'Количество',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity: number, item) => (
                <InputNumber
                    min={1}
                    max={item.maxQuantity}
                    value={quantity}
                    onChange={(value: number | null) => handleQuantityChange(item.productId, value)}
                />
            ),
        },
        {
            title: 'Сумма',
            key: 'total',
            render: (_, item) => formatPrice(item.price * item.quantity),
        },
        {
            title: '',
            key: 'action',
            render: (_, item) => (
                <Popconfirm
                    title="Удалить товар из корзины?"
                    onConfirm={() => removeItem(item.productId)}
                    okText="Да"
                    cancelText="Нет"
                >
                    <Button type="text" danger icon={<DeleteOutlined/>}/>
                </Popconfirm>
            ),
        },
    ]

    if (items.length === 0) {
        return (
            <Empty description="Корзина пуста">
                <Button type="primary" onClick={() => navigate('/products')}>
                    Перейти к покупкам
                </Button>
            </Empty>
        )
    }

    return (
        <div>
            <Title level={2}>Корзина</Title>
            <Table
                columns={columns}
                dataSource={items}
                rowKey="productId"
                pagination={false}
                scroll={{x: 800}}
                footer={() => (
                    <div style={{textAlign: 'right'}}>
                        <Space direction="vertical" style={{alignItems: 'flex-end'}}>
                            <Text>Всего товаров: {totalQuantity}</Text>
                            <Text strong style={{fontSize: 18}}>Итого: {formatPrice(totalPrice)}</Text>
                        </Space>
                    </div>
                )}
            />
            <Card style={{marginTop: 24}}>
                <Space style={{justifyContent: 'space-between', width: '100%'}}>
                    <Button onClick={clearCart}>Очистить корзину</Button>
                    <Space>
                        <Button onClick={() => navigate('/products')}>Продолжить покупки</Button>
                        <Button type="primary" icon={<ShoppingOutlined/>} onClick={() => navigate('/checkout')}>
                            Оформить заказ
                        </Button>
                    </Space>
                </Space>
            </Card>
        </div>
    )
}

export default CartPage