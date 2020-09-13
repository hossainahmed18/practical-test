import React, {Component} from 'react';


export default class LoginForm extends Component{
    submitObjectForNew={}
    constructor(props) { 
        super(props);
        this.state = {          
            message:'user home',
            quizes:[],
            userHistory:{
                name:'',
                answerHistory:[]
            },
            nameOptionShow: false
            
        }
        
    }
    componentDidMount(){

        let allQuizes = JSON.parse(localStorage.getItem('quizes'))

        let allHistory = JSON.parse(localStorage.getItem('history'))

        if(allHistory){
           if(allHistory.name){
               this.setState({
                   userHistory:{
                      name: allHistory.name,
                      answerHistory: allHistory.answerHistory ?allHistory.answerHistory: []
                   }
               })
           }
        }

    
        if(allQuizes){
            if(allQuizes.length >0){
                this.setState({quizes: allQuizes})
            }
        }
        
    }
    submit(event, directSubmit = 0) {

        if (directSubmit == 0) {
            let quizes = JSON.parse(localStorage.getItem('quizes'))
            let questionObject = {}
            let found = 0


            for (let i = 0; i < quizes.length; i++) {
                if (quizes[i].id == event.target.id && quizes[i].answer == event.target.value) {
                    found = 1
                    questionObject = quizes[i]
                    break;
                }
            }

            let historyObject = {
                resuls: found == 1 ? "correct" : "wrong",
                questionText: questionObject.questionText
            }

            this.setState(prevState => ({
                userHistory: {...prevState.userHistory, answerHistory: [historyObject, ...prevState.userHistory.answerHistory]}
            }),()=>{
                if (this.state.userHistory.name != "") {
                   
                    localStorage.setItem('history',JSON.stringify(this.state.userHistory))
                    alert("Submitted")
    
                }
                else {
                    this.setState({
                        nameOptionShow: true
                    })
                }

            });
        }else{
            
            localStorage.setItem('history',JSON.stringify(this.state.userHistory)) 
        }
    }

    updateName(event) {
        let updateObject={...this.state.userHistory,name:event.target.value}

        this.setState({
            userHistory: updateObject
        })
    }

   
    


  
    render(){
        return(
            
            <div className="container">
                <h3>All Quizes</h3>

                <a href="/results">See Resuls</a>

                {
                    this.state.quizes.length > 0 ?
                        this.state.quizes.map((data, index) => {
                            return (
                                <div key={index}>
                                    <h3>{data.questionText} ?</h3>

                                    <input type="radio" id={data.id} name={data.id} value={data.option1} onChange={(event)=>this.submit(event)}/>
                                    <label >{data.option1}</label>
                                    <br />

                                    <input type="radio" id={data.id} name={data.id} value={data.option2} onChange={(event)=>this.submit(event)}/>
                                    <label >{data.option2}</label>
                                    <br />

                                    <input type="radio" id={data.id} name={data.id} value={data.option3} onChange={(event)=>this.submit(event)}/>
                                    <label >{data.option3}</label>

                                </div>
                            )
                        })
                        :
                        null
                }

                {
                    this.state.nameOptionShow==true  ?
                        <div>
                            <label >Give Your Name</label>
                            
                            <input type="text" id="any" name="any" value={this.state.userHistory.name} onChange={(event)=>this.updateName(event)}/>
                            <button onClick={()=>this.submit({},1)}>Submit </button>
                            
                        </div>

                        :
                        null
                }

            </div>
            
        )

    }
}

