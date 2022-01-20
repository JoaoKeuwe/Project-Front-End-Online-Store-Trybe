import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

class CategProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      productByCategory: [],
    };
  }

  componentDidMount() {
    this.handleProducts();
  }

  handleProducts = async () => {
    const { match: { params: { id } } } = this.props;
    const getProducts = await getProductsFromCategoryAndQuery(id);
    this.setState({
      productByCategory: getProducts,
    });
  }

  render() {
    const { productByCategory } = this.state;
    return (
      <div>
        {productByCategory.map((product) => (
          <section key={ product.id }>
            <Link
              to={ `/ProductPage/${product.id}` }
              data-testid="product-detail-link"
            >
              <p data-testid="product">{product.title}</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{product.price}</p>
            </Link>
          </section>

        ))}
      </div>
    );
  }
}

CategProducts.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
export default CategProducts;