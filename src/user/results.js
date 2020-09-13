import React, {Component} from 'react';
import { Redirect } from "react-router-dom";



export default class Results extends Component{
    
    constructor(props) { 
        super(props);
        this.state = {          
            userHistory:[]
           
            
        }
        
    }
    componentDidMount(){
        

        let allHistory = JSON.parse(localStorage.getItem('history'))

        if(allHistory){
           if(allHistory.answerHistory){
               this.setState({
                   userHistory: allHistory.answerHistory
               })
           }
        }

       
    }
    


  
    render(){

    

        return(
            
            <div className="container">
                <h3 className="mt-5">Results</h3>
                
                {
                    this.state.userHistory.length > 0 ?
                    this.state.userHistory.map((data,index)=>{
                        return(
                            <div key={index}>
                                 <span>question: {data.questionText}----  </span>
                                 <span>resuls : {data.resuls} </span>
                             </div>
                        )
                    })
                    :
                    null
                }
            </div>

            
        )

    }
}

