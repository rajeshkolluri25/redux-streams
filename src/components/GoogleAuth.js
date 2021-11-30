import React from "react";
import {connect} from "react-redux";
import {signIn,signOut} from "../actions";


class GoogleAuth extends React.Component{
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'584201012802-1sl2tr0r8cgll1er7er3q7ide5s9pv7f.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth= window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange)
            });

        });
    }

    onAuthChange = (isSignedIn)=>{
        if(isSignedIn){
            this.props.signIn();
        }else{
            this.props.signOut();
        }

    }

    onSignIn =()=>{
        this.auth.signIn();

    };

    onSignOut = ()=>{
        this.auth.signOut();

    };
renderAuthButton(){
    if(this.props.isSignedIn === null){
        return null;
    }else if(this.props.isSignedIn){
        return(
            <div>
                <button className="ui red google button" onClick={this.onSignOut}>
                   <i className="google icon"/>
                   SignOut 
                </button>
            </div>
        )
    }else{
        return(
            <div>
                <button className="ui green google button" onClick ={this.onSignIn}>
                    <i className="google icon"/>
                    Sign In with Google

                </button>
               
            </div>
        )
    }
}

    render(){
        return(
            <div>
                <h2>{this.renderAuthButton()}</h2>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);
