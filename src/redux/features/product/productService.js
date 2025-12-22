import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const API_URL = `${BACKEND_URL}/api/products/`

axios.defaults.withCredentials = true

console.log('BACKEND_URL =', process.env.REACT_APP_BACKEND_URL)
console.log('API_URL =', API_URL)

// CREATE NEW PRODUCT
// WE DONT USE TRY / CATCH COS WE WILL USE HERE ASYNCTHUNK THIS TIME
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData)
  return response.data
}

// GET ALL PRODUCTS
const getProducts = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

// DELETE PRODUCTS
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id)
  return response.data
}

// GET A PRODUCT
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id)
  if (!Array.isArray(response.data)) {
    return []
  }
  return response.data
}

// UPDATE A PRODUCT
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData)
  return response.data
}

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
}

export default productService
