import { useReducer, useEffect } from 'react';
//import data from '../data'
import Product from '../components/Product'
import logger from 'use-reducer-logger';
import {Helmet} from 'react-helmet-async'
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
const HomeScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  // const[products, setProducts] = useState([]);
  //integration of backend and frontend with axios
  //"proxy": "http://localhost:5007" don't forget to configure at package.json below "name": "ecom"

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setProducts(result.data)
    };
    fetchData();
  }, []);

  return (
  
    <div>
   <Helmet>
   <title>AMz</title>
   </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant = 'danger'>{error}</MessageBox>
        ) : (
        <Row>
        {
        products.map((product) => (
          <Col key={product.slug} sm = {6} md = {4} lg = {3} className = 'mb-3'>
                <Product product = {product}/>
          </Col>
          ))
        }</Row>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
