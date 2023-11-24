// containers/AuthenticateContainer.js
import { connect } from 'react-redux';
import Authenticate from '../components/Authenticate';

const mapStateToProps = (state) => ({
  user: state.auth.user,
  token: state.auth.token,
});

export default connect(mapStateToProps)(Authenticate);
