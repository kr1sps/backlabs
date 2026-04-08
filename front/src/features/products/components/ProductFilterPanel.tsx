import {Card, Input, Select, Slider, Switch, Space, Button, Row, Col} from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import type {ProductFilter} from '../../../shared/types'
import {SortOption} from '../logic/productFilters'
import {useCategories} from '../hooks/useProducts'

const {Option} = Select

interface ProductFilterPanelProps {
    filter: ProductFilter
    sort: SortOption
    onFilterChange: (filter: ProductFilter) => void
    onSortChange: (sort: SortOption) => void
    onReset: () => void
}

const ProductFilterPanel = ({
                                filter,
                                sort,
                                onFilterChange,
                                onSortChange,
                                onReset,
                            }: ProductFilterPanelProps) => {
    const {data: categories} = useCategories()

    const handleSearchChange = (value: string) => {
        onFilterChange({...filter, search: value || undefined})
    }

    const handleCategoryChange = (value: string) => {
        onFilterChange({...filter, categoryId: value || undefined})
    }

    const handleInStockChange = (checked: boolean) => {
        onFilterChange({...filter, inStock: checked || undefined})
    }

    const handlePriceRangeChange = (values: number[]) => {
        onFilterChange({
            ...filter,
            minPrice: values[0],
            maxPrice: values[1],
        })
    }

    const handleSortChange = (value: SortOption) => {
        onSortChange(value)
    }

    return (
        <Card title="Фильтры и сортировка" style={{marginBottom: 24}}>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Input
                        placeholder="Поиск по названию или описанию"
                        prefix={<SearchOutlined/>}
                        value={filter.search || ''}
                        onChange={(e: { target: { value: string } }) => handleSearchChange(e.target.value)}
                        allowClear
                    />
                </Col>
                <Col xs={24} md={8}>
                    <Select
                        placeholder="Категория"
                        style={{width: '100%'}}
                        value={filter.categoryId || undefined}
                        onChange={handleCategoryChange}
                        allowClear
                    >
                        {categories?.map(cat => (
                            <Option key={cat.id} value={cat.id}>
                                {cat.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col xs={24} md={8}>
                    <Space>
                        <Switch
                            checked={filter.inStock || false}
                            onChange={handleInStockChange}
                        />
                        <span>Только в наличии</span>
                    </Space>
                </Col>
                <Col xs={24} md={12}>
                    <div>Диапазон цен (₽):</div>
                    <Slider
                        range
                        min={0}
                        max={200000}
                        step={1000}
                        value={[filter.minPrice || 0, filter.maxPrice || 200000]}
                        onChange={handlePriceRangeChange}
                        tooltip={{ formatter: (value?: number) => `${value} ₽` }}
                    />
                </Col>
                <Col xs={24} md={6}>
                    <Select
                        placeholder="Сортировка"
                        style={{width: '100%'}}
                        value={sort}
                        onChange={handleSortChange}
                    >
                        <Option value={SortOption.NEWEST}>Сначала новые</Option>
                        <Option value={SortOption.PRICE_ASC}>Цена: по возрастанию</Option>
                        <Option value={SortOption.PRICE_DESC}>Цена: по убыванию</Option>
                        <Option value={SortOption.NAME_ASC}>Название: А-Я</Option>
                        <Option value={SortOption.NAME_DESC}>Название: Я-А</Option>
                    </Select>
                </Col>
                <Col xs={24} md={6}>
                    <Button onClick={onReset}>Сбросить фильтры</Button>
                </Col>
            </Row>
        </Card>
    )
}

export default ProductFilterPanel