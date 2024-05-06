import { useState, useCallback, useEffect,useMemo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  BackgroundVariant 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Button, Flex, Popover, PopoverTrigger, PopoverContent, PopoverBody, Tooltip, Input, Select, useToast,  } from '@chakra-ui/react';
import { IoAddSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { nodeRoute, getNodeRoute, edgeRoute, getEdgeRoute } from '../../utils/APIRoutes';
import axios from 'axios';
import { MdOutlineEmail } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { FcNeutralDecision } from "react-icons/fc";
import TextUpdaterNode from './TextUpdaterNode';

// const nodeTypeIcons = {
//   default: <IoAddSharp />, 
//   email: <MdOutlineEmail />,
//   wait: <FaRegClock />,
//   decision: <FcNeutralDecision />,
 
// };

const initialNodes = [];

const initialEdges = [];



function FlowChart() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [newNodeType, setNewNodeType] = useState('default');

  const [selectedNodeId, setSelectedNodeId] = useState(null);
const [selectedNodeLabel, setSelectedNodeLabel] = useState('');

const toast = useToast();

// Function to handle node selection
const handleNodeSelect = (event, node) => {
  event.stopPropagation();
  setSelectedNodeId(node.id);
  setSelectedNodeLabel(node.data.label);
};

const updateNodeLabel = () => {
  const updatedNodes = nodes.map(node => {
    if (node.id === selectedNodeId) {
      return {
        ...node,
        data: {
          ...node.data,
          label: selectedNodeLabel
        }
      };
    }
    return node;
  });
  setNodes(updatedNodes);
  setSelectedNodeId(null); // Deselect the node after updating the label
};

const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);


  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const addNode = () => {
    const newNodeId = String(nodes.length + 1);
    const iconMap = {
      default: <IoAddSharp />,
      email: <MdOutlineEmail />,
      wait: <FaRegClock />,
      decision: <FcNeutralDecision />,
    };
  
    const newNode = {
      id: newNodeId,
      type: 'textUpdater',
      data: { 
        label: newNodeLabel || `Node ${newNodeId}`,
        icon: iconMap[newNodeType] || <IoAddSharp />, 
        contentType: newNodeType
      }, 
      position: { x: 200, y: 200 },
      contentType: newNodeType
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    setNewNodeLabel(''); 
    setNewNodeType('default');
  };

  useEffect(() => {
    console.log("nodes",edges)
  }, [edges])

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Adjust this based on your authentication implementation
        if (!token) {
          // Handle case where token is not present
          console.error('JWT token is not present in localStorage');
          return;
        }
    

    // Include the JWT token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
        const {data} = await axios.post(nodeRoute, nodes, config);

        const {edgeData} = await axios.post(edgeRoute, edges, config);

        toast({
          title: "Sucessfully Saved", 
          position: 'top-right', 
          status: "success",
          isClosable: true, 
        });
     
    } catch (error) {
        
    }
    
};

const handleGetNode = async (e) => {
   
    try {
      const iconMap = {
        default: <IoAddSharp />,
        email: <MdOutlineEmail />,
        wait: <FaRegClock />,
        decision: <FcNeutralDecision />,
      };
        // const response = await axios.get(getNodeRoute, {});

        const token = localStorage.getItem('token'); // Adjust this based on your authentication implementation
        if (!token) {
          // Handle case where token is not present
          console.error('JWT token is not present in localStorage');
          return;
        }
    

    // Include the JWT token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the API call with the headers
    const response = await axios.get(getNodeRoute, config);
        const fetchedNodes = response.data.map(node => ({
          ...node,
          data: {
            ...node.data,
            icon: iconMap[node.contentType] || <IoAddSharp />,
            contentType: node.contentType
          }
        }));
        setNodes(fetchedNodes);
        
     
    } catch (error) {
        
    }
    
};

const handleGetEdges = async (e) => {
   
  try {
    const token = localStorage.getItem('token'); // Adjust this based on your authentication implementation
        if (!token) {
          // Handle case where token is not present
          console.error('JWT token is not present in localStorage');
          return;
        }
    

    // Include the JWT token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
      const response = await axios.get(getEdgeRoute, config);
      setEdges(response.data); 
      
   
  } catch (error) {
      
  }
  
};

const deleteNode = () => {
  const updatedNodes = nodes.filter(node => node.id !== selectedNodeId);
  setNodes(updatedNodes);
  setSelectedNodeId(null); 
};

useEffect(() => {
    handleGetNode();
    handleGetEdges();
},[])

  return (
    <><Flex justifyContent="flex-end">
    <Button bg="pink.300" color={"white"} _hover={{ bg: 'pink.400' }}  onClick={handleSave}>Save</Button>
</Flex>
    <Flex style={{ height: '100%' }}>



          <ReactFlow
              nodes={nodes}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              onNodeClick={handleNodeSelect}
              nodeTypes={nodeTypes} 
          >
              <Background color="#DB7093" />
              <Controls />
          </ReactFlow>

          {selectedNodeId && (
  <Flex flexDirection="column" alignItems="center">
    <Input
      type="text"
      value={selectedNodeLabel}
      onChange={(e) => setSelectedNodeLabel(e.target.value)}
      placeholder="Enter new label"
      mb="5px"
    />
    <Button onClick={updateNodeLabel}>Update Node</Button>
  </Flex>
)}

          <Flex display="flex" flexDirection="column" alignItems="center">
          <Popover>
            
            <PopoverTrigger>
            
              <Box mt="10px" mb="10px" bg="pink.300" p="5px" borderRadius={"30%"} color="white" _hover={{ cursor: 'pointer', bg: "pink.400" }} ><IoAddSharp /></Box>
              
            </PopoverTrigger>
           
            <PopoverContent>
              <PopoverBody>
                <Input
                  type="text"
                  value={newNodeLabel}
                  onChange={(e) => setNewNodeLabel(e.target.value)}
                  placeholder="Enter label"
                  mb="5px"
                />
                <Select value={newNodeType} onChange={(e) => setNewNodeType(e.target.value)} mb="5px">
                  <option value="default">Default</option>
                  <option value="email">Email</option>
                  <option value="wait">Wait</option>
                  <option value="decision">Decision</option>
                </Select>
                
                <Button onClick={addNode}>Add</Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Tooltip label="Delete Node" hasArrow>
              <Box mt="10px" mb="10px" bg="pink.300" p="5px" borderRadius={"30%"} color="white" _hover={{ cursor: 'pointer', bg: "pink.400"  }} onClick={deleteNode}><RiDeleteBin6Line /></Box>
              </Tooltip>
          </Flex>

      </Flex></>
  );
}

export default FlowChart;
