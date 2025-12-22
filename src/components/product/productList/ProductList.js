import { useEffect, useState } from 'react'
import './productList.scss'
import { SpinnerImg } from '../../loader/Loader'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineEye } from 'react-icons/ai'
import Search from '../../search/Search'
import { useDispatch, useSelector } from 'react-redux'
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from '../../../redux/features/product/filterSlice'
import ReactPaginate from 'react-paginate'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import {
  deleteProduct,
  getProducts,
} from '../../../redux/features/product/productSlice'
import { Link } from 'react-router-dom'

const ProductList = ({ products, isLoading }) => {
  const [search, setSearch] = useState('')
  const filteredProducts = useSelector(selectFilteredPoducts)

  const dispatch = useDispatch()

  // BEGIN PAGINATION-------------------------------------

  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 5

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage

    //Added filteredProducts to all places instead initial "items" from docs

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, filteredProducts])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length
    setItemOffset(newOffset)
  }

  // END PAGINATION-------------------------------------

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }))
  }, [products, search, dispatch])

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortendText = text.substring(0, n).concat('...')
      return shortendText
    }
    return text
  }

  const delProduct = async (id) => {
    console.log('ID', id)
    await dispatch(deleteProduct(id))
    await dispatch(getProducts())
  }

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure You want to delete product',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delProduct(id),
        },
        {
          label: 'Cancel',
          // onClick: () => alert("Click No"),
        },
      ],
    })
  }

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>No Products Found, please add a product...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* now it map through currentItems cos of pagination */}
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {'$'}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {' '}
                        {'$'}
                        {price * quantity}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={23} color={'purple'} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={20} color={'green'} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={18}
                            color={'red'}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          renderOnZeroPageCount={null}
          // classes from scss for styling
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  )
}

export default ProductList
