import React, {Component} from 'react';


export default class quizSet extends Component{
    
    constructor(props) { 
        super(props);
        this.state = {          
           
            questionText: '',
            option1: '',
            option2: '',
            option3: '',
            answer:'',
            adding: false,
        
           
            quizes:[]

           
            
        }
        
    }
    componentDidMount(){
      
        this.loadQuizes()

       
    }

    loadQuizes(){
        let allQuizes = JSON.parse(localStorage.getItem('quizes'))
        if(allQuizes){
            if(allQuizes.length >0){
                this.setState({quizes: allQuizes})
            }
        }

    }
    addQuestion(){
        this.setState({
            questionText: '',
            option1: '',
            option2: '',
            option3: '',
            answer:'',
            adding: true
        })
    }

    submitQuestion(){
        if(this.state.answer !== ""){
            
            var questionObject={
                questionText: this.state.questionText,
                option1: this.state.option1,
                option2: this.state.option2,
                option3: this.state.option3,
                answer: this.state.answer,
                id: this.state.quizes.length+1
            }
            this.setState(prevState => ({
                quizes: [questionObject,...prevState.quizes],
                adding: false
            }),()=>{
                
                localStorage.setItem('quizes',JSON.stringify(this.state.quizes))
            });

        }
        
        
    }
    
    


  
    render(){
        return(
            
            <div className="container">
               <button onClick={()=>this.addQuestion()} className="mt-3">Add Question</button>

                {
                    this.state.adding == true ?
                        <div>
                            <form className="mt-5">

                                <div className="form-group">
                                    <label >Question Text</label>
                                    <input type="text" className="form-control" placeholder="Enter Question Text" onChange={(event) => this.setState({ questionText: event.target.value })} value={this.state.questionText} />
                                </div>

                                <div className="form-group" >
                                    <label >Option 1</label>
                                    <input type="text" className="form-control" onChange={(event) => this.setState({ option1: event.target.value })} value={this.state.option1} />
                                </div>
                                <div className="form-group">
                                    <label >Option 2</label>
                                    <input type="text" className="form-control" onChange={(event) => this.setState({ option2: event.target.value })} value={this.state.option2} />
                                </div>
                                <div className="form-group">
                                    <label >Option 3</label>
                                    <input type="text" className="form-control" onChange={(event) => this.setState({ option3: event.target.value })} value={this.state.option3} />

                                </div>


                                <div className="form-group">
                                    <label >answer</label>
                                    

                                    <select name="cars" id="cars" onChange={(event) => this.setState({ answer: event.target.value })} value={this.state.answer}>
                                        <option value="no">select option</option>
                                        <option value={this.state.option1}>{this.state.option1}</option>
                                        <option value={this.state.option2}>{this.state.option2}</option>
                                        <option value={this.state.option3}>{this.state.option3}</option>
                                       
                                    </select>

                                </div>

                            </form>
                            <button type="submit" className="btn btn-primary" onClick={() => this.submitQuestion()}>set</button>
                        </div>
                        :
                        null

                }
              
              



                <div className="mt-5">
                    <h3>All Quizes</h3>
                    {
                        this.state.quizes.length > 0 ?
                        this.state.quizes.map((data,index)=>{
                           return(
                            <div key={index}>
                            <h3>{data.questionText} ?</h3>
                            <h6>{data.option1}</h6>
                            <h6>{data.option2}</h6>
                            <h6>{data.option3}</h6>
                        </div>
                           )
                        })
                        :
                        null
                    }
                </div>

            </div>

            
        )

    }
}

