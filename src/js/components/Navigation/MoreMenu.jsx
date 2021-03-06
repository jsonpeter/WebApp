import React, { PropTypes, Component } from "react";
import { Link } from "react-router";
import VoterSessionActions from "../../actions/VoterSessionActions";
var Icon = require("react-svg-icons");

export default class MoreMenu extends Component {
  static propTypes = {
    email: PropTypes.string,
    first_name: PropTypes.string,
    linked_organization_we_vote_id: PropTypes.string,
    signed_in_facebook: PropTypes.bool,
    is_signed_in: PropTypes.bool,
    signed_in_twitter: PropTypes.bool,
    twitter_screen_name: PropTypes.string,
    voter_photo_url: PropTypes.string
  };

  menuLink (url, label){
    let search = window.location.search ? window.location.search : "";
    let currentUrl = window.location.pathname + search;

    return <li className={url === currentUrl ? "active-link list-group-item" : "list-group-item"}>
        <Link to={url}><div><span className="header-menu-text-left">{label}</span></div></Link>
      </li>;
  }

  render () {
    const voterSignOut = VoterSessionActions.voterSignOut;

    var { linked_organization_we_vote_id, voter_photo_url } = this.props;

    let image_placeholder = "";
    let speaker_type = "V";  // TODO DALE make this dynamic
    if (speaker_type === "O") {
        image_placeholder = <span className="position-statement__avatar"><Icon name="avatar-generic" width={34} height={34} /></span>;
    } else {
        image_placeholder = <span className="position-statement__avatar"><Icon name="avatar-generic" width={34} height={34} /></span>;
    }

    let search = window.location.search ? window.location.search : "";
    let currentUrl = window.location.pathname + search;
    let show_your_page_from_twitter = this.props.signed_in_twitter && this.props.twitter_screen_name;
    let show_your_page_from_facebook = this.props.signed_in_facebook && linked_organization_we_vote_id && !show_your_page_from_twitter;

    return <div>
      <div className="device-menu--large">
        <ul className="list-group">
          <li className="list-group-item">
            <span className="we-vote-promise">We Vote's Promise: We will never sell your email.</span>
          </li>
        </ul>
        <h4 className="text-left" />
        <ul className="list-group">
          { show_your_page_from_twitter ?
            <li className={"/" + this.props.twitter_screen_name === currentUrl ? "active-link list-group-item" : "list-group-item"}>
              <Link to={"/" + this.props.twitter_screen_name}><div>
                { voter_photo_url ?
                  <img className="position-statement__avatar"
                        src={voter_photo_url}
                        width="34px"
                  /> :
                  image_placeholder }
                <span className="header-menu-text-left">Your Page</span>
              </div></Link>
            </li> :
            null
          }
          { show_your_page_from_facebook ?
            <li className={"/voterguide/" + linked_organization_we_vote_id === currentUrl ? "active-link list-group-item" : "list-group-item"}>
              <Link to={"/voterguide/" + linked_organization_we_vote_id}><div>
                { voter_photo_url ?
                  <img className="position-statement__avatar"
                        src={voter_photo_url}
                        width="34px"
                  /> :
                  image_placeholder }
                <span className="header-menu-text-left">Your Page</span>
              </div></Link>
            </li> :
            null
          }
          { !show_your_page_from_twitter && !show_your_page_from_facebook ?
            this.menuLink("/yourpage", "Your Page") :
            null
          }
          {this.menuLink("/settings/location", "Your Address & Ballot")}
          {this.props.is_signed_in ?
            this.menuLink("/more/sign_in", "Your Account") :
            null
          }
          {this.props.is_signed_in ?
            <li onClick={voterSignOut} className="list-group-item"><a><span className="header-menu-text-left">Sign Out</span></a></li> :
            this.menuLink("/more/sign_in", "Sign In")
          }
        </ul>
        <h4 className="text-left" />
        <ul className="list-group">
          <li className="list-group-item">
            <a href="https://help.wevote.us/hc/en-us/" target="_blank"><div>
              <span className="header-menu-text-left">Get Help Using We Vote <i className="fa fa-external-link" /></span>
            </div></a>
          </li>
        {this.menuLink("/more/about", "About We Vote")}
          <li className="list-group-item">
            <a href="https://goo.gl/forms/B6P0iE44R21t36L42" target="_blank"><div>
              <span className="header-menu-text-left">What would make We Vote better? <i className="fa fa-external-link" /></span>
            </div></a>
          </li>
        </ul>
        <span className="terms-and-privacy">
          <br />
          <Link to="/more/terms">Terms of Service</Link>&nbsp;&nbsp;&nbsp;<Link to="/more/privacy">Privacy Policy</Link>
        </span>
      </div>
      </div>;
  }
}
