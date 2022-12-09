import React, { useEffect, useState } from "react";
import { getWeb3 } from "../utils/walletconnection";
import getContract from "../utils/contract";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Button,
} from "@chakra-ui/react";

const ListTasks = () => {
  const [list, setList] = useState({});
  const [task, setTask] = useState({});
  const getList = async () => {
    try {
      let contract = await getContract();
      let web3 = await getWeb3();
      let taskId = await contract.methods.taskId().call();

      let task = await contract.methods.tasks(taskId).call();
      setTask({
        fdesc: task.Fdesc,
        price: task.price,
        status: task.status,
        pdesc: task.Pdesc,
        addressOwner: task.user,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [verifyLoader, setVerifyLoader] = useState(false);
  const [taskDoneLoader, setTaskDoneLoader] = useState(false);
  const getTaskDone = async () => {
    try {
      setTaskDoneLoader(true);
      let contract = await getContract();
      let web3 = await getWeb3();
      let accounts = await web3.eth.getAccounts();
      let taskId = await contract.methods.taskId().call();
      console.log(taskId);
      console.log(accounts[0])
      console.log("task is performing")
      let data = await contract.methods
        .taskDone(taskId)
        .send({ from: accounts[0], value: task.price*2 });
        console.log(data);
        setTaskDoneLoader(false);
    } catch (error) {
      console.log(error);
      setTaskDoneLoader(false);
    }
  };
  
  const verifyTask = async (isTask) => {
    try {
   

      setVerifyLoader(true);
      let contract = await getContract();
      let web3 = await getWeb3();
      let accounts = await web3.eth.getAccounts();
      let taskId= await contract.methods.taskId().call();
      console.log(taskId);
      console.log(accounts[0]);
      console.log("verify task");
      let data = await contract.methods.verifyByUser(isTask,taskId).send({from:accounts[0]});
      console.log(data);
      setVerifyLoader(false)
      
    } catch (error) {
      console.log(error);
      setVerifyLoader(false);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="container">
      <div>ListTasks</div>
      <Card>
        <CardBody>
          <Text>Function Description : {task.fdesc}</Text>
          <Text>Task Price : {task.price}</Text>
          <Text>Task Parameters :{task.pdesc}</Text>
          <Text>Task Owner Address :{task.addressOwner}</Text>
        </CardBody>
        <CardFooter className="d-flex justify-content-between">
          <Button color="teal.500" onClick={()=>{
            verifyTask(true)
          }}>
            {verifyLoader ? "Verifying..." : "Verify Task"}
          </Button>
          <Button color="teal.500" onClick={getTaskDone}>
            {taskDoneLoader ? "Performing..." : "Task Done"}
          </Button>
          <Button color="teal.500" onClick={()=>{
            verifyTask(false)
          }}>
            {verifyLoader ? "Verifying..." : "Cloud Verify"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ListTasks;
