import React, {Component} from 'react';
import { Redirect } from "react-router-dom";



export default class LoginForm extends Component{
    
    constructor(props) { 
        super(props);
        this.state = {          
            message:'Admin',
            email: '',
            password:'',
            selectedOption: 'login',
            login: '',
            redirect : false,
           
            
        }
        
    }
    componentDidMount(){
        //localStorage.removeItem('quizes')
       // let data=localStorage.getItem('user')
       // console.log(JSON.parse(data))
    }
    submit(){

        let userObject={
            email: this.state.email,
            password : this.state.password
        }

        if(this.state.selectedOption=="sign-up"){
            localStorage.setItem('user',JSON.stringify(userObject))
            this.setState({ selectedOption: 'login' })

        }else if(this.state.selectedOption=="login"){
            if(localStorage.getItem('user')==JSON.stringify(userObject)){
                this.setState({
                    redirect:true
                })
            }
            else{
                this.setState({
                    error:'email/password mismatch'
                })
            }
        }
        this.setState({
            email:'',
            password:''
        })
    }
    


  
    render(){

    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/admin/quiz-set' />;
     }  


        return(
            
            <div className="container">
                <h3 className="mt-5">Go For  {this.state.selectedOption}</h3>
                <form className="mt-5">
                    <div className="form-group">
                        <label >Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(event)=>this.setState({email:event.target.value})} value={this.state.email} />
                    </div>

                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(event)=>this.setState({password:event.target.value})} value={this.state.password} />
                    </div>
                </form>
                <button type="submit" className="btn btn-primary" onClick={()=>this.submit()}>Submit</button>

                <div>
                    <div className="mt-5">
                    { this.state.selectedOption=="login" ? <span><button onClick={() => this.setState({ selectedOption: "sign-up" })}>Sign up</button> </span> : null }
                        { this.state.selectedOption=="sign-up" ? <span><button onClick={() => this.setState({ selectedOption: "login" })}>Log in</button> </span> :null }
                    </div>
                </div>

                { this.state.error !=="" ? <h1>{this.state.error}</h1>: null  }
                

            </div>

            
        )

    }
}

