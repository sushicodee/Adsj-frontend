// import { Button } from '@material-ui/core';
// import React, { useState } from 'react';
// import StripeCheckout from 'react-stripe-checkout';
// import { axiosApi } from '../../../axios/axiosApi';
// interface Iprops {}

// const Checkout: React.FC<Iprops> = (props) => {
//   const [product, setproduct] = useState({
//     name: 'Skipping Rope',
//     price: 100,
//     productBy: 'runskipping',
//   });

//   const handlePayment = (token: any) => {
//     const data = {
//       token,
//       product,
//     };
//     console.log({ token });
//     axiosApi
//       .post('payment', data, {}, false)
//       .then((res: any) => {
//         const { status } = res;
//         console.log({ status });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   return (
//     <div className='Checkout-container' style={{ height: '100vh' }}>
//       <StripeCheckout
//         stripeKey='pk_test_51IDbiuDkFzIHraYa76l4bTNg43WJuZUqnesWD7nQ4m0lXIrqxAfzQuqOmgj1QDfwE6sHXwkv8zd70SVqiMVT9UDZ00l30i5698'
//         token={handlePayment}
//         name='Buy Skipping Rope'
//         amount={product.price * 100}
//       >
//         <Button color='primary' variant='contained'>
//           Buy Skipping Rope for just {product.price}{' '}
//         </Button>
//       </StripeCheckout>
//     </div>
//   );
// };

// export default Checkout;
import React from 'react';

const Checkout = () => {
  return <div></div>;
};

export default Checkout;
