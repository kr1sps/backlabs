import {Card, Button, Typography, Space, Tag} from 'antd'
import {ShoppingCartOutlined} from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'
import type {Product} from '../../../shared/types'
import {formatPrice} from '../../cart/logic/cartCalculations'
import {useCartStore} from '../../../store/cartStore'

const {Meta} = Card
const {Text} = Typography

interface ProductCardProps {
    product: Product
}

const ProductCard = ({product}: ProductCardProps) => {
    const navigate = useNavigate()
    const addItem = useCartStore(state => state.addItem)

    console.log('Rendering ProductCard:', product.name);

    const handleAddToCart = () => {
        if (product.stock <= 0) return

        addItem({
            productId: product.id,
            name: product.name,
            price: product.price,
            maxQuantity: product.stock,
            imageUrl: product.imageUrls[0],
            quantity: 1,
        })
    }

    const isOutOfStock = product.stock <= 0

    return (
        <Card
            hoverable
            cover={
                <img
                    alt={product.name}
                    src={product.imageUrls[0] || 'https://via.placeholder.com/300'}
                    style={{height: 200, objectFit: 'cover'}}
                />
            }
            actions={[
                <Button
                    type="link"
                    onClick={() => navigate(`/product/${product.id}`)}
                >
                    Подробнее
                </Button>,
                <Button
                    type="link"
                    icon={<ShoppingCartOutlined/>}
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                >
                    В корзину
                </Button>,
            ]}
        >
            <Meta
                title={product.name}
                description={
                    <Space direction="vertical" size="small">
                        <Text strong>{formatPrice(product.price)}</Text>
                        {isOutOfStock ? (
                            <Tag color="red">Нет в наличии</Tag>
                        ) : (
                            <Tag color="green">В наличии: {product.stock} шт.</Tag>
                        )}
                    </Space>
                }
            />
        </Card>
    )
}

export default ProductCard