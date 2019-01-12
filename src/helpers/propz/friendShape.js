import PropTypes from 'prop-types';

const friendShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  relationship: PropTypes.string.isRequired,
  isAvoiding: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired,
});

const friendOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  friendShape,
]);

export default { friendShape, friendOptionalShape };
