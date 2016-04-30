var React = require('react'),
    ReactDOM = require('react-dom'),
    Login = require('./auth/login.jsx'),
    Signup = require('./auth/signup.jsx'),
    Upload = require('./tracks/trackUpload.jsx'),
    SessionStore = require('../stores/session.js'),
    ModalStyle = require('../constants/modalConstant.js'),
    ClientActions = require('../actions/client_actions.js'),
    Modal = require('react-modal');

var NavBar = React.createClass({
  getInitialState: function() {
    return {
      modalIsOpen: false,
      signUpClicked: false,
      logInClicked: false,
      uploadClicked: false,
      current_user: SessionStore.currentUser()
    };
  },

  componentDidMount: function() {
    SessionStore.addListener(this.onChange);
    ClientActions.checkLoggedIn();
  },

  onChange: function() {
    this.setState({current_user: SessionStore.currentUser()});
  },

  logoutUser: function() {
    ClientActions.logoutUser();
  },

  openModal: function(event) {
    var state = {};
    if (event.target.id === "signUpClicked") {
      this.setState({modalIsOpen: true, signUpClicked: true});
    } else if (event.target.id === "logInClicked") {
      this.setState({modalIsOpen: true, logInClicked: true});
    } else if (event.target.id === "uploadClicked") {
      this.setState({modalIsOpen: true, uploadClicked: true});
    }
  },

  closeModal: function() {
    this.setState({modalIsOpen: false, logInClicked: false, signUpClicked: false});
  },

  render: function() {
    var modalContents = null;
    if (this.state.signUpClicked === true) {
      modalContents = <Signup parent={this} />;
    } else if (this.state.logInClicked === true) {
      modalContents = <Login parent={this} />;
    } else if (this.state.uploadClicked === true) {
      modalContents = <Upload parent={this} />;
    }

    var navbarContents = <ul>
                           <li className="navbar_buttons">
                              <button onClick={this.openModal} id='signUpClicked'>Sign Up</button>
                           </li>
                           <li className="navbar_buttons">
                              <button onClick={this.openModal} id='logInClicked'>Login</button>
                           </li>
                        </ul>;

    if (this.state.current_user !== null) {
      navbarContents = <ul>
                          <li className="navbar_buttons">
                            <button onClick={this.logoutUser} id='logoutClicked'>Logout</button>
                          </li>
                          <li className="navbar_buttons">
                          <button onClick={this.openModal} id='uploadClicked'>Upload</button>
                          </li>
                        </ul>;
    }

    return (
      <ul className="navbar">
        {navbarContents}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={ModalStyle} >

          <button onClick={this.closeModal}>close</button>
          {modalContents}
        </Modal>
      </ul>
    );
  }
});

module.exports = NavBar;
