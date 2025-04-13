import * as yup from 'yup';

export const productSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  price: yup.number().typeError('Price must be a number').positive().required(),
  discountPercentage: yup.number().typeError('Discount percentage must be a number').required(),
  rating: yup.number().typeError('Rating must be a number').min(0).max(5).required(),
  stock: yup.number().typeError('Stock must be a number').required(),
  tags: yup.string().required('At least one tag is required'),
  brand: yup.string().required('Brand is required'),
  sku: yup.string().required('SKU is required'),
  weight: yup.number().typeError('Weight must be a number').required(),
  dimensions: yup.object().shape({
    width: yup.number().typeError('Width must be a number').required(),
    height: yup.number().typeError('Height must be a number').required(),
    depth: yup.number().typeError('Depth must be a number').required(),
  }),
  warrantyInformation: yup.string().required(),
  shippingInformation: yup.string().required(),
  availabilityStatus: yup.string().required(),
  returnPolicy: yup.string().required(),
  minimumOrderQuantity: yup.number().typeError('Minimum order quantity must be a number').required(),
});

export const defaultProductValues = {
  title: '',
  description: '',
  category: '',
  price: '',
  discountPercentage: '',
  rating: '',
  stock: '',
  tags: '',
  brand: '',
  sku: '',
  weight: '',
  dimensions: { width: '', height: '', depth: '' },
  warrantyInformation: '',
  shippingInformation: '',
  availabilityStatus: '',
  returnPolicy: '',
  minimumOrderQuantity: '',
};

