import React,{useState} from 'react';
import './App.css';
import axios from 'axios';
import logo from './logottt.jpg';
import loader from './assets/loader.gif';
import styles1 from './index.css';

import { Container,Image,Button,Icon,Loader,Dimmer,
  Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell,Form, Grid, Card } from 'semantic-ui-react';

function App() {
  const [showDiv,setShowDiv] = useState(false);
  const [data,setData] = useState([])
  const [Num,setNum] = useState('')
  const [loading,setLoading] = useState(false);
  const [btnColor,setBtnColor] = useState('')

  const handleClick = async () =>{
    try {
      setLoading(true);
      let testNum = Num.Num
      let response = await axios.get(`http://localhost:5000/?num=${testNum}`);  
      let {data} = response;
      await setData({data})
      setLoading(false);
      setShowDiv({showDiv:true});
    } catch (error) {
      console.log("ERROR",error.message)
    }
  }
  
  console.log("state",data,Num,loading,btnColor)

  return (   
    <div>
      <Grid centered style={{ backgroundColor: '#000',height:"70vh" }}>
      <Grid.Column >
             <Image 
             src={logo}
             style={{left:'0%',top:'50%'}}
            size='big' centered />
        </Grid.Column>
      </Grid>
      <Grid centered columns={2}>
        
        <Grid.Column>
          <Form>
            <Form.Field>
            <Form.Input label="Enter Number" type="text" placeholder="qwerty" onChange={(e)=> {
              console.log("change",e.target.value)
              setNum({Num:e.target.value})}}/>
              </Form.Field>
              <Form.Field style={{textAlign:'center'}}>
              <Button onClick={()=>handleClick()} size='medium' secondary
              onMouseEnter={()=>{
                setBtnColor(`${btnColor}1px 1px 15px #888888`);
              }}
              onMouseLeave={()=>{
                setBtnColor('')
              }}
              style={{boxShadow:btnColor}}            
                >
                {loading ? 'Loading':'Get'}
              </Button> 
              </Form.Field>
          </Form>    
          {
          showDiv && <>

            <Table celled selectable>
              <TableHeader>
                <TableRow  textAlign='center'>
                <TableHeaderCell>Sl.No.</TableHeaderCell>
                <TableHeaderCell>Text</TableHeaderCell>
                <TableHeaderCell>Frequency of Occurence</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
              {
              data.data.map((el,i)=>{
                return(
                  <TableRow key={i}  textAlign='center'>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{el.item}</TableCell>
                    <TableCell>{el.freq}</TableCell>
                  </TableRow>
                )
              })
            }
              </TableBody>      
            </Table>
            </>
          }
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
