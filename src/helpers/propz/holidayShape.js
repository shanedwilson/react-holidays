import PropTypes from 'prop-types';

const holidayShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  Date: PropTypes.string.isRequired,
  imgageUrl: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

const holidayOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  holidayShape,
]);

export default { holidayShape, holidayOptionalShape };
