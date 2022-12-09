import React, { useEffect, useState } from "react";
import { getWeb3 } from "../utils/walletconnection";
import getContract from "../utils/contract";
import { Card, CardHeader, CardBody, CardFooter,Text, Button } from "@chakra-ui/react";
const TransactionSuccessful = () => {
  const [list, setList] = useState({});
  const [task,setTask]=useState({});
  const getList = async () => {
    try {
      let contract = await getContract();
      let web3 = await getWeb3();
      let taskId= await contract.methods.taskId().call();
      
      let task = await contract.methods.tasks(taskId).call();
      setTask({
        fdesc:task.Fdesc,
        price:task.price,
        status:task.status,
        pdesc:task.Pdesc,
        addressOwner: task.user
      })
    } catch (error) {
      console.log(error);
    }
  };
  const [verifyLoader,setVerifyLoader]=useState(false);
  const getTaskDone=async()=>{
    
    try {
      let contract = await getContract();
      let web3 = await getWeb3();
      let accounts = await web3.eth.getAccounts();
      let taskId= await contract.methods.taskId().call();
      let data = await contract.methods.taskDone(taskId,accounts[0]).send({from:accounts[0],value:"400"});

    } catch (error) {
      console.log(error)
      setVerifyLoader(false)
    }
  }
  const verifyTask=async()=>{
    try {
      setVerifyLoader(true);
      let contract = await getContract();
      let web3 = await getWeb3();
      let accounts = await web3.eth.getAccounts();
      let taskId= await contract.methods.taskId().call();
      let data = await contract.methods.verifyByUser(true,taskId).send({from:accounts[0]});
      console.log(data);
      setVerifyLoader(false)
    } catch (error) {
      console.log(error)
      setVerifyLoader(false)
    }
  }
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="container">
      <h1> Hurray!!!!!!</h1>
      <h1> Transaction Successful</h1>
    </div>
  );
};

export default TransactionSuccessful;
