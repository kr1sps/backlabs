import {useState} from 'react'
import {Row, Col, Pagination, Spin, Alert, Empty} from 'antd'
import {useProducts} from '../features/products/hooks/useProducts'
import ProductCard from '../features/products/components/ProductCard'
import ProductFilterPanel from '../features/products/components/ProductFilterPanel'
import type {ProductFilter} from '../shared/types'
import {SortOption} from '../features/products/logic/productFilters'

const DEFAULT_PAGE_SIZE = 12

const ProductListPage = () => {
    const [filter, setFilter] = useState<ProductFilter>({
        page: 1,
        limit: DEFAULT_PAGE_SIZE,
    })
    const [sort, setSort] = useState<SortOption>(SortOption.NEWEST)

    const {data, isLoading, error, isFetching} = useProducts(filter, sort)
    console.log('data:', data, 'isLoading:', isLoading, 'error:', error);

    const handleFilterChange = (newFilter: ProductFilter) => {
        setFilter(prev => ({
            ...prev,
            ...newFilter,
            page: 1, // сбрасываем страницу при изменении фильтров
        }))
    }

    const handleSortChange = (newSort: SortOption) => {
        setSort(newSort)
        setFilter(prev => ({...prev, page: 1}))
    }

    const handlePageChange = (page: number, pageSize: number) => {
        setFilter(prev => ({...prev, page, limit: pageSize}))
    }

    const handleReset = () => {
        setFilter({page: 1, limit: DEFAULT_PAGE_SIZE})
        setSort(SortOption.NEWEST)
    }

    if (error) {
        return <Alert message="Ошибка загрузки товаров" type="error" showIcon/>
    }

    return (
        <div>
            <ProductFilterPanel
                filter={filter}
                sort={sort}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onReset={handleReset}
            />

            <Spin spinning={isLoading || isFetching}>
                {data?.data.length === 0 ? (
                    <Empty description="Товары не найдены"/>
                ) : (
                    <>
                        <Row gutter={[16, 16]}>
                            {data?.data.map(product => (
                                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                                    <ProductCard product={product}/>
                                </Col>
                            ))}
                        </Row>

                        {data && data.totalPages > 1 && (
                            <div style={{marginTop: 24, textAlign: 'center'}}>
                                <Pagination
                                    current={data.page}
                                    pageSize={data.limit}
                                    total={data.total}
                                    onChange={handlePageChange}
                                    showSizeChanger
                                    pageSizeOptions={['12', '24', '48']}
                                />
                            </div>
                        )}
                    </>
                )}
            </Spin>
        </div>
    )
}

export default ProductListPage